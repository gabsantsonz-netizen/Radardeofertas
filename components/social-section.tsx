import Link from "next/link"
import { redesSociais } from "@/products/config"
import { InstagramIcon, TikTokIcon, WhatsAppIcon, TelegramIcon } from "@/components/brand-icons"

const canais = [
  {
    nome: "Instagram",
    href: redesSociais.instagram,
    Icon: InstagramIcon,
    descricao: "Bastidores e novidades diárias",
  },
  {
    nome: "TikTok",
    href: redesSociais.tiktok,
    Icon: TikTokIcon,
    descricao: "Vídeos das melhores ofertas",
  },
  {
    nome: "WhatsApp",
    href: redesSociais.whatsapp,
    Icon: WhatsAppIcon,
    descricao: "Grupo VIP com promoções",
  },
  {
    nome: "Telegram",
    href: redesSociais.telegram,
    Icon: TelegramIcon,
    descricao: "Canal de ofertas em tempo real",
  },
]

export function SocialSection() {
  return (
    <section id="redes" className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <div className="mb-8 text-center">
        <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
          Siga o radar nas redes
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-pretty text-muted-foreground">
          Não perca nenhuma oferta. Acompanhe os canais e ative as notificações.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {canais.map(({ nome, href, Icon, descricao }) => (
          <Link
            key={nome}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-primary hover:bg-secondary"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary transition-transform group-hover:scale-110">
              <Icon className="size-7" />
            </span>
            <span className="text-base font-semibold">{nome}</span>
            <span className="text-sm text-muted-foreground">{descricao}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
