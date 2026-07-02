// =============================================================
//  CONFIGURAÇÕES GERAIS - Radar de Ofertas
// -------------------------------------------------------------
//  Altere aqui seus links de redes sociais, grupo VIP e
//  informações da marca. Esses dados são usados no cabeçalho,
//  no popup VIP, na página /links e no rodapé.
// =============================================================

export const site = {
  nome: 'Radar de Ofertas',
  desenvolvedor: '@gabrielsantosnex',
}

export const redesSociais = {
  // Link do grupo (WhatsApp ou Telegram) usado no popup VIP
  grupoVip: 'https://chat.whatsapp.com/',

  instagram: 'https://www.instagram.com/radardeofertas.gv/',
  instagramHandle: '@gabrielsantosnex',

  tiktok: 'https://www.tiktok.com/@radardeofertas9763',

  whatsapp: 'https://chat.whatsapp.com/Bw8kaijFyUcIZn8wH61xel?mode=gi_t&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnT0vjqdZCE1bNRwuxI7yYN0Z01XYbBB3S0l2RH3y5BXyOikx2ACVs7ZwaEZk_aem_BueGHZA6cFet9ivmhHBk6w',

  telegram: 'https://t.me/+1A72WgoMkic1YzIx',
}

// =============================================================
//  LINKS DA PÁGINA /links (estilo Linktree)
// -------------------------------------------------------------
//  Adicione, remova ou reordene os botões da sua página de links.
//  "destaque: true" deixa o botão com a cor verde preenchida.
// =============================================================
export type LinkItem = {
  titulo: string
  descricao?: string
  url: string
  destaque?: boolean
}

export const linksPagina: LinkItem[] = [
  {
    titulo: 'Grupo VIP de Ofertas',
    descricao: 'Promoções exclusivas todos os dias',
    url: redesSociais.grupoVip,
    destaque: true,
  },
  {
    titulo: 'Ver todas as ofertas',
    descricao: 'Catálogo completo no site',
    url: '/',
  },
  {
    titulo: 'Instagram',
    descricao: redesSociais.instagramHandle,
    url: redesSociais.instagram,
  },
  {
    titulo: 'TikTok',
    descricao: 'Vídeos das melhores ofertas',
    url: redesSociais.tiktok,
  },
  {
    titulo: 'Telegram',
    descricao: 'Canal de ofertas em tempo real',
    url: redesSociais.telegram,
  },
]
