'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Crown, X } from 'lucide-react'
import { redesSociais } from '@/products/config'
import { cn } from '@/lib/utils'

export function VipPopup() {
  const [aberto, setAberto] = useState(false)
  const [fechado, setFechado] = useState(false)

  if (fechado) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Card expandido */}
      <div
        className={cn(
          'w-[min(20rem,calc(100vw-2rem))] origin-bottom-right rounded-2xl border border-primary/40 bg-card p-4 shadow-glow transition-all duration-300',
          aberto
            ? 'scale-100 opacity-100'
            : 'pointer-events-none translate-y-2 scale-95 opacity-0',
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-bold text-primary">
            <Crown className="size-3.5" />
            Grupo VIP
          </span>
          <button
            type="button"
            onClick={() => setFechado(true)}
            aria-label="Fechar"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="mt-3 overflow-hidden rounded-xl border border-primary/30 bg-background">
          <Image
            src="/images/grupo-vip-popup.png"
            alt="Grupo VIP - Radar de Ofertas"
            width={320}
            height={320}
            className="h-auto w-full"
          />
        </div>
        <h3 className="mt-3 font-heading text-lg font-bold">
          Entre no Grupo VIP
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Receba ofertas exclusivas todos os dias direto no seu celular.
        </p>
        <a
          href={redesSociais.grupoVip}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Entrar agora
        </a>
      </div>

      {/* Botão circular flutuante com pulsação */}
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-label={aberto ? 'Fechar grupo VIP' : 'Abrir grupo VIP'}
        aria-expanded={aberto}
        className="animate-vip-pulse flex size-16 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform hover:scale-105"
      >
        {aberto ? (
          <X className="size-6" />
        ) : (
          <>
            <Crown className="size-5" />
            <span className="text-[10px] font-extrabold leading-tight">VIP</span>
          </>
        )}
      </button>
    </div>
  )
}
