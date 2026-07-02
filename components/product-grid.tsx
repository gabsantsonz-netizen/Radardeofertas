'use client'

import { useMemo, useState } from 'react'
import { Search, SearchX } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'
import type { Produto, Categoria } from '@/lib/types'

export function ProductGrid({
  produtosIniciais,
  categoriasIniciais,
}: {
  produtosIniciais: Produto[]
  categoriasIniciais: Categoria[]
}) {
  const [busca, setBusca] = useState('')
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('todas')

  const produtosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return produtosIniciais.filter((p) => {
      const nomeCategoria =
        categoriasIniciais.find((c) => c.id === p.categoria)?.nome ?? ''
      const correspondeBusca =
        termo === '' ||
        p.nome.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo) ||
        nomeCategoria.toLowerCase().includes(termo) ||
        p.categoria.toLowerCase().includes(termo)
      const correspondeCategoria =
        categoriaAtiva === 'todas' || p.categoria === categoriaAtiva
      return correspondeBusca && correspondeCategoria
    })
  }, [busca, categoriaAtiva])

  return (
    <section id="ofertas" className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">
          Ofertas selecionadas
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pesquise por nome, categoria ou palavra-chave.
        </p>
      </div>

      {/* Barra de pesquisa */}
      <div className="relative mb-5">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Pesquisar produtos..."
          aria-label="Pesquisar produtos"
          className="w-full rounded-full border border-border bg-card py-3 pl-12 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
        />
      </div>

      {/* Filtro de categorias */}
      <div
        id="categorias"
        className="mb-8 flex snap-x gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <CategoriaBotao
          ativo={categoriaAtiva === 'todas'}
          onClick={() => setCategoriaAtiva('todas')}
        >
          Todas
        </CategoriaBotao>
        {categoriasIniciais.map((c) => (
          <CategoriaBotao
            key={c.id}
            ativo={categoriaAtiva === c.id}
            onClick={() => setCategoriaAtiva(c.id)}
          >
            {c.nome}
          </CategoriaBotao>
        ))}
      </div>

      {produtosFiltrados.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {produtosFiltrados.map((p) => (
            <ProductCard
              key={p.id}
              produto={p}
              categoriaNome={categoriasIniciais.find((c) => c.id === p.categoria)?.nome}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
          <SearchX className="size-10 text-muted-foreground" />
          <p className="font-medium">Nenhum produto encontrado</p>
          <p className="text-sm text-muted-foreground">
            Tente outra palavra-chave ou categoria.
          </p>
        </div>
      )}
    </section>
  )
}

function CategoriaBotao({
  children,
  ativo,
  onClick,
}: {
  children: React.ReactNode
  ativo: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-medium transition-colors',
        ativo
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border text-muted-foreground hover:border-primary hover:text-primary',
      )}
    >
      {children}
    </button>
  )
}
