import { redirect } from 'next/navigation'
import { estaAutenticado } from '@/lib/auth'
import { LoginForm } from '@/components/admin/login-form'

export const metadata = {
  title: 'Login | Painel Radar de Ofertas',
}

export default async function AdminLoginPage() {
  if (await estaAutenticado()) redirect('/admin/painel')
  return <LoginForm />
}
