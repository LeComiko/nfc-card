export const profile = {
  // Identité
  name: 'Filipe Taveira',
  title: 'Directeur Opérations',
  company: 'FT Solutions',
  description:
    'Nous accompagnons les copropriétés et entreprises dans la gestion de leurs interventions et travaux.',

  // Contact — [À COMPLÉTER avant mise en production]
  phone: '+33600000000',
  email: 'contact@ftsolutions.fr',
  website: 'https://ftsolutions.fr',

  // Réseaux sociaux — [À COMPLÉTER avant mise en production]
  linkedin: 'https://linkedin.com/in/filipe-taveira',
  instagram: 'https://instagram.com/ftsolutions',
  facebook: 'https://facebook.com/ftsolutions',
  whatsapp: 'https://wa.me/33600000000',

  // URL du profil (injectée depuis la variable d'environnement)
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

  // Contenu entreprise
  aboutCompany:
    'Nous accompagnons les copropriétés et entreprises dans la gestion de leurs interventions et travaux. Notre équipe qualifiée intervient rapidement pour tous vos besoins en maintenance et rénovation.',
} as const

export type Profile = typeof profile
