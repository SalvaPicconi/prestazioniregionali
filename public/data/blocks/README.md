# 📦 Cartella Blocchi JSON

## 📥 Inserisci qui i tuoi 4 blocchi JSON

Questa cartella deve contenere i 4 file JSON con i dati delle regioni:

```
blocco1.json  → 5 regioni (Abruzzo, Basilicata, Calabria, Campania, Emilia-Romagna)
blocco2.json  → 5 regioni (Friuli-VG, Lazio, Liguria, Lombardia, Marche)
blocco3.json  → 5 regioni (Molise, Piemonte, Puglia, Sardegna, Sicilia)
blocco4.json  → 6 regioni (Toscana, Trento, Bolzano, Umbria, Valle d'Aosta, Veneto)
```

## 📝 Formato dei file

Ogni file deve essere un **array di oggetti**, dove ogni oggetto rappresenta una regione:

```json
[
  {
    "metadata": {
      "nome_regione": "Nome Regione",
      "codice_regione": "COD",
      "ultimo_aggiornamento": "2025-01-15",
      "fonti": [...]
    },
    "prestazioni": [
      {
        "id": "COD-001",
        "nome_ufficiale": "...",
        "descrizione_breve": "...",
        ...
      }
    ]
  },
  {
    "metadata": { ... },
    "prestazioni": [ ... ]
  }
]
```

## ✅ Dopo aver caricato i file

Esegui:
```bash
npm run split
```

Questo creerà automaticamente 20 file separati nella cartella `/public/data/regions/`

## 📖 Esempio

Vedi il file `blocco-ESEMPIO.json` in questa cartella per un esempio completo.
