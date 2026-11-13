'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Ofertas', href: '#ofertas' },
  { label: 'Categorias', href: '#categorias' },
  { label: 'Vídeos', href: '#videos' },
  { label: 'Redes Sociais', href: '#redes' },
]

export function SiteHeader() {
  const [aberto, setAberto] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label="Página inicial Radar de Ofertas">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Menu principal">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Link
          href="/links"
          className="hidden rounded-full border border-primary/40 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:inline-flex"
        >
          Meus links
        </Link>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberto}
        >
          {aberto ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Menu mobile */}
      <div
        className={cn(
          'overflow-hidden border-t border-border/70 transition-[max-height] duration-300 md:hidden',
          aberto ? 'max-h-96' : 'max-h-0',
        )}
      >
        <nav
          className="flex flex-col gap-1 px-4 py-3"
          aria-label="Menu principal mobile"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setAberto(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/links"
            onClick={() => setAberto(false)}
            className="mt-1 rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground"
          >
            Meus links
          </Link>
        </nav>
      </div>
    </header>
  )
}
