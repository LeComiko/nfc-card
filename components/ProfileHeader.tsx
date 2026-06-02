import { profile } from '@/config/profile'

// En production sur GitHub Pages, les assets de /public sont servis sous le
// basePath (/nfc-card). Next n'ajoute pas ce préfixe aux <img> bruts, on le
// fait donc manuellement, sinon /photo.jpg renvoie un 404.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function ProfileHeader() {
  return (
    <div className="relative">
      {/* Bannière dégradée */}
      <div className="h-40 bg-gradient-to-br from-primary via-primary to-accent" />

      {/* Photo + logo */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-6 flex items-end justify-between">
        {/* Photo profil — alignée à gauche */}
        <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
          <img
            src={`${base}/photo.jpg`}
            alt={profile.name}
            className="h-full w-full object-cover"
          />
        </div>
        {/* Logo entreprise */}
        <div className="mb-1 h-10 w-10 overflow-hidden rounded-lg">
          <img
            src={`${base}/logo.png`}
            alt={profile.company}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  )
}
