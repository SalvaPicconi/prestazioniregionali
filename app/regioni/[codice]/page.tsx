import fs from 'fs'
import path from 'path'

import RegionPageClient from './RegionPageClient'

const regionsDir = path.join(process.cwd(), 'public/data/regions')

export function generateStaticParams() {
  return fs
    .readdirSync(regionsDir)
    .filter((file) => file.endsWith('.json') && file !== 'index.json')
    .map((file) => ({
      codice: file.replace('.json', '').toUpperCase(),
    }))
}

export default function RegionePage({
  params,
}: {
  params: {
    codice: string
  }
}) {
  const codice = params.codice.toUpperCase()
  return <RegionPageClient codice={codice} />
}
