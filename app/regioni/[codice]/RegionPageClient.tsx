'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

interface Metadata {
  nome_regione: string
  codice_regione: string
  ultimo_aggiornamento: string
  fonti?: Array<{
    nome: string
    url?: string
  }>
}

interface Prestazione {
  id: string
  nome_ufficiale: string
  alias?: string[]
  descrizione_breve: string
  macro_categoria_id: string
  famiglie_normative_ids: string[]
  requisiti: any
  benefit: any
  accesso: any
  governance: any
  stato: any
  ux?: any
}

interface RegioneData {
  metadata: Metadata
  prestazioni: Prestazione[]
}

const MACRO_CATEGORIE: Record<string, { nome: string; colore: string }> = {
  'MC-CE': { nome: 'Contributi Economici', colore: 'bg-blue-100 text-blue-800' },
  'MC-SC': { nome: 'Servizi di Cura', colore: 'bg-green-100 text-green-800' },
  'MC-SD': { nome: 'Servizi Domiciliari', colore: 'bg-purple-100 text-purple-800' },
  'MC-SR': { nome: 'Servizi Residenziali', colore: 'bg-orange-100 text-orange-800' },
  'MC-PS': { nome: 'Progetti Speciali', colore: 'bg-pink-100 text-pink-800' },
}

const FAMIGLIE_NORMATIVE: Record<string, { nome: string; colore: string }> = {
  'FN-FNA': { nome: 'Fondo Non Autosufficienze', colore: 'bg-indigo-100 text-indigo-800' },
  'FN-FSE': { nome: 'Fondi Strutturali EU', colore: 'bg-yellow-100 text-yellow-800' },
  'FN-L162': { nome: 'L.162/98', colore: 'bg-red-100 text-red-800' },
  'FN-L112': { nome: 'L.112/2016 Dopo di Noi', colore: 'bg-teal-100 text-teal-800' },
  'FN-REG': { nome: 'Normativa Regionale', colore: 'bg-gray-100 text-gray-800' },
  'FN-LEA': { nome: 'LEA', colore: 'bg-cyan-100 text-cyan-800' },
}

type Props = {
  codice: string
}

export default function RegionPageClient({ codice }: Props) {
  const [data, setData] = useState<RegioneData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategoria, setSelectedCategoria] = useState<string>('')
  const [selectedPrestazione, setSelectedPrestazione] = useState<Prestazione | null>(null)

  const normalizedCode = useMemo(() => codice.toUpperCase(), [codice])

  useEffect(() => {
    async function loadRegione() {
      try {
        setLoading(true)
        const response = await fetch(`/data/regions/${normalizedCode}.json`)
        if (!response.ok) {
          throw new Error(`Regione non trovata (${normalizedCode})`)
        }
        const jsonData = await response.json()
        setData(jsonData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Errore nel caricamento')
      } finally {
        setLoading(false)
      }
    }

    if (normalizedCode) {
      loadRegione()
    }
  }, [normalizedCode])

  const filteredPrestazioni = useMemo(() => {
    if (!data?.prestazioni) {
      return []
    }

    return data.prestazioni.filter((p) => {
      const matchSearch =
        searchTerm === '' ||
        p.nome_ufficiale.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.descrizione_breve.toLowerCase().includes(searchTerm.toLowerCase())

      const matchCategoria = selectedCategoria === '' || p.macro_categoria_id === selectedCategoria

      return matchSearch && matchCategoria
    })
  }, [data?.prestazioni, searchTerm, selectedCategoria])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Caricamento dati regione...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-red-800 mb-4">⚠️ Errore</h2>
        <p className="text-red-600 mb-4">{error || 'Dati non disponibili'}</p>
        <Link href="/" className="text-blue-600 hover:underline">
          ← Torna alla home
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-gray-900">{data.metadata.nome_regione}</span>
      </div>

      {/* Header Regione */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-2">{data.metadata.nome_regione}</h1>
        <p className="text-blue-100 mb-4">
          Codice: {data.metadata.codice_regione} | Ultimo aggiornamento:{' '}
          {new Date(data.metadata.ultimo_aggiornamento).toLocaleDateString('it-IT')}
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
          <p className="text-2xl font-bold">{data.prestazioni.length}</p>
          <p className="text-sm text-blue-100">Prestazioni disponibili</p>
        </div>
      </div>

      {/* Filtri */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🔍 Cerca e Filtra</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cerca per nome</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Es: assegno di cura, caregiver..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filtra per categoria</label>
            <select
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tutte le categorie</option>
              {Object.entries(MACRO_CATEGORIE).map(([id, cat]) => (
                <option key={id} value={id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Trovate <strong>{filteredPrestazioni.length}</strong> prestazioni
          </p>
          {(searchTerm || selectedCategoria) && (
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategoria('')
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              Azzera filtri
            </button>
          )}
        </div>
      </div>

      {/* Lista Prestazioni */}
      <div className="grid grid-cols-1 gap-4">
        {filteredPrestazioni.map((prestazione) => (
          <div
            key={prestazione.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-pointer"
            onClick={() => setSelectedPrestazione(prestazione)}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">{prestazione.nome_ufficiale}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  MACRO_CATEGORIE[prestazione.macro_categoria_id]?.colore || 'bg-gray-100 text-gray-800'
                }`}
              >
                {MACRO_CATEGORIE[prestazione.macro_categoria_id]?.nome || prestazione.macro_categoria_id}
              </span>
            </div>

            <p className="text-gray-600 mb-3">{prestazione.descrizione_breve}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {prestazione.famiglie_normative_ids.map((fn) => (
                <span
                  key={fn}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    FAMIGLIE_NORMATIVE[fn]?.colore || 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {FAMIGLIE_NORMATIVE[fn]?.nome || fn}
                </span>
              ))}
            </div>

            <button className="text-sm text-blue-600 hover:underline">Vedi dettagli →</button>
          </div>
        ))}
      </div>

      {filteredPrestazioni.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-yellow-800">
          <h3 className="font-semibold text-lg mb-2">Nessuna prestazione trovata</h3>
          <p>
            Prova a modificare i filtri o la ricerca. Puoi tornare a visualizzare tutte le prestazioni
            cliccando su &quot;Azzera filtri&quot;.
          </p>
        </div>
      )}

      {/* Modale Dettagli Prestazione */}
      {selectedPrestazione && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  {data.metadata.nome_regione} · {selectedPrestazione.macro_categoria_id}
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPrestazione.nome_ufficiale}</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedPrestazione.famiglie_normative_ids.map((fn) => (
                    <span
                      key={fn}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        FAMIGLIE_NORMATIVE[fn]?.colore || 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {FAMIGLIE_NORMATIVE[fn]?.nome || fn}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelectedPrestazione(null)}
                className="text-gray-400 hover:text-gray-600 transition"
                aria-label="Chiudi dettaglio prestazione"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrizione</h3>
                <p className="text-gray-600">{selectedPrestazione.descrizione_breve}</p>
              </section>

              {selectedPrestazione.requisiti && (
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Requisiti</h3>
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
                    {JSON.stringify(selectedPrestazione.requisiti, null, 2)}
                  </pre>
                </section>
              )}

              {selectedPrestazione.benefit && (
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefit</h3>
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
                    {JSON.stringify(selectedPrestazione.benefit, null, 2)}
                  </pre>
                </section>
              )}

              {selectedPrestazione.accesso && (
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Accesso</h3>
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
                    {JSON.stringify(selectedPrestazione.accesso, null, 2)}
                  </pre>
                </section>
              )}

              {selectedPrestazione.governance && (
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Governance</h3>
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
                    {JSON.stringify(selectedPrestazione.governance, null, 2)}
                  </pre>
                </section>
              )}

              {selectedPrestazione.stato && (
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Stato</h3>
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
                    {JSON.stringify(selectedPrestazione.stato, null, 2)}
                  </pre>
                </section>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 text-right">
              <button
                onClick={() => setSelectedPrestazione(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
