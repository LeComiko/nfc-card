import { Suspense } from 'react'
import { NfcDetectedOverlay } from '@/components/NfcDetectedOverlay'
import { ProfileHeader } from '@/components/ProfileHeader'
import { ProfileInfo } from '@/components/ProfileInfo'
import { AddContactButton } from '@/components/AddContactButton'
import { ActionButtons } from '@/components/ActionButtons'
import { CompanySection } from '@/components/CompanySection'
import { SocialGrid } from '@/components/SocialGrid'
import { QrCodeSection } from '@/components/QrCodeSection'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      {/* Suspense requis par Next.js 15 pour useSearchParams */}
      <Suspense>
        <NfcDetectedOverlay />
      </Suspense>

      <div className="mx-auto max-w-md">
        <ProfileHeader />
        <ProfileInfo />
        <AddContactButton />
        <ActionButtons />
        <CompanySection />
        <SocialGrid />
        <QrCodeSection />
      </div>
    </main>
  )
}
