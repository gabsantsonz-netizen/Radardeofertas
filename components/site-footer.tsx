import Link from "next/link"
import { Logo } from "@/components/logo"
import { site, redesSociais } from "@/products/config"
import { InstagramIcon, TikTokIcon, WhatsAppIcon, TelegramIcon } from "@/components/brand-icons"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Garimpamos as melhores ofertas da internet para você economizar.
            Produtos com desconto real, atualizados todos os dias.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground">Navegação</h3>
          <a href="#ofertas" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Ofertas
          </a>
          <a href="#redes" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Redes sociais
          </a>
          <Link href="/links" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Meus links
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground">Siga o radar</h3>
          <div className="flex gap-3">
            {[
              { href: redesSociais.instagram, Icon: InstagramIcon, label: "Instagram" },
              { href: redesSociais.tiktok, Icon: TikTokIcon, label: "TikTok" },
              { href: redesSociais.whatsapp, Icon: WhatsAppIcon, label: "WhatsApp" },
              { href: redesSociais.telegram, Icon: TelegramIcon, label: "Telegram" },
            ].map(({ href, Icon, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>
            {"\u00A9"} {new Date().getFullYear()} {site.nome}. Todos os direitos reservados.
          </p>
          <p>
            Os links podem ser de afiliados. Preços sujeitos a alteração sem aviso prévio.
          </p>
        </div>
      </div>
    </footer>
  )
}
