import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AddContactButton } from '@/components/AddContactButton'

describe('AddContactButton', () => {
  beforeEach(() => {
    // Mock URL.createObjectURL
    global.URL.createObjectURL = vi.fn(() => 'blob:mock')
    global.URL.revokeObjectURL = vi.fn()

    // Mock document.createElement pour intercepter le click sur le lien
    const originalCreate = document.createElement.bind(document)
    vi.spyOn(document, 'createElement').mockImplementation((tag) => {
      const el = originalCreate(tag)
      if (tag === 'a') {
        vi.spyOn(el as HTMLAnchorElement, 'click').mockImplementation(() => {})
      }
      return el
    })
  })

  it('rend le bouton avec le bon label', () => {
    render(<AddContactButton />)
    expect(screen.getByText('Ajouter à mes contacts')).toBeInTheDocument()
  })

  it('déclenche un téléchargement au clic', () => {
    render(<AddContactButton />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(URL.createObjectURL).toHaveBeenCalledOnce()
  })
})
