import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { profile } from '@/config/profile'

// Police auto-hébergée par Next (pas de requête bloquante vers Google Fonts)
// — meilleur score Lighthouse que l'@import CSS.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title} | ${profile.company}`,
  description: profile.description,
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.description,
    url: profile.siteUrl,
    siteName: profile.company,
    images: [
      {
        url: `${profile.siteUrl}/photo.jpg`,
        width: 400,
        height: 400,
        alt: profile.name,
      },
    ],
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — ${profile.title}`,
    description: profile.description,
    images: [`${profile.siteUrl}/photo.jpg`],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  worksFor: {
    '@type': 'Organization',
    name: profile.company,
    url: profile.website,
  },
  email: profile.email,
  telephone: profile.phone,
  url: profile.siteUrl,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
