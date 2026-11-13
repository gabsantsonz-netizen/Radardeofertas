import { SiteHeader } from "@/components/site-header"
import { HeroBanner } from "@/components/hero-banner"
import { ProductGrid } from "@/components/product-grid"
import { VideoSection } from "@/components/video-section"
import { SocialSection } from "@/components/social-section"
import { SiteFooter } from "@/components/site-footer"
import { VipPopup } from "@/components/vip-popup"
import { CookieConsent } from "@/components/cookie-consent"
import { getProdutos, getCategorias, getVideos } from '@/lib/store'

export default async function HomePage() {
  const [produtos, categorias, videos] = await Promise.all([
    getProdutos(),
    getCategorias(),
    getVideos(),
  ])

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id="inicio" className="flex-1">
        <HeroBanner />
        <ProductGrid produtosIniciais={produtos} categoriasIniciais={categorias} />
        <VideoSection videos={videos} />
        <SocialSection />
      </main>
      <SiteFooter />
      <VipPopup />
      <CookieConsent />
    </div>
  )
}
