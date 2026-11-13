'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play, ShoppingBag } from 'lucide-react'
import { track } from '@vercel/analytics'
import type { Video } from '@/lib/types'

export function VideoCard({ video }: { video: Video }) {
  const [tocando, setTocando] = useState(false)

  function iniciar() {
    setTocando(true)
    track('video_play', { video: video.id })
  }

  return (
    <article className="flex w-[78vw] max-w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-card sm:w-auto sm:max-w-none">
      <div className="relative aspect-[9/16] overflow-hidden bg-black">
        {tocando && video.videoUrl ? (
          <video
            src={video.videoUrl}
            poster={video.thumbnail}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="size-full object-cover"
            onEnded={() => track('video_complete', { video: video.id })}
          />
        ) : (
          <button
            type="button"
            onClick={iniciar}
            aria-label={`Assistir: ${video.nome}`}
            className="group absolute inset-0 cursor-pointer"
          >
            {video.thumbnail ? (
              <Image
                src={video.thumbnail}
                alt=""
                fill
                sizes="(max-width: 640px) 78vw, 300px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : null}
            <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110 group-active:scale-95">
              <Play className="ml-1 size-7 fill-current" />
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-pretty font-semibold leading-snug">{video.nome}</h3>
        {video.descricao ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {video.descricao}
          </p>
        ) : null}
        {video.linkAfiliado ? (
          <a
            href={video.linkAfiliado}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => track('video_cta_click', { video: video.id })}
            className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            <ShoppingBag className="size-4" />
            Ver oferta
          </a>
        ) : null}
      </div>
    </article>
  )
}
