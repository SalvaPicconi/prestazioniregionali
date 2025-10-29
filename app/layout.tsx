import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Prestazioni Regionali - Non Autosufficienza e Disabilità',
  description: 'Sistema di consultazione delle prestazioni regionali italiane per non autosufficienza e disabilità. A cura del Dott. Picconi - Consulente per la non autosufficienza.',
  keywords: 'welfare, disabilità, non autosufficienza, prestazioni regionali, assistenza sociale, Italia, Legge 104, indennità accompagnamento',
  authors: [{ name: 'Dott. Picconi' }],
  openGraph: {
    title: 'Prestazioni Regionali - Non Autosufficienza e Disabilità',
    description: 'Consulta tutte le prestazioni regionali per non autosufficienza e disabilità in Italia',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-gray-50">
        <nav className="bg-blue-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Prestazioni Regionali</h1>
                <p className="text-sm text-blue-100">Non Autosufficienza e Disabilità</p>
              </div>
              <div className="text-right">
                <p className="text-sm">A cura del</p>
                <p className="font-semibold">Dott. Picconi</p>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        
        <footer className="bg-gray-800 text-white mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-2">Dott. Picconi</h3>
                <p className="text-sm text-gray-300">
                  Consulente per la non autosufficienza<br />
                  Assistente Sociale e Sociologo
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Contatti</h3>
                <p className="text-sm text-gray-300">
                  Facebook: Dott. Picconi - Consulente per la terza età e la non autosufficienza<br />
                  Gruppo: Home care premium Italia
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Info</h3>
                <p className="text-sm text-gray-300">
                  IIS Meucci Mattei - Decimomannu<br />
                  Servizi per la Sanità e l'Assistenza Sociale
                </p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
              <p>© 2025 Dott. Picconi. Sistema di consultazione prestazioni regionali italiane.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
