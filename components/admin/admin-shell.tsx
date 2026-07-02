'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Tags,
  Video,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { logoutAction } from '@/app/admin/actions'

const NAV = [
  { href: '/admin/painel', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/painel/produtos', label: 'Produtos', icon: Package },
  { href: '/admin/painel/produtos/novo', label: 'Adicionar Produto', icon: PlusCircle },
  { href: '/admin/painel/categorias', label: 'Categorias', icon: Tags },
  { href: '/admin/painel/videos', label: 'Vídeos', icon: Video },
  { href: '/admin/painel/configuracoes', label: 'Configurações', icon: Settings },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [aberto, setAberto] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-dvh lg:flex">
      {/* Topbar mobile */}
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:hidden">
        <span className="flex items-center gap-2">
          <Image src="/logo-radar.png" alt="Radar de Ofertas" width={32} height={32} />
          <span className="font-heading text-sm font-bold">Painel Admin</span>
        </span>
        <button
          type="button"
          onClick={() => setAberto(true)}
          aria-label="Abrir menu"
          className="rounded-lg border border-border p-2"
        >
          <Menu className="size-5" />
        </button>
      </header>

      {/* Overlay mobile */}
      {aberto && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setAberto(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform lg:static lg:translate-x-0',
          aberto ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b border-border px-5 py-4">
          <span className="flex items-center gap-2.5">
            <Image src="/logo-radar.png" alt="Radar de Ofertas" width={36} height={36} />
            <span className="font-heading text-sm font-bold leading-tight">
              <span className="text-primary">Radar</span> Admin
            </span>
          </span>
          <button
            type="button"
            onClick={() => setAberto(false)}
            aria-label="Fechar menu"
            className="rounded-lg border border-border p-1.5 lg:hidden"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV.map((item) => {
            const ativo =
              item.href === '/admin/painel'
                ? pathname === item.href
                : pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setAberto(false)}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  ativo
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                )}
              >
                <Icon className="size-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex flex-col gap-1 border-t border-border p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ExternalLink className="size-5" />
            Ver site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="size-5" />
              Sair
            </button>
          </form>
        </div>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  )
}
