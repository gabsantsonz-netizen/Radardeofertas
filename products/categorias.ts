// =============================================================
//  CATEGORIAS - Radar de Ofertas
// -------------------------------------------------------------
//  Para adicionar uma nova categoria, basta copiar uma linha
//  abaixo e alterar o "id" (sem espaços/acentos) e o "nome".
//  O "id" precisa ser igual ao usado no campo "categoria"
//  de cada produto em "produtos.ts".
// =============================================================

export type Categoria = {
  id: string
  nome: string
}

export const categorias: Categoria[] = [
  { id: 'ofertas-do-dia', nome: 'Ofertas do dia' },
  { id: 'eletronicos', nome: 'Eletrônicos' },
  { id: 'casa', nome: 'Casa' },
  { id: 'tecnologia', nome: 'Tecnologia' },
  { id: 'fitness', nome: 'Fitness' },
  { id: 'beleza', nome: 'Beleza' },
  { id: 'games', nome: 'Games' },
  { id: 'ferramentas', nome: 'Ferramentas' },
]
