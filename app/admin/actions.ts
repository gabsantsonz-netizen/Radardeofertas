'use server'

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  validarCredenciais,
  criarSessao,
  encerrarSessao,
  estaAutenticado,
} from '@/lib/auth'
import {
  getProdutos,
  saveProdutos,
  getCategorias,
  saveCategorias,
  getVideos,
  saveVideos,
  getSettings,
  saveSettings,
} from '@/lib/store'
import { gerarId } from '@/lib/format'
import type { Produto, Categoria, Video, Settings, ProdutoStatus } from '@/lib/types'

function parseCurrency(value: FormDataEntryValue | null): number {
  const raw = String(value ?? '').trim()
  if (!raw) return 0
  const normalized = raw
    .replace(/[^\d,.-]/g, '')
    .replace('.', '')
    .replace(',', '.')
  const parsed = Number.parseFloat(normalized)
  return Number.isFinite(parsed) ? parsed : 0
}

async function exigirAuth() {
  if (!(await estaAutenticado())) redirect('/admin')
}

function revalidarTudo() {
  revalidatePath('/')
  revalidatePath('/links')
  revalidatePath('/admin/painel', 'layout')
  revalidatePath('/admin/painel/produtos')
  revalidatePath('/admin/painel/categorias')
  revalidatePath('/admin/painel/videos')
  revalidatePath('/admin/painel/configuracoes')
}

function resolverFormData(prevState: unknown, formDataArg?: FormData): FormData {
  if (formDataArg instanceof FormData) return formDataArg
  if (prevState instanceof FormData) return prevState
  throw new Error('FormData não foi recebido pela action.')
}

/* ------------------------------ Login ------------------------------- */
export async function loginAction(prevState: unknown, formDataArg?: FormData) {
  const formData = resolverFormData(prevState, formDataArg)
  const email = String(formData.get('email') ?? '')
  const senha = String(formData.get('senha') ?? '')
  if (!validarCredenciais(email, senha)) {
    return { erro: 'E-mail ou senha incorretos.' }
  }
  await criarSessao()
  redirect('/admin/painel')
}

export async function logoutAction() {
  await encerrarSessao()
  redirect('/admin')
}

/* ----------------------------- Upload ------------------------------- */
// Salva uma imagem enviada em /public/uploads e devolve o caminho.
export async function uploadImagem(formData: FormData): Promise<string | null> {
  await exigirAuth()
  const file =
    (formData.get('file') as File | null) ??
    (formData.get('imagemArquivo') as File | null) ??
    (formData.get('thumbnailArquivo') as File | null) ??
    (formData.get('logoArquivo') as File | null)
  if (!file || file.size === 0) return null

  const ext = (file.name.split('.').pop() ?? 'png').toLowerCase()
  const permitido = ['jpg', 'jpeg', 'png', 'webp']
  const safeExt = permitido.includes(ext) ? ext : 'png'
  const nome = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`

  const dir = path.join(process.cwd(), 'public', 'uploads')
  await fs.mkdir(dir, { recursive: true })
  const buffer = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(path.join(dir, nome), buffer)

  return `/uploads/${nome}`
}

/* ----------------------------- Produtos ----------------------------- */
export async function salvarProduto(prevState: unknown, formDataArg?: FormData) {
  await exigirAuth()
  const formData = resolverFormData(prevState, formDataArg)
  const produtos = await getProdutos()

  const idExistente = String(formData.get('id') ?? '').trim()
  const nome = String(formData.get('nome') ?? '').trim()
  if (!nome) return { erro: 'Informe o nome do produto.' }

  const imagensAdicionais = String(formData.get('imagensAdicionais') ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const imagemArquivo = formData.get('imagemArquivo') as File | null
  const imagemAtual = String(formData.get('imagemAtual') ?? '').trim()
  const imagemValor = String(formData.get('imagem') ?? '').trim()
  const removerImagem = formData.get('removerImagem') === '1'

  let imagem = imagemValor || imagemAtual || '/placeholder.svg'
  if (imagemArquivo && imagemArquivo.size > 0) {
    const imagemSalva = await uploadImagem(formData)
    if (imagemSalva) imagem = imagemSalva
  } else if (removerImagem) {
    imagem = '/placeholder.svg'
  }

  const precoOriginal = parseCurrency(formData.get('precoOriginal'))
  const precoPromocional = parseCurrency(formData.get('preco'))
  const status = String(formData.get('status') ?? 'ativo') as ProdutoStatus
  const tipoEntrega =
    String(formData.get('tipoEntregaPersonalizado') ?? '').trim() ||
    String(formData.get('tipoEntrega') ?? '').trim() || undefined
  const loja =
    String(formData.get('loja') ?? '').trim() ||
    String(formData.get('lojaPersonalizada') ?? '').trim() || undefined

  const dados: Produto = {
    id: idExistente || gerarId(nome) || `produto-${Date.now()}`,
    nome,
    descricao: String(formData.get('descricao') ?? '').trim(),
    categoria: String(formData.get('categoria') ?? '').trim(),
    imagem,
    imagensAdicionais,
    preco: precoPromocional,
    precoOriginal: Number.isFinite(precoOriginal) && precoOriginal > 0 ? precoOriginal : undefined,
    loja,
    link: String(formData.get('link') ?? '').trim(),
    tipoEntrega,
    status,
    destaque: status === 'destaque' || status === 'oferta',
    ofertaEspecial: status === 'oferta',
    ativo: status !== 'inativo',
  }

  const indice = produtos.findIndex((p) => p.id === idExistente)
  if (indice >= 0) {
    dados.criadoEm = produtos[indice].criadoEm
    produtos[indice] = dados
  } else {
    dados.criadoEm = new Date().toISOString()
    produtos.unshift(dados)
  }

  await saveProdutos(produtos)
  revalidarTudo()
  redirect('/admin/painel/produtos')
}

export async function excluirProduto(prevState: unknown, formDataArg?: FormData) {
  await exigirAuth()
  const formData = resolverFormData(prevState, formDataArg)
  const id = String(formData.get('id') ?? '')
  const produtos = await getProdutos()
  await saveProdutos(produtos.filter((p) => p.id !== id))
  revalidarTudo()
  redirect('/admin/painel/produtos')
}

export async function duplicarProduto(prevState: unknown, formDataArg?: FormData) {
  await exigirAuth()
  const formData = resolverFormData(prevState, formDataArg)
  const id = String(formData.get('id') ?? '')
  const produtos = await getProdutos()
  const produto = produtos.find((item) => item.id === id)
  if (!produto) {
    redirect('/admin/painel/produtos')
  }

  const copia: Produto = {
    ...produto,
    id: `${produto.id}-copia-${Date.now()}`,
    nome: `${produto.nome} (cópia)`,
    criadoEm: new Date().toISOString(),
  }

  produtos.unshift(copia)
  await saveProdutos(produtos)
  revalidarTudo()
  redirect('/admin/painel/produtos')
}

/* ---------------------------- Categorias ---------------------------- */
export async function salvarCategoria(prevState: unknown, formDataArg?: FormData) {
  await exigirAuth()
  const formData = resolverFormData(prevState, formDataArg)
  const categorias = await getCategorias()
  const idExistente = String(formData.get('id') ?? '').trim()
  const nome = String(formData.get('nome') ?? '').trim()
  if (!nome) return

  const dados: Categoria = {
    id: idExistente || gerarId(nome),
    nome,
    imagem: String(formData.get('imagem') ?? '').trim() || undefined,
    ordem: Number(formData.get('ordem') ?? 0),
  }

  const indice = categorias.findIndex((c) => c.id === idExistente)
  if (indice >= 0) categorias[indice] = dados
  else categorias.push(dados)

  await saveCategorias(categorias)
  revalidarTudo()
  redirect('/admin/painel/categorias')
}

export async function excluirCategoria(prevState: unknown, formDataArg?: FormData) {
  await exigirAuth()
  const formData = resolverFormData(prevState, formDataArg)
  const id = String(formData.get('id') ?? '')
  const categorias = await getCategorias()
  await saveCategorias(categorias.filter((c) => c.id !== id))
  revalidarTudo()
  redirect('/admin/painel/categorias')
}

/* ------------------------------ Vídeos ------------------------------ */
export async function salvarVideo(prevState: unknown, formDataArg?: FormData) {
  await exigirAuth()
  const formData = resolverFormData(prevState, formDataArg)
  const videos = await getVideos()
  const idExistente = String(formData.get('id') ?? '').trim()
  const nome = String(formData.get('nome') ?? '').trim()
  if (!nome) return

  const thumbnailArquivo = formData.get('thumbnailArquivo') as File | null
  const thumbnailAtual = String(formData.get('thumbnailAtual') ?? '').trim()
  const thumbnailValor = String(formData.get('thumbnail') ?? '').trim()
  const removerThumbnail = formData.get('removerThumbnail') === '1'

  let thumbnail = thumbnailValor || thumbnailAtual || undefined
  if (thumbnailArquivo && thumbnailArquivo.size > 0) {
    const thumbnailSalvo = await uploadImagem(formData)
    if (thumbnailSalvo) thumbnail = thumbnailSalvo
  } else if (removerThumbnail) {
    thumbnail = undefined
  }

  const existente = videos.find((v) => v.id === idExistente)
  const dados: Video = {
    // preserva campos que o formulário não edita (descricao, publicadoEm)
    ...existente,
    id: idExistente || gerarId(nome) || `video-${Date.now()}`,
    nome,
    thumbnail,
    videoUrl: String(formData.get('videoUrl') ?? '').trim() || undefined,
    produtoRelacionado:
      String(formData.get('produtoRelacionado') ?? '').trim() || undefined,
    linkAfiliado: String(formData.get('linkAfiliado') ?? '').trim() || undefined,
    ordem: Number(formData.get('ordem') ?? 0),
    ativo: formData.get('ativo') === 'on',
    publicadoEm: existente?.publicadoEm ?? new Date().toISOString(),
  }

  const indice = videos.findIndex((v) => v.id === idExistente)
  if (indice >= 0) videos[indice] = dados
  else videos.push(dados)

  await saveVideos(videos)
  revalidarTudo()
  redirect('/admin/painel/videos')
}

export async function excluirVideo(prevState: unknown, formDataArg?: FormData) {
  await exigirAuth()
  const formData = resolverFormData(prevState, formDataArg)
  const id = String(formData.get('id') ?? '')
  const videos = await getVideos()
  await saveVideos(videos.filter((v) => v.id !== id))
  revalidarTudo()
  redirect('/admin/painel/videos')
}

/* --------------------------- Configurações -------------------------- */
export async function salvarConfiguracoes(prevState: unknown, formDataArg?: FormData) {
  await exigirAuth()
  const formData = resolverFormData(prevState, formDataArg)
  const atual = await getSettings()
  const logoArquivo = formData.get('logoArquivo') as File | null
  const logoAtual = String(formData.get('logoAtual') ?? '').trim()
  const logoValor = String(formData.get('logo') ?? '').trim()
  const removerLogo = formData.get('removerLogo') === '1'

  let logo = logoValor || logoAtual || atual.logo
  if (logoArquivo && logoArquivo.size > 0) {
    const logoSalvo = await uploadImagem(formData)
    if (logoSalvo) logo = logoSalvo
  } else if (removerLogo) {
    logo = atual.logo
  }

  const dados: Settings = {
    nomeMarca: String(formData.get('nomeMarca') ?? '').trim() || atual.nomeMarca,
    descricao: String(formData.get('descricao') ?? '').trim(),
    logo,
    grupoVip: String(formData.get('grupoVip') ?? '').trim(),
    instagram: String(formData.get('instagram') ?? '').trim(),
    instagramHandle: String(formData.get('instagramHandle') ?? '').trim(),
    tiktok: String(formData.get('tiktok') ?? '').trim(),
    whatsapp: String(formData.get('whatsapp') ?? '').trim(),
    telegram: String(formData.get('telegram') ?? '').trim(),
  }
  await saveSettings(dados)
  revalidarTudo()
  redirect('/admin/painel/configuracoes')
}
