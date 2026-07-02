'use client'

import { useEffect, useState } from 'react'
import { Cookie } from 'lucide-react'

const STORAGE_KEY = 'radar-cookie-consent'

export function CookieConsent() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisivel(true)
      }
    } catch {
      setVisivel(true)
    }
  }, [])

  function responder(valor: 'aceito' | 'recusado') {
    try {
      localStorage.setItem(STORAGE_KEY, valor)
    } catch {
      // ignora ambientes sem localStorage
    }
    setVisivel(false)
  }

  if (!visivel) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-primary/30 bg-card p-4 shadow-glow sm:flex-row sm:items-center sm:gap-6 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Cookie className="size-5" />
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Utilizamos cookies para melhorar sua experiência, analisar o tráfego
            e personalizar as ofertas exibidas. Ao continuar navegando, você
            concorda com a nossa política de privacidade.
          </p>
        </div>
        <div className="flex shrink-0 gap-2 sm:flex-col">
          <button
            type="button"
            onClick={() => responder('aceito')}
            className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Aceitar
          </button>
          <button
            type="button"
            onClick={() => responder('recusado')}
            className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-muted"
          >
            Recusar
          </button>
        </div>
      </div>
    </div>
  )
}
