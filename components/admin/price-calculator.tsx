'use client'

import { useMemo, useState } from 'react'

function parseCurrency(value: string): number {
  const normalized = value
    .replace(/[^\d,.-]/g, '')
    .replace('.', '')
    .replace(',', '.')
  const parsed = Number.parseFloat(normalized)
  return Number.isFinite(parsed) ? parsed : 0
}

export function PriceCalculator({
  initialOriginal = '',
  initialPromotional = '',
}: {
  initialOriginal?: string
  initialPromotional?: string
}) {
  const [precoOriginal, setPrecoOriginal] = useState(initialOriginal)
  const [preco, setPreco] = useState(initialPromotional)

  const desconto = useMemo(() => {
    const original = parseCurrency(precoOriginal)
    const promocional = parseCurrency(preco)
    if (!original || !promocional || promocional >= original) return 0
    return Math.round(((original - promocional) / original) * 100)
  }, [precoOriginal, preco])

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Preço original</span>
          <input
            name="precoOriginal"
            type="text"
            inputMode="decimal"
            value={precoOriginal}
            onChange={(event) => setPrecoOriginal(event.target.value)}
            placeholder="R$ 299,90"
            className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Preço promocional</span>
          <input
            name="preco"
            type="text"
            inputMode="decimal"
            value={preco}
            onChange={(event) => setPreco(event.target.value)}
            placeholder="R$ 99,90"
            className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
          />
        </label>
      </div>

      <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
        <p className="text-sm text-muted-foreground">Desconto calculado</p>
        <p className="mt-1 font-heading text-2xl font-bold text-primary">
          {desconto > 0 ? `${desconto}% OFF` : 'Sem desconto'}
        </p>
      </div>
    </div>
  )
}
