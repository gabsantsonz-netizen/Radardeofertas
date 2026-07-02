import 'server-only'
import { cookies } from 'next/headers'
import { createHmac } from 'node:crypto'

// =============================================================
//  AUTENTICAÇÃO DO ADMIN (sem banco de dados)
// -------------------------------------------------------------
//  Credenciais iniciais. Para alterar, mude os valores abaixo.
// =============================================================
const ADMIN_EMAIL = 'admin@radardeofertas.com'
const ADMIN_PASSWORD = 'Radar@2026Admin'

// Segredo usado para assinar o cookie de sessão.
const SECRET = 'radar-de-ofertas-painel-secreto-2026'
const COOKIE_NAME = 'radar_admin_session'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 dias

function assinar(valor: string): string {
  return createHmac('sha256', SECRET).update(valor).digest('hex')
}

function tokenValido(): string {
  return assinar(ADMIN_EMAIL + ADMIN_PASSWORD)
}

export function validarCredenciais(email: string, senha: string): boolean {
  return email.trim().toLowerCase() === ADMIN_EMAIL && senha === ADMIN_PASSWORD
}

export async function criarSessao(): Promise<void> {
  const store = await cookies()
  store.set(COOKIE_NAME, tokenValido(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  })
}

export async function encerrarSessao(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function estaAutenticado(): Promise<boolean> {
  const store = await cookies()
  return store.get(COOKIE_NAME)?.value === tokenValido()
}
