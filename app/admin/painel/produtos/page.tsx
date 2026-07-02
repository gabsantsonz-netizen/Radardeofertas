import Link from 'next/link'
import Image from 'next/image'
import { Copy, Pencil, Plus, Trash2, ExternalLink } from 'lucide-react'
import { getProdutos, getCategorias } from '@/lib/store'
import { calcularDesconto, formatarPreco } from '@/lib/format'
import { excluirProduto, duplicarProduto } from '@/app/admin/actions'
import { ConfirmDeleteButton } from '@/components/admin/confirm-delete-button'

export const metadata = {
  title: 'Produtos | Painel Radar de Ofertas',
}

export default async function ProdutosPage() {
  const [produtos, categorias] = await Promise.all([getProdutos(), getCategorias()])
  const lista = [...produtos].sort(
    (a, b) => (b.criadoEm ?? '').localeCompare(a.criadoEm ?? ''),
  )

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">Produtos</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie produtos, preços, descontos, marketplace e status.
          </p>
        </div>
        <Link
          href="/admin/painel/produtos/novo"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          <Plus className="size-4" />
          Novo produto
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {lista.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            Nenhum produto cadastrado ainda.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border text-sm">
              <thead className="bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold">Foto</th>
                  <th className="px-4 py-3 font-semibold">Nome</th>
                  <th className="px-4 py-3 font-semibold">Categoria</th>
                  <th className="px-4 py-3 font-semibold">Preço antigo</th>
                  <th className="px-4 py-3 font-semibold">Promo</th>
                  <th className="px-4 py-3 font-semibold">Desconto</th>
                  <th className="px-4 py-3 font-semibold">Marketplace</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {lista.map((produto) => {
                  const desconto = calcularDesconto({
                    preco: produto.preco,
                    precoOriginal: produto.precoOriginal,
                  })
                  const nomeCategoria =
                    categorias.find((categoria) => categoria.id === produto.categoria)?.nome ??
                    produto.categoria
                  const statusLabel = produto.status ?? (produto.destaque ? 'destaque' : 'ativo')
                  return (
                    <tr key={produto.id} className="align-middle">
                      <td className="px-4 py-3">
                        <div className="relative size-14 overflow-hidden rounded-xl border border-border bg-secondary/40">
                          <Image
                            src={produto.imagem || '/placeholder.svg'}
                            alt={produto.nome}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium">{produto.nome}</td>
                      <td className="px-4 py-3">{nomeCategoria}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {produto.precoOriginal ? formatarPreco(produto.precoOriginal) : '—'}
                      </td>
                      <td className="px-4 py-3 font-semibold text-primary">
                        {formatarPreco(produto.preco)}
                      </td>
                      <td className="px-4 py-3">{desconto > 0 ? `${desconto}%` : '—'}</td>
                      <td className="px-4 py-3">{produto.loja || '—'}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                          {statusLabel}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/painel/produtos/${produto.id}`}
                            className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                            aria-label={`Editar ${produto.nome}`}
                          >
                            <Pencil className="size-4" />
                          </Link>
                          <form action={duplicarProduto} className="inline-flex">
                            <input type="hidden" name="id" value={produto.id} />
                            <button
                              type="submit"
                              className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                              aria-label={`Duplicar ${produto.nome}`}
                            >
                              <Copy className="size-4" />
                            </button>
                          </form>
                          <a
                            href={produto.link}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                            aria-label={`Visualizar ${produto.nome}`}
                          >
                            <ExternalLink className="size-4" />
                          </a>
                          <form action={excluirProduto} className="inline-flex">
                            <input type="hidden" name="id" value={produto.id} />
                            <ConfirmDeleteButton
                              className="rounded-lg border border-destructive/30 p-2 text-destructive transition-colors hover:bg-destructive/10"
                              confirmMessage="Tem certeza que deseja remover este produto?"
                            >
                              <Trash2 className="size-4" />
                            </ConfirmDeleteButton>
                          </form>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
