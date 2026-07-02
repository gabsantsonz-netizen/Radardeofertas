import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Radar de Ofertas | As melhores ofertas da internet',
  description:
    'Produtos selecionados com os melhores preços e promoções encontrados pelo Radar de Ofertas. Eletrônicos, casa, tecnologia, fitness, beleza, games e muito mais.',
  generator: 'v0.app',
  keywords: [
    'ofertas',
    'promoções',
    'descontos',
    'produtos afiliados',
    'Radar de Ofertas',
  ],
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0f0c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
