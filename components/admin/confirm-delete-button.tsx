'use client'

export function ConfirmDeleteButton({
  children,
  className,
  confirmMessage = 'Tem certeza que deseja remover este item?',
}: {
  children: React.ReactNode
  className?: string
  confirmMessage?: string
}) {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (!window.confirm(confirmMessage)) {
      event.preventDefault()
    }
  }

  return (
    <button type="submit" onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
