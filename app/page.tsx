import Link from 'next/link'

const REGIONI = [
  { nome: 'Abruzzo', codice: 'ABR' },
  { nome: 'Basilicata', codice: 'BAS' },
  { nome: 'Calabria', codice: 'CAL' },
  { nome: 'Campania', codice: 'CAM' },
  { nome: 'Emilia-Romagna', codice: 'EMR' },
  { nome: 'Friuli-Venezia Giulia', codice: 'FVG' },
  { nome: 'Lazio', codice: 'LAZ' },
  { nome: 'Liguria', codice: 'LIG' },
  { nome: 'Lombardia', codice: 'LOM' },
  { nome: 'Marche', codice: 'MAR' },
  { nome: 'Molise', codice: 'MOL' },
  { nome: 'Piemonte', codice: 'PIE' },
  { nome: 'Puglia', codice: 'PUG' },
  { nome: 'Sardegna', codice: 'SAR' },
  { nome: 'Sicilia', codice: 'SIC' },
  { nome: 'Toscana', codice: 'TOS' },
  { nome: 'Provincia Autonoma di Trento', codice: 'TRE' },
  { nome: 'Provincia Autonoma di Bolzano', codice: 'BOL' },
  { nome: 'Umbria', codice: 'UMB' },
  { nome: "Valle d'Aosta", codice: 'VDA' },
  { nome: 'Veneto', codice: 'VEN' },
]

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Prestazioni Regionali per Non Autosufficienza e Disabilità
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Sistema completo di consultazione delle prestazioni sociali e sociosanitarie 
          relative a persone con disabilità, anziani non autosufficienti, caregiver familiari 
          e nuclei con disabilità grave o gravissima.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">📋 20 Regioni</h3>
            <p className="text-sm text-blue-700">
              Tutte le regioni e province autonome italiane
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">🔍 Ricerca Avanzata</h3>
            <p className="text-sm text-green-700">
              Filtra per categoria, ISEE, importi e requisiti
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">💡 Sempre Aggiornato</h3>
            <p className="text-sm text-purple-700">
              Normative e importi costantemente verificati
            </p>
          </div>
        </div>
      </div>

      {/* Ricerca Nazionale */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🔎 Ricerca Nazionale
        </h2>
        <p className="text-gray-600 mb-4">
          Cerca prestazioni in tutte le regioni italiane con filtri avanzati
        </p>
        <Link 
          href="/ricerca" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Avvia Ricerca Nazionale →
        </Link>
      </div>

      {/* Elenco Regioni */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          📍 Seleziona una Regione
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REGIONI.map((regione) => (
            <Link
              key={regione.codice}
              href={`/regioni/${regione.codice}`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">{regione.nome}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {regione.codice}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Informazioni Utili */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ℹ️ Come Funziona
        </h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <span className="text-2xl mr-3">1️⃣</span>
            <div>
              <h3 className="font-semibold text-gray-900">Seleziona la tua Regione</h3>
              <p className="text-gray-600">Trova la regione di residenza dall'elenco sopra</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-3">2️⃣</span>
            <div>
              <h3 className="font-semibold text-gray-900">Consulta le Prestazioni</h3>
              <p className="text-gray-600">Visualizza tutte le prestazioni disponibili con requisiti e importi</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-3">3️⃣</span>
            <div>
              <h3 className="font-semibold text-gray-900">Richiedi Consulenza</h3>
              <p className="text-gray-600">Contatta il Dott. Picconi per assistenza personalizzata</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
