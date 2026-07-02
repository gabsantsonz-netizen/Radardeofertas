import Image from 'next/image'
import Link from 'next/link'
import { Plus, Pencil, Trash2, EyeOff } from 'lucide-react'
import { getVideos, getProdutos } from '@/lib/store'
import { salvarVideo, excluirVideo } from '@/app/admin/actions'
import { ConfirmDeleteButton } from '@/components/admin/confirm-delete-button'

export const metadata = {
  title: 'Vídeos | Painel Radar de Ofertas',
}

export default async function VideosPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }> 
}) {
  const { edit } = await searchParams
  const [videos, produtos] = await Promise.all([getVideos(), getProdutos()])
  const videoEditando = videos.find((video) => video.id === edit)

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">Vídeos</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Controle o carrossel inicial, thumbnails, links e ordem de exibição.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <form action={salvarVideo} className="space-y-5 rounded-3xl border border-border bg-card p-5">
          <h2 className="font-heading text-lg font-semibold">Adicionar ou editar vídeo</h2>
          {videoEditando ? <input type="hidden" name="id" value={videoEditando.id} /> : null}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Nome do vídeo</span>
            <input
              name="nome"
              defaultValue={videoEditando?.nome ?? ''}
              placeholder="Vídeo de lançamento"
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Thumbnail</span>
            <input
              name="thumbnail"
              defaultValue={videoEditando?.thumbnail ?? ''}
              placeholder="/videos/thumb.png"
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Vídeo</span>
            <input
              name="videoUrl"
              defaultValue={videoEditando?.videoUrl ?? ''}
              placeholder="https://youtube.com/watch?..."
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Produto relacionado</span>
            <select name="produtoRelacionado" defaultValue={videoEditando?.produtoRelacionado ?? ''} className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary">
              <option value="">Selecione</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Link afiliado</span>
            <input
              name="linkAfiliado"
              defaultValue={videoEditando?.linkAfiliado ?? ''}
              placeholder="https://..."
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Ordem de exibição</span>
            <input
              name="ordem"
              type="number"
              defaultValue={videoEditando?.ordem ?? 0}
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input name="ativo" type="checkbox" defaultChecked={videoEditando?.ativo ?? true} className="size-4" />
            Ativar vídeo
          </label>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            <Plus className="size-4" />
            Salvar vídeo
          </button>
        </form>

        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          {videos.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">Nenhum vídeo cadastrado.</p>
          ) : (
            <ul className="divide-y divide-border">
              {videos.map((video) => (
                <li key={video.id} className="flex items-center gap-3 p-4">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary/40">
                    {video.thumbnail ? (
                      <Image
                        src={video.thumbnail}
                        alt={video.nome}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs font-semibold uppercase text-muted-foreground">
                        Vídeo
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{video.nome}</p>
                    <p className="text-xs text-muted-foreground">Ordem {video.ordem ?? 0}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/painel/videos?edit=${video.id}`}
                      className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <button className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                      <EyeOff className="size-4" />
                    </button>
                    <form action={excluirVideo}>
                      <input type="hidden" name="id" value={video.id} />
                      <ConfirmDeleteButton
                        className="rounded-lg border border-destructive/30 p-2 text-destructive transition-colors hover:bg-destructive/10"
                        confirmMessage="Tem certeza que deseja remover este vídeo?"
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
