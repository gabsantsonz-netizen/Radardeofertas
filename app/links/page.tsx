import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, ArrowLeft } from "lucide-react"
import { site, redesSociais, linksPagina } from "@/products/config"
import { InstagramIcon, TikTokIcon, WhatsAppIcon, TelegramIcon } from "@/components/brand-icons"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: `Links | ${site.nome}`,
  description: "Todos os links do Radar de Ofertas em um só lugar.",
}

const sociais = [
  { href: redesSociais.instagram, Icon: InstagramIcon, label: "Instagram" },
  { href: redesSociais.tiktok, Icon: TikTokIcon, label: "TikTok" },
  { href: redesSociais.whatsapp, Icon: WhatsAppIcon, label: "WhatsApp" },
  { href: redesSociais.telegram, Icon: TelegramIcon, label: "Telegram" },
]

export default function LinksPage() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center overflow-hidden px-4 py-12">
      {/* brilho de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/15%),transparent_70%)]"
      />

      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 self-start text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Voltar ao site
      </Link>

      <div className="flex w-full max-w-md flex-col items-center">
        <div className="relative flex size-24 items-center justify-center rounded-full border border-primary/30 bg-card shadow-glow">
          <Image
            src="/logo-radar.png"
            alt={`Logo ${site.nome}`}
            width={72}
            height={72}
            className="object-contain"
          />
        </div>

        <h1 className="mt-5 font-heading text-2xl font-bold">{site.nome}</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground text-pretty">
          As melhores ofertas da internet, garimpadas todos os dias para você.
        </p>

        {/* redes sociais */}
        <div className="mt-5 flex gap-3">
          {sociais.map(({ href, Icon, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Icon className="size-5" />
            </Link>
          ))}
        </div>

        {/* botões de links */}
        <nav className="mt-8 flex w-full flex-col gap-3" aria-label="Links">
          {linksPagina.map((item) => {
            const externo = item.url.startsWith("http")
            return (
              <Link
                key={item.titulo}
                href={item.url}
                target={externo ? "_blank" : undefined}
                rel={externo ? "noopener noreferrer" : undefined}
                className={cn(
                  "group flex items-center justify-between gap-3 rounded-xl border px-5 py-4 transition-all hover:-translate-y-0.5",
                  item.destaque
                    ? "border-primary bg-primary text-primary-foreground shadow-glow hover:bg-primary/90"
                    : "border-border bg-card text-foreground hover:border-primary",
                )}
              >
                <span className="flex flex-col text-left">
                  <span className="font-semibold leading-tight">{item.titulo}</span>
                  {item.descricao ? (
                    <span
                      className={cn(
                        "text-xs",
                        item.destaque ? "text-primary-foreground/80" : "text-muted-foreground",
                      )}
                    >
                      {item.descricao}
                    </span>
                  ) : null}
                </span>
                <ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            )
          })}
        </nav>

        <p className="mt-10 text-xs text-muted-foreground">
          {"\u00A9"} {new Date().getFullYear()} {site.nome}
        </p>
      </div>
    </main>
  )
}
