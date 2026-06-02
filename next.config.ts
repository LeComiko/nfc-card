const isProd = process.env.NODE_ENV === 'production'
const repoName = 'nfc-card'

const nextConfig = {
  output: 'export',
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  images: { unoptimized: true },
}

export default nextConfig
