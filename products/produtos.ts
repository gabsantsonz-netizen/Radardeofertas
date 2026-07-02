// =============================================================
//  PRODUTOS - Radar de Ofertas
// -------------------------------------------------------------
//  COMO ADICIONAR UM PRODUTO:
//  1. Copie um bloco { ... } abaixo.
//  2. Altere os campos (nome, descricao, imagem, link, etc).
//  3. "categoria" deve ser o "id" de uma categoria em
//     "categorias.ts".
//  4. "link" é o seu link de afiliado (Shopee, Mercado Livre,
//     Amazon, AliExpress...). O botão "Comprar agora" abre ele.
//  5. Coloque a imagem em /public/produtos e use o caminho
//     começando com "/produtos/...".
//
//  Para REMOVER um produto, basta apagar o bloco { ... }.
// =============================================================

export type Produto = {
  id: string
  nome: string
  descricao: string
  categoria: string
  imagem: string
  preco: number // preço promocional, em reais
  precoOriginal?: number // preço antigo (opcional) para calcular o desconto
  loja?: string // ex: "Shopee", "Amazon", "Mercado Livre"
  link: string // link de afiliado
  destaque?: boolean // true = aparece com selo de destaque
}

export const produtos: Produto[] = [
  {
    id: 'fone-bluetooth',
    nome: 'Fone de Ouvido Bluetooth Pro',
    descricao: 'Cancelamento de ruído, até 30h de bateria e estojo de carga.',
    categoria: 'eletronicos',
    imagem: '/produtos/fone-bluetooth.png',
    preco: 129.9,
    precoOriginal: 299.9,
    loja: 'Shopee',
    link: 'https://shopee.com.br',
    destaque: true,
  },
  {
    id: 'smartwatch',
    nome: 'Smartwatch Fitness GPS',
    descricao: 'Monitor de batimentos, GPS e tela AMOLED resistente à água.',
    categoria: 'eletronicos',
    imagem: '/produtos/smartwatch.png',
    preco: 189.9,
    precoOriginal: 399.0,
    loja: 'Amazon',
    link: 'https://www.amazon.com.br',
    destaque: true,
  },
  {
    id: 'aspirador-robo',
    nome: 'Aspirador de Pó Robô Inteligente',
    descricao: 'Mapeamento por app, função mop e retorno automático à base.',
    categoria: 'casa',
    imagem: '/produtos/aspirador-robo.png',
    preco: 749.0,
    precoOriginal: 1199.0,
    loja: 'Mercado Livre',
    link: 'https://www.mercadolivre.com.br',
  },
  {
    id: 'cafeteira',
    nome: 'Cafeteira Espresso Automática',
    descricao: 'Espresso cremoso em casa com vaporizador de leite integrado.',
    categoria: 'casa',
    imagem: '/produtos/cafeteira.png',
    preco: 459.9,
    precoOriginal: 699.9,
    loja: 'Amazon',
    link: 'https://www.amazon.com.br',
  },
  {
    id: 'caixa-som',
    nome: 'Caixa de Som Portátil à Prova d’água',
    descricao: 'Som potente, graves reforçados e 24h de reprodução.',
    categoria: 'tecnologia',
    imagem: '/produtos/caixa-som.png',
    preco: 159.9,
    precoOriginal: 289.9,
    loja: 'AliExpress',
    link: 'https://pt.aliexpress.com',
    destaque: true,
  },
  {
    id: 'halteres',
    nome: 'Kit Halteres Ajustáveis 20kg',
    descricao: 'Treine em casa com peso regulável e pegada emborrachada.',
    categoria: 'fitness',
    imagem: '/produtos/halteres.png',
    preco: 219.9,
    precoOriginal: 349.9,
    loja: 'Mercado Livre',
    link: 'https://www.mercadolivre.com.br',
  },
  {
    id: 'secador',
    nome: 'Secador de Cabelo Profissional',
    descricao: 'Tecnologia íon, 2200W e três níveis de temperatura.',
    categoria: 'beleza',
    imagem: '/produtos/secador.png',
    preco: 139.9,
    precoOriginal: 249.9,
    loja: 'Shopee',
    link: 'https://shopee.com.br',
  },
  {
    id: 'controle-game',
    nome: 'Controle Sem Fio Gamer',
    descricao: 'Compatível com PC e console, vibração dupla e baixa latência.',
    categoria: 'games',
    imagem: '/produtos/controle-game.png',
    preco: 169.9,
    precoOriginal: 279.9,
    loja: 'Amazon',
    link: 'https://www.amazon.com.br',
    destaque: true,
  },
  {
    id: 'parafusadeira',
    nome: 'Parafusadeira e Furadeira a Bateria',
    descricao: 'Kit com brocas, bivolt e maleta. Ideal para a casa.',
    categoria: 'ferramentas',
    imagem: '/produtos/parafusadeira.png',
    preco: 199.9,
    precoOriginal: 329.9,
    loja: 'Mercado Livre',
    link: 'https://www.mercadolivre.com.br',
  },
]

// Calcula o percentual de desconto a partir dos preços.
export function calcularDesconto(produto: Produto): number {
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
