'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ImageIcon, UploadCloud, Trash2 } from 'lucide-react'

export function ImageUploadField({
  name,
  label,
  initialValue,
  accept = 'image/png,image/jpeg,image/webp',
  valueName = 'imagem',
}: {
  name: string
  label: string
  initialValue?: string
  accept?: string
  valueName?: string
}) {
  const [preview, setPreview] = useState(initialValue || '')
  const [remover, setRemover] = useState(false)

  useEffect(() => {
    setPreview(initialValue || '')
    setRemover(false)
  }, [initialValue])

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    setRemover(false)
  }

  return (
    <div className="space-y-3 rounded-2xl border border-border bg-background/60 p-4">
      <div className="flex items-center justify-between gap-2">
        <label className="text-sm font-medium">{label}</label>
        {preview ? (
          <button
            type="button"
            onClick={() => {
              setPreview('')
              setRemover(true)
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive"
          >
            <Trash2 className="size-3.5" />
            Remover
          </button>
        ) : null}
      </div>

      <input type="hidden" name={valueName} value={preview || initialValue || ''} />
      <input type="hidden" name="imagemAtual" value={initialValue || ''} />
      <input type="hidden" name="removerImagem" value={remover ? '1' : '0'} />

      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card/70 px-4 py-6 text-center text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">
        <UploadCloud className="size-6" />
        <span className="font-medium text-foreground">Clique para selecionar uma imagem</span>
        <span>PNG, JPG ou WEBP</span>
        <input
          type="file"
          name={name}
          accept={accept}
          onChange={handleFileChange}
          className="sr-only"
        />
      </label>

      {preview ? (
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          <Image
            src={preview}
            alt="Pré-visualização"
            width={800}
            height={480}
            className="h-48 w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex min-h-32 items-center justify-center rounded-2xl border border-dashed border-border bg-card/40">
          <div className="text-center text-sm text-muted-foreground">
            <ImageIcon className="mx-auto mb-2 size-7" />
            <p>Nenhuma imagem selecionada</p>
          </div>
        </div>
      )}
    </div>
  )
}
