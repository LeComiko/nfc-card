export const profile = {
  // Identité
  name: 'Filipe Taveira',
  title: 'Fondateur',
  company: 'Interlo',
  description:
    'J\'accompagne les copropriétés et les PME du bâtiment en offrant des services de digitalisation innovants.',

  // Contact
  phone: '+33652837639',
  email: 'filipe@interlo.pro',
  website: 'https://interlo.fr',

  // Réseaux sociaux
  linkedin: 'https://www.linkedin.com/company/116064201',
  whatsapp: 'https://wa.me/33652837639',

  // URL du profil (injectée depuis la variable d'environnement)
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

  // Contenu entreprise
  aboutCompany:
    'Interlo accompagne les copropriétés et les PME du bâtiment dans leur transformation digitale. Nous concevons des services innovants pour simplifier la gestion des interventions, des travaux et de la relation client.',
} as const

export type Profile = typeof profile
