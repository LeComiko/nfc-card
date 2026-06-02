'use client'

import { useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Download } from 'lucide-react'
import { profile } from '@/config/profile'

export function QrCodeSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  function handleDownload() {
    // On récupère le <canvas> rendu par QRCodeCanvas via le container —
    // plus robuste que le forwarding de ref selon la version de qrcode.react.
    const canvas = containerRef.current?.querySelector('canvas')
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = 'qr-code-filipe-taveira.png'
    link.href = url
    link.click()
  }

  return (
    <div className="mt-6 px-6 pb-12">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-center text-base font-bold text-primary">
          Partager ma carte
        </h2>
        <div ref={containerRef} className="flex justify-center">
          <QRCodeCanvas
            value={profile.siteUrl}
            size={160}
            bgColor="#ffffff"
            fgColor="#111111"
            level="M"
          />
        </div>
        <button
          onClick={handleDownload}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-primary transition-colors hover:bg-gray-50 active:scale-95"
        >
          <Download size={16} />
          Télécharger le QR code
        </button>
      </div>
    </div>
  )
}
