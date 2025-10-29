# 🏥 Prestazioni Regionali - Sistema di Consultazione

Sistema completo per la consultazione delle prestazioni regionali italiane relative a non autosufficienza e disabilità.

**A cura del Dott. Picconi** - Consulente per la non autosufficienza  
IIS Meucci Mattei - Decimomannu, Servizi per la Sanità e l'Assistenza Sociale

---

## 📋 Panoramica

Questo sistema permette di:
- **Separare** i 4 blocchi JSON (5 regioni ciascuno) in 20 file regionali individuali
- **Consultare** le prestazioni per singola regione
- **Cercare** a livello nazionale tra tutte le prestazioni
- **Filtrare** per categoria, ISEE, importi e altri criteri

---

## 🚀 Installazione e Setup

### 1. Prerequisiti

- Node.js v18 o superiore
- npm o yarn

### 2. Installazione

```bash
# Clona il repository
git clone <url-del-tuo-repository>
cd prestazioni-regionali

# Installa le dipendenze
npm install
```

---

## 📦 Struttura del Progetto

```
prestazioni-regionali/
├── app/                          # Applicazione Next.js
│   ├── layout.tsx               # Layout principale
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Stili globali
│   ├── regioni/
│   │   └── [codice]/
│   │       └── page.tsx         # Pagina dinamica per ogni regione
│   └── ricerca/
│       └── page.tsx             # Ricerca nazionale
├── public/
│   └── data/
│       ├── blocks/              # 📥 QUI vanno i 4 blocchi JSON originali
│       │   ├── blocco1.json    # Abruzzo, Basilicata, Calabria, Campania, Emilia-Romagna
│       │   ├── blocco2.json    # FVG, Lazio, Liguria, Lombardia, Marche
│       │   ├── blocco3.json    # Molise, Piemonte, Puglia, Sardegna, Sicilia
│       │   └── blocco4.json    # Toscana, Trento, Bolzano, Umbria, VdA, Veneto
│       └── regions/             # 📤 QUI vengono creati i 20 file regionali
│           ├── ABR.json
│           ├── BAS.json
│           ├── ...
│           └── VEN.json
└── scripts/
    └── split-blocks.js          # Script per separare i blocchi
```

---

## 🔧 Come Usare il Sistema

### PASSO 1: Caricare i Blocchi JSON

Metti i tuoi 4 blocchi JSON nella cartella `public/data/blocks/`:

```
public/data/blocks/blocco1.json
public/data/blocks/blocco2.json
public/data/blocks/blocco3.json
public/data/blocks/blocco4.json
```

### PASSO 2: Separare i Blocchi in File Regionali

Esegui lo script di separazione:

```bash
npm run split
```

Questo comando:
- ✅ Legge i 4 blocchi JSON
- ✅ Identifica ogni regione nel blocco
- ✅ Crea 20 file separati in `public/data/regions/`
- ✅ Genera un file `index.json` con l'elenco delle regioni

**Output atteso:**

```
🚀 Inizio separazione dei blocchi JSON...

📦 Elaborazione Blocco 1...
   Trovate 5 regioni nel blocco 1
   ✅ Abruzzo (ABR.json) - 12 prestazioni
   ✅ Basilicata (BAS.json) - 8 prestazioni
   ...

═══════════════════════════════════════════════════
✨ COMPLETATO!
📊 Regioni elaborate: 20/20
📋 Totale prestazioni: 245
📁 File creati in: public/data/regions
═══════════════════════════════════════════════════
```

### PASSO 3: Avviare il Sito Web

```bash
# Modalità sviluppo (con hot reload)
npm run dev
```

Apri il browser su: `http://localhost:3000`

---

## 🌐 Build per Produzione (GitHub Pages / Hosting Statico)

### Build del Sito Statico

```bash
# Genera i file statici
npm run build

# I file statici saranno in /out
```

### Deploy su GitHub Pages

1. **Crea un repository su GitHub**

2. **Modifica `next.config.js`** se usi un base path:

```javascript
const nextConfig = {
  output: 'export',
  basePath: '/nome-repository',  // Solo se non usi dominio custom
  ...
}
```

3. **Push del codice:**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/nome-repository.git
git push -u origin main
```

4. **Configura GitHub Pages:**

   - Vai su Settings → Pages
   - Source: GitHub Actions
   - Usa il workflow `.github/workflows/nextjs.yml` (creato automaticamente)

5. **Alternative: Deploy manuale della cartella /out:**

```bash
npm run build
# Puoi anche usare gh-pages per il deploy automatico
npm install gh-pages --save-dev
# Aggiungi a package.json: "deploy": "gh-pages -d out"
npm run deploy
```

---

## 📋 Format dei Blocchi JSON

Ogni blocco deve avere questa struttura:

```json
[
  {
    "metadata": {
      "nome_regione": "Sardegna",
      "codice_regione": "SAR",
      "ultimo_aggiornamento": "2025-01-15",
      "fonti": [
        {
          "nome": "Delibera GR 63/12",
          "url": "https://..."
        }
      ]
    },
    "prestazioni": [
      {
        "id": "SAR-001",
        "nome_ufficiale": "Ritornare a Casa PLUS",
        "alias": ["RAC Plus"],
        "descrizione_breve": "...",
        "macro_categoria_id": "MC-CE",
        "famiglie_normative_ids": ["FN-FNA", "FN-L162"],
        "requisiti": { ... },
        "benefit": { ... },
        "accesso": { ... },
        "governance": { ... },
        "stato": { ... }
      }
    ]
  },
  {
    "metadata": { ... },
    "prestazioni": [ ... ]
  }
]
```

---

## 🎨 Personalizzazione

### Modificare i Colori

Modifica `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#TUO_COLORE',
        ...
      }
    }
  }
}
```

### Modificare Header e Footer

Modifica `app/layout.tsx`

### Aggiungere Nuovi Filtri

Modifica `app/ricerca/page.tsx` e `app/regioni/[codice]/page.tsx`

---

## 📊 Funzionalità Principali

### ✅ Home Page
- Elenco di tutte le 20 regioni
- Accesso rapido alla ricerca nazionale
- Statistiche generali

### ✅ Pagina Regione
- Visualizzazione di tutte le prestazioni della regione
- Filtri per categoria
- Ricerca full-text
- Dettagli completi di ogni prestazione

### ✅ Ricerca Nazionale
- Aggregazione dati da tutte le regioni
- Filtri multipli (categoria, regione, parole chiave)
- Risultati con link diretti alle pagine regionali

---

## 🔄 Aggiornamento dei Dati

Per aggiornare i dati:

1. Modifica i file nella cartella `public/data/blocks/`
2. Riesegui lo script: `npm run split`
3. Riavvia il server: `npm run dev`

**Oppure** aggiorna direttamente i singoli file in `public/data/regions/`

---

## 📱 Responsive Design

Il sito è completamente responsive e ottimizzato per:
- 📱 Mobile (smartphone)
- 📱 Tablet
- 💻 Desktop
- 🖥️ Large screens

---

## 🛠️ Script Disponibili

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia il server di sviluppo |
| `npm run build` | Build per produzione |
| `npm run start` | Avvia il server di produzione |
| `npm run split` | Separa i blocchi JSON in file regionali |

---

## 📄 Licenza

MIT License - © 2025 Dott. Picconi

---

## 🆘 Supporto

Per supporto e consulenze:
- 📘 Facebook: **Dott. Picconi - Consulente per la terza età e la non autosufficienza**
- 👥 Gruppo: **Home care premium Italia - Informazione, Diritti e Supporto**

---

## 🎓 Uso Didattico

Questo progetto è utilizzato per scopi didattici presso:
**IIS Meucci Mattei di Cagliari - Sede Decimomannu**  
Indirizzo: Servizi per la Sanità e l'Assistenza Sociale

---

## 🚀 Prossimi Sviluppi

- [ ] Export dati in Excel/PDF
- [ ] Confronto tra regioni
- [ ] Sistema di notifiche per nuove prestazioni
- [ ] API REST per integrazioni esterne
- [ ] Pannello amministrativo per modifica dati

---

**Versione:** 1.0.0  
**Ultimo aggiornamento:** Ottobre 2025
