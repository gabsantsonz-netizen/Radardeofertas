import type { Video } from '@/lib/types'
import { VideoCard } from '@/components/video-card'

export function VideoSection({ videos }: { videos: Video[] }) {
  const ativos = videos.filter((v) => v.ativo !== false && v.videoUrl)
  if (ativos.length === 0) return null

  return (
    <section id="videos" className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <div className="mb-6">
        <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
          Vídeos do radar
        </h2>
        <p className="mt-2 max-w-xl text-pretty text-muted-foreground">
          Achados testados e explicados em menos de 1 minuto.
        </p>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:grid-cols-3 lg:grid-cols-4">
        {ativos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  )
}
