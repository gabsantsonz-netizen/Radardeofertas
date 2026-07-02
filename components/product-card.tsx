import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import type { Produto } from '@/lib/types'
import { calcularDesconto, formatarPreco } from '@/lib/format'

export function ProductCard({
  produto,
  categoriaNome,
}: {
  produto: Produto
  categoriaNome?: string
}) {
  const desconto = calcularDesconto(produto)
  const nomeCategoria = categoriaNome ?? produto.categoria

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/50">
      <div className="relative aspect-square overflow-hidden bg-secondary/40">
        <Image
          src={produto.imagem}
          alt={produto.nome}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {desconto > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-promo px-2.5 py-1 text-xs font-extrabold text-promo-foreground">
            -{desconto}%
          </span>
        )}
        {produto.destaque && (
          <span className="absolute right-2 top-2 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
            Destaque
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-primary">
          {nomeCategoria}
        </span>
        <h3 className="text-pretty font-semibold leading-snug">
          {produto.nome}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {produto.descricao}
        </p>

        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">
              {formatarPreco(produto.preco)}
            </span>
            {produto.precoOriginal && (
              <span className="text-sm text-muted-foreground line-through">
                {formatarPreco(produto.precoOriginal)}
              </span>
            )}
          </div>
          {produto.loja && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              na {produto.loja}
            </p>
          )}

          <a
            href={produto.link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            <ShoppingBag className="size-4" />
            Comprar agora
          </a>
        </div>
      </div>
    </article>
  )
}
