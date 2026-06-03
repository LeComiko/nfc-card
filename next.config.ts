// Le site est servi à la racine du domaine personnalisé carte.interlo.fr,
// donc pas de basePath. NEXT_PUBLIC_BASE_PATH reste exposé (vide) pour que
// ProfileHeader continue de fonctionner sans condition.
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: '' },
}

export default nextConfig
