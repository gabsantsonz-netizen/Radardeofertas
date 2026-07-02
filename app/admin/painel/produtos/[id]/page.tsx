import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getProdutos, getCategorias } from '@/lib/store'
import { salvarProduto } from '@/app/admin/actions'
import { ImageUploadField } from '@/components/admin/image-upload-field'
import { PriceCalculator } from '@/components/admin/price-calculator'

export const metadata = {
  title: 'Editar produto | Painel Radar de Ofertas',
}

export default async function EditarProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [produtos, categorias] = await Promise.all([getProdutos(), getCategorias()])
  const produto = produtos.find((item) => item.id === id)

  if (!produto) notFound()

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/painel/produtos"
          className="inline-flex items-center rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <h1 className="font-heading text-2xl font-bold">Editar produto</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Atualize os dados do item e mantenha o painel sempre alinhado.
          </p>
        </div>
      </div>

      <form action={salvarProduto} className="space-y-6 rounded-3xl border border-border bg-card p-5 sm:p-7">
        <input type="hidden" name="id" value={produto.id} />
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Nome do produto</span>
              <input
                name="nome"
                required
                defaultValue={produto.nome}
                className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Descrição / bio</span>
              <textarea
                name="descricao"
                rows={5}
                defaultValue={produto.descricao}
                className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Categoria</span>
                <select
                  name="categoria"
                  defaultValue={produto.categoria}
                  className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                >
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Status</span>
                <select
                  name="status"
                  defaultValue={produto.status ?? (produto.destaque ? 'destaque' : produto.ativo === false ? 'inativo' : 'ativo')}
                  className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                  <option value="destaque">Destaque</option>
                  <option value="oferta">Oferta especial</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Marketplace</span>
              <div className="grid gap-3 sm:grid-cols-[0.7fr_1fr]">
                <select
                  name="loja"
                  defaultValue={produto.loja || ''}
                  className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                >
                  <option value="">Selecione</option>
                  <option value="Shopee">Shopee</option>
                  <option value="Mercado Livre">Mercado Livre</option>
                  <option value="Amazon">Amazon</option>
                  <option value="AliExpress">AliExpress</option>
                  <option value="Outro">Outro</option>
                </select>
                <input
                  name="lojaPersonalizada"
                  defaultValue={produto.loja && !['Shopee', 'Mercado Livre', 'Amazon', 'AliExpress', 'Outro'].includes(produto.loja) ? produto.loja : ''}
                  placeholder="Marketplace personalizado"
                  className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Link de afiliado</span>
              <input
                name="link"
                type="url"
                defaultValue={produto.link}
                className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Tipo de entrega</span>
              <div className="grid gap-3 sm:grid-cols-[0.7fr_1fr]">
                <select
                  name="tipoEntrega"
                  defaultValue={produto.tipoEntrega || ''}
                  className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                >
                  <option value="">Selecione</option>
                  <option value="Frete grátis">Frete grátis</option>
                  <option value="Entrega rápida">Entrega rápida</option>
                  <option value="Entrega normal">Entrega normal</option>
                  <option value="Retirada">Retirada</option>
                  <option value="Personalizado">Personalizado</option>
                </select>
                <input
                  name="tipoEntregaPersonalizado"
                  defaultValue={produto.tipoEntrega && !['Frete grátis', 'Entrega rápida', 'Entrega normal', 'Retirada', 'Personalizado'].includes(produto.tipoEntrega) ? produto.tipoEntrega : ''}
                  placeholder="Frete grátis para todo Brasil"
                  className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>
            </label>
          </div>

          <div className="space-y-5">
            <ImageUploadField
              name="imagemArquivo"
              label="Imagem do produto"
              valueName="imagem"
              initialValue={produto.imagem}
            />
            <PriceCalculator initialOriginal={produto.precoOriginal?.toString() ?? ''} initialPromotional={produto.preco.toString()} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border pt-5">
          <Link
            href="/admin/painel/produtos"
            className="rounded-full border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  )
}
