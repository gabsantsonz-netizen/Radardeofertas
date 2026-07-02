import Image from 'next/image'
import { cn } from '@/lib/utils'
import { site } from '@/products/config'

export function Logo({
  className,
  showText = true,
  size = 40,
}: {
  className?: string
  showText?: boolean
  size?: number
}) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <Image
        src="/logo-radar.png"
        alt={`Logo ${site.nome}`}
        width={size}
        height={size}
        className="shrink-0"
        priority
      />
      {showText && (
        <span className="font-heading text-lg font-bold leading-none tracking-tight">
          <span className="text-primary text-glow">Radar</span>{' '}
          <span className="text-foreground">de Ofertas</span>
        </span>
      )}
    </span>
  )
}
