const repositoryBase = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/^\/|\/$/g, '')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: repositoryBase ? `/${repositoryBase}` : '',
  assetPrefix: repositoryBase ? `/${repositoryBase}` : undefined,
}

module.exports = nextConfig
