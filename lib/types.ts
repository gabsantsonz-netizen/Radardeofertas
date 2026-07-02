// =============================================================
//  TIPOS DE DADOS - Radar de Ofertas
// =============================================================

export type ProdutoStatus = 'ativo' | 'inativo' | 'destaque' | 'oferta'

export type Produto = {
  id: string
  nome: string
  descricao: string
  categoria: string // id da categoria
  imagem: string // imagem principal
  imagensAdicionais?: string[]
  preco: number // preço promocional
  precoOriginal?: number // preço normal (riscado)
  loja?: string // marketplace
  link: string // link de afiliado
  tipoEntrega?: string
  destaque?: boolean
  ofertaEspecial?: boolean
  ativo?: boolean
  status?: ProdutoStatus
  criadoEm?: string // ISO date
}

export type Categoria = {
  id: string
  nome: string
  imagem?: string
  ordem?: number
}

export type Video = {
  id: string
  nome: string
  thumbnail?: string
  videoUrl?: string // link externo ou arquivo
  produtoRelacionado?: string // id do produto
  linkAfiliado?: string
  ordem?: number
  ativo?: boolean
}

export type Settings = {
  nomeMarca: string
  descricao: string
  logo: string
  grupoVip: string
  instagram: string
  instagramHandle: string
  tiktok: string
  whatsapp: string
  telegram: string
}
