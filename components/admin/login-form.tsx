'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import Image from 'next/image'
import { Lock, Mail, ShieldCheck } from 'lucide-react'
import { loginAction } from '@/app/admin/actions'

function Botao() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60"
    >
      <ShieldCheck className="size-4" />
      {pending ? 'Entrando...' : 'Entrar no painel'}
    </button>
  )
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, { erro: '' })

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="rounded-2xl border border-primary/30 bg-card p-3 shadow-glow">
            <Image
              src="/logo-radar.png"
              alt="Radar de Ofertas"
              width={72}
              height={72}
              priority
            />
          </div>
          <h1 className="mt-4 font-heading text-xl font-bold">
            Painel Administrativo
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Acesso restrito ao administrador.
          </p>
        </div>

        <form
          action={formAction}
          className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">E-mail</span>
            <span className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                name="email"
                required
                autoComplete="username"
                placeholder="admin@radardeofertas.com"
                className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-3 text-sm outline-none transition-colors focus:border-primary"
              />
            </span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Senha</span>
            <span className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                name="senha"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-3 text-sm outline-none transition-colors focus:border-primary"
              />
            </span>
          </label>

          {state?.erro ? (
            <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {state.erro}
            </p>
          ) : null}

          <Botao />
        </form>
      </div>
    </div>
  )
}
