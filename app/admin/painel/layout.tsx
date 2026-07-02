import { redirect } from 'next/navigation'
import { estaAutenticado } from '@/lib/auth'
import { AdminShell } from '@/components/admin/admin-shell'

export const metadata = {
  title: 'Painel | Radar de Ofertas',
}

export default async function PainelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!(await estaAutenticado())) redirect('/admin')
  return <AdminShell>{children}</AdminShell>
}
