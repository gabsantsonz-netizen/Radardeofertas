import Image from 'next/image'
import { Radar, Tag } from 'lucide-react'
import { redesSociais } from '@/products/config'

export function HeroBanner() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-border/60"
    >
      <Image
        src="/banner-hero.png"
        alt=""
        fill
        priority
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:py-24 lg:grid-cols-2 lg:py-28">
        <div className="flex max-w-2xl flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <Radar className="size-4 animate-pulse" />
            Radar ativo, encontrando descontos
          </span>

          <h1 className="text-balance font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Encontre as melhores{' '}
            <span className="text-primary text-glow">ofertas</span> da internet
          </h1>

          <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Produtos selecionados com os melhores preços e promoções encontrados
            pelo Radar de Ofertas.
          </p>

          <a
            href="#ofertas"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-bold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
          >
            <Tag className="size-5" />
            Ver ofertas
          </a>
        </div>

        <a
          href={redesSociais.grupoVip}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Entrar no Grupo VIP de ofertas"
          className="group relative mx-auto w-full max-w-sm transition-transform hover:scale-[1.03] lg:justify-self-end"
        >
          <div className="overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-glow">
            <Image
              src="/images/grupo-vip-popup.png"
              alt="Grupo VIP do Radar de Ofertas"
              width={400}
              height={400}
              className="h-auto w-full"
            />
          </div>
          <span className="absolute inset-x-0 -bottom-3 mx-auto flex w-max items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-glow">
            Entrar no Grupo VIP
          </span>
        </a>
      </div>
    </section>
  )
}
