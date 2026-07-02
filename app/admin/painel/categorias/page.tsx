import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Trash2, ArrowUpDown } from 'lucide-react'
import { getCategorias } from '@/lib/store'
import { salvarCategoria, excluirCategoria } from '@/app/admin/actions'
import { ConfirmDeleteButton } from '@/components/admin/confirm-delete-button'

export const metadata = {
  title: 'Categorias | Painel Radar de Ofertas',
}

export default async function CategoriasPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }> 
}) {
  const { edit } = await searchParams
  const categorias = await getCategorias()
  const categoriaEditando = categorias.find((categoria) => categoria.id === edit)

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">Categorias</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Organize categorias, altere nomes, ordem e imagem de capa.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <form action={salvarCategoria} className="space-y-5 rounded-3xl border border-border bg-card p-5">
          <h2 className="font-heading text-lg font-semibold">Adicionar ou editar categoria</h2>
          {categoriaEditando ? <input type="hidden" name="id" value={categoriaEditando.id} /> : null}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Nome</span>
            <input
              name="nome"
              defaultValue={categoriaEditando?.nome ?? ''}
              placeholder="Tecnologia"
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Imagem</span>
            <input
              name="imagem"
              defaultValue={categoriaEditando?.imagem ?? ''}
              placeholder="/produtos/categoria.png"
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Ordem</span>
            <input
              name="ordem"
              type="number"
              defaultValue={categoriaEditando?.ordem ?? 0}
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            <Plus className="size-4" />
            Salvar categoria
          </button>
        </form>

        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          {categorias.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">Nenhuma categoria cadastrada.</p>
          ) : (
            <ul className="divide-y divide-border">
              {categorias.map((categoria) => (
                <li key={categoria.id} className="flex items-center gap-3 p-4">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary/40">
                    {categoria.imagem ? (
                      <Image
                        src={categoria.imagem}
                        alt={categoria.nome}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs font-semibold uppercase text-muted-foreground">
                        {categoria.nome.slice(0, 2)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{categoria.nome}</p>
                    <p className="text-xs text-muted-foreground">Ordem {categoria.ordem ?? 0}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/painel/categorias?edit=${categoria.id}`}
                      className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <button className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                      <ArrowUpDown className="size-4" />
                    </button>
                    <form action={excluirCategoria}>
                      <input type="hidden" name="id" value={categoria.id} />
                      <ConfirmDeleteButton
                        className="rounded-lg border border-destructive/30 p-2 text-destructive transition-colors hover:bg-destructive/10"
                        confirmMessage="Tem certeza que deseja remover esta categoria?"
                      >
                        <Trash2 className="size-4" />
                      </ConfirmDeleteButton>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
