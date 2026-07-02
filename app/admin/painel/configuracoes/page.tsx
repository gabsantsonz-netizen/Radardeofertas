import { getSettings } from '@/lib/store'
import { salvarConfiguracoes } from '@/app/admin/actions'

export const metadata = {
  title: 'Configurações | Painel Radar de Ofertas',
}

export default async function ConfiguracoesPage() {
  const settings = await getSettings()

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">Configurações gerais</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Atualize identidade da marca, links de redes sociais e informações principais.
        </p>
      </div>

      <form action={salvarConfiguracoes} className="space-y-6 rounded-3xl border border-border bg-card p-5 sm:p-7">
        <div className="grid gap-6 lg:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Nome da marca</span>
            <input
              name="nomeMarca"
              defaultValue={settings.nomeMarca}
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Logo</span>
            <input
              name="logo"
              defaultValue={settings.logo}
              placeholder="/logo-radar.png"
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Descrição</span>
          <textarea
            name="descricao"
            rows={4}
            defaultValue={settings.descricao}
            className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
          />
        </label>

        <div className="grid gap-6 lg:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Instagram</span>
            <input name="instagram" defaultValue={settings.instagram} className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Instagram handle</span>
            <input name="instagramHandle" defaultValue={settings.instagramHandle} className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">TikTok</span>
            <input name="tiktok" defaultValue={settings.tiktok} className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">WhatsApp</span>
            <input name="whatsapp" defaultValue={settings.whatsapp} className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Telegram</span>
            <input name="telegram" defaultValue={settings.telegram} className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Grupo VIP</span>
            <input name="grupoVip" defaultValue={settings.grupoVip} className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary" />
          </label>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
            Salvar configurações
          </button>
        </div>
      </form>
    </div>
  )
}
