'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const REGIONI_CODES = [
  'ABR', 'BAS', 'CAL', 'CAM', 'EMR', 'FVG', 'LAZ', 'LIG', 'LOM', 'MAR',
  'MOL', 'PIE', 'PUG', 'SAR', 'SIC', 'TOS', 'TRE', 'BOL', 'UMB', 'VDA', 'VEN'
]

interface Prestazione {
  id: string
  nome_ufficiale: string
  descrizione_breve: string
  macro_categoria_id: string
  famiglie_normative_ids: string[]
  benefit: any
  requisiti: any
  regione: string
  codice_regione: string
}

const MACRO_CATEGORIE: Record<string, { nome: string; colore: string }> = {
  'MC-CE': { nome: 'Contributi Economici', colore: 'bg-blue-100 text-blue-800' },
  'MC-SC': { nome: 'Servizi di Cura', colore: 'bg-green-100 text-green-800' },
  'MC-SD': { nome: 'Servizi Domiciliari', colore: 'bg-purple-100 text-purple-800' },
  'MC-SR': { nome: 'Servizi Residenziali', colore: 'bg-orange-100 text-orange-800' },
  'MC-PS': { nome: 'Progetti Speciali', colore: 'bg-pink-100 text-pink-800' },
}

export default function RicercaPage() {
  const [prestazioni, setPrestazioni] = useState<Prestazione[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategoria, setSelectedCategoria] = useState('')
  const [selectedRegione, setSelectedRegione] = useState('')

  useEffect(() => {
    async function loadAllData() {
      setLoading(true)
      const allPrestazioni: Prestazione[] = []

      for (const code of REGIONI_CODES) {
        try {
          const response = await fetch(`/data/regions/${code}.json`)
          if (response.ok) {
            const data = await response.json()
            if (data.prestazioni && Array.isArray(data.prestazioni)) {
              const prestazioniWithRegion = data.prestazioni.map((p: any) => ({
                ...p,
                regione: data.metadata.nome_regione,
                codice_regione: code
              }))
              allPrestazioni.push(...prestazioniWithRegion)
            }
          }
        } catch (err) {
          console.error(`Errore caricamento ${code}:`, err)
        }
      }

      setPrestazioni(allPrestazioni)
      setLoading(false)
    }

    loadAllData()
  }, [])

  const filteredPrestazioni = prestazioni.filter(p => {
    const matchSearch = searchTerm === '' || 
      p.nome_ufficiale.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descrizione_breve.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchCategoria = selectedCategoria === '' || 
      p.macro_categoria_id === selectedCategoria
    
    const matchRegione = selectedRegione === '' || 
      p.codice_regione === selectedRegione
    
    return matchSearch && matchCategoria && matchRegione
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Caricamento dati nazionali...</p>
          <p className="text-sm text-gray-500 mt-2">Sto aggregando i dati da tutte le regioni...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg p-8">
        <Link href="/" className="text-white/80 hover:text-white text-sm mb-2 inline-block">
          ← Torna alla home
        </Link>
        <h1 className="text-4xl font-bold mb-2">Ricerca Nazionale</h1>
        <p className="text-indigo-100">
          Cerca tra tutte le prestazioni disponibili nelle {REGIONI_CODES.length} regioni italiane
        </p>
        <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
          <p className="text-2xl font-bold">{prestazioni.length}</p>
          <p className="text-sm text-indigo-100">Prestazioni totali caricate</p>
        </div>
      </div>

      {/* Filtri Avanzati */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🔍 Filtri di Ricerca</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Ricerca testo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cerca per parole chiave
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Es: caregiver, assegno, domiciliare..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filtra per categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tutte le categorie</option>
              {Object.entries(MACRO_CATEGORIE).map(([id, cat]) => (
                <option key={id} value={id}>{cat.nome}</option>
              ))}
            </select>
          </div>

          {/* Filtra per regione */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Regione
            </label>
            <select
              value={selectedRegione}
              onChange={(e) => setSelectedRegione(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tutte le regioni</option>
              {REGIONI_CODES.map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Trovate <strong className="text-blue-600">{filteredPrestazioni.length}</strong> prestazioni
          </p>
          {(searchTerm || selectedCategoria || selectedRegione) && (
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategoria('')
                setSelectedRegione('')
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              Azzera filtri
            </button>
          )}
        </div>
      </div>

      {/* Risultati */}
      <div className="grid grid-cols-1 gap-4">
        {filteredPrestazioni.map((prestazione, idx) => (
          <div
            key={`${prestazione.codice_regione}-${prestazione.id}-${idx}`}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{prestazione.nome_ufficiale}</h3>
                  <Link 
                    href={`/regioni/${prestazione.codice_regione}`}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
                  >
                    {prestazione.regione} ({prestazione.codice_regione})
                  </Link>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${MACRO_CATEGORIE[prestazione.macro_categoria_id]?.colore || 'bg-gray-100 text-gray-800'}`}>
                {MACRO_CATEGORIE[prestazione.macro_categoria_id]?.nome || prestazione.macro_categoria_id}
              </span>
            </div>
            
            <p className="text-gray-600 mb-3">{prestazione.descrizione_breve}</p>
            
            {prestazione.benefit?.importo_max && (
              <div className="text-sm text-gray-700 mb-2">
                <strong>Importo massimo:</strong> €{prestazione.benefit.importo_max}
                {prestazione.benefit.periodicita && ` (${prestazione.benefit.periodicita})`}
              </div>
            )}

            <Link 
              href={`/regioni/${prestazione.codice_regione}`}
              className="text-blue-600 text-sm font-medium hover:underline inline-block mt-2"
            >
              Vedi tutte le prestazioni della regione →
            </Link>
          </div>
        ))}
      </div>

      {filteredPrestazioni.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <p className="text-yellow-800 font-medium mb-2">
            Nessuna prestazione trovata
          </p>
          <p className="text-yellow-600 text-sm">
            Prova a modificare i filtri di ricerca o a cercare con parole chiave diverse.
          </p>
        </div>
      )}
    </div>
  )
}
