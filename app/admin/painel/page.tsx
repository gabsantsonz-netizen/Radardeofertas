import Link from 'next/link'
import Image from 'next/image'
import {
  Package,
  Tags,
  Star,
  Video,
  Plus,
  Pencil,
  Settings,
  Sparkles,
} from 'lucide-react'
import { getProdutos, getCategorias, getVideos } from '@/lib/store'
import { formatarPreco } from '@/lib/format'

export default async function DashboardPage() {
  const [produtos, categorias, videos] = await Promise.all([
    getProdutos(),
    getCategorias(),
    getVideos(),
  ])

  const ativos = produtos.filter((p) => p.ativo !== false).length
  const promos = produtos.filter((p) => p.precoOriginal && p.precoOriginal > p.preco).length
  const destaques = produtos.filter((p) => p.destaque || p.status === 'destaque' || p.ofertaEspecial).length
  const ultimos = [...produtos]
    .sort((a, b) => (b.criadoEm ?? '').localeCompare(a.criadoEm ?? ''))
    .slice(0, 5)

  const stats = [
    { label: 'Produtos totais', valor: produtos.length, icon: Package },
    { label: 'Ativos', valor: ativos, icon: Sparkles },
    { label: 'Em promoção', valor: promos, icon: Star },
    { label: 'Destaques', valor: destaques, icon: Star },
    { label: 'Categorias', valor: categorias.length, icon: Tags },
    { label: 'Vídeos', valor: videos.length, icon: Video },
  ]

  const atalhos = [
    { href: '/admin/painel/produtos/novo', label: 'Adicionar Produto', icon: Plus },
    { href: '/admin/painel/produtos', label: 'Editar Produtos', icon: Pencil },
    { href: '/admin/painel/categorias', label: 'Gerenciar Categorias', icon: Tags },
    { href: '/admin/painel/videos', label: 'Gerenciar Vídeos', icon: Video },
    { href: '/admin/painel/configuracoes', label: 'Configurações', icon: Settings },
  ]

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-heading text-2xl font-bold sm:text-3xl">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Resumo geral do Radar de Ofertas.
      </p>

      {/* Cards de resumo */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <Icon className="size-5 text-primary" />
              </div>
              <p className="mt-2 font-heading text-3xl font-bold">{s.valor}</p>
            </div>
          )
        })}
      </div>

      {/* Atalhos */}
      <h2 className="mt-8 font-heading text-lg font-bold">Atalhos</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {atalhos.map((a) => {
          const Icon = a.icon
          return (
            <Link
              key={a.href}
              href={a.href}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-5 text-center text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Icon className="size-6 text-primary" />
              {a.label}
            </Link>
          )
        })}
      </div>

      {/* Últimos produtos */}
      <h2 className="mt-8 font-heading text-lg font-bold">
        Últimos produtos adicionados
      </h2>
      <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-card">
        {ultimos.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">
            Nenhum produto cadastrado ainda.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {ultimos.map((p) => (
              <li key={p.id} className="flex items-center gap-3 p-3">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-secondary">
                  <Image
                    src={p.imagem || '/placeholder.svg'}
                    alt={p.nome}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{p.nome}</span>
                  <span className="block text-xs text-muted-foreground">
                    {formatarPreco(p.preco)}
                  </span>
                </span>
                <Link
                  href={`/admin/painel/produtos/${p.id}`}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary hover:text-primary"
                >
                  Editar
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
