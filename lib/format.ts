import type { Produto } from '@/lib/types'

// Calcula o percentual de desconto a partir dos preços.
export function calcularDesconto(produto: Pick<Produto, 'preco' | 'precoOriginal'>): number {
  if (!produto.precoOriginal || produto.precoOriginal <= produto.preco) return 0
  return Math.round(
    ((produto.precoOriginal - produto.preco) / produto.precoOriginal) * 100,
  )
}

// Formata um número para o padrão de moeda brasileiro (R$).
export function formatarPreco(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

// Gera um id (slug) a partir de um texto.
export function gerarId(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}
