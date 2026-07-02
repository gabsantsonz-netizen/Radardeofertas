import 'server-only'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { Produto, Categoria, Video, Settings } from '@/lib/types'

// =============================================================
//  STORE - leitura/escrita em arquivos JSON locais (sem banco)
// -------------------------------------------------------------
//  Os dados ficam em /data/*.json. Ao hospedar localmente, o
//  painel admin edita esses arquivos diretamente.
// =============================================================

const DATA_DIR = path.join(process.cwd(), 'data')

const FILES = {
  products: path.join(DATA_DIR, 'products.json'),
  categories: path.join(DATA_DIR, 'categories.json'),
  videos: path.join(DATA_DIR, 'videos.json'),
  settings: path.join(DATA_DIR, 'settings.json'),
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

async function writeJson(file: string, data: unknown): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8')
}

/* ----------------------------- Produtos ----------------------------- */
export async function getProdutos(): Promise<Produto[]> {
  return readJson<Produto[]>(FILES.products, [])
}

export async function saveProdutos(produtos: Produto[]): Promise<void> {
  await writeJson(FILES.products, produtos)
}

/* ---------------------------- Categorias ---------------------------- */
export async function getCategorias(): Promise<Categoria[]> {
  const cats = await readJson<Categoria[]>(FILES.categories, [])
  return cats.sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0))
}

export async function saveCategorias(categorias: Categoria[]): Promise<void> {
  await writeJson(FILES.categories, categorias)
}

/* ------------------------------ Vídeos ------------------------------ */
export async function getVideos(): Promise<Video[]> {
  const vids = await readJson<Video[]>(FILES.videos, [])
  return vids.sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0))
}

export async function saveVideos(videos: Video[]): Promise<void> {
  await writeJson(FILES.videos, videos)
}

/* --------------------------- Configurações -------------------------- */
const DEFAULT_SETTINGS: Settings = {
  nomeMarca: 'Radar de Ofertas',
  descricao:
    'Produtos selecionados com os melhores preços e promoções encontrados pelo Radar de Ofertas.',
  logo: '/logo-radar.png',
  grupoVip: 'https://chat.whatsapp.com/',
  instagram: 'https://instagram.com/gabrielsantosnex',
  instagramHandle: '@gabrielsantosnex',
  tiktok: 'https://tiktok.com/@radardeofertas',
  whatsapp: 'https://chat.whatsapp.com/',
  telegram: 'https://t.me/radardeofertas',
}

export async function getSettings(): Promise<Settings> {
  const s = await readJson<Partial<Settings>>(FILES.settings, {})
  return { ...DEFAULT_SETTINGS, ...s }
}

export async function saveSettings(settings: Settings): Promise<void> {
  await writeJson(FILES.settings, settings)
}
