# 🚀 GUIDA RAPIDA - Avvio in 3 minuti

## Step 1: Prepara i tuoi 4 blocchi JSON

Copia i tuoi 4 blocchi JSON nella cartella:
```
public/data/blocks/
```

Rinominali come:
- `blocco1.json` (5 regioni: Abruzzo → Emilia-Romagna)
- `blocco2.json` (5 regioni: Friuli-VG → Marche)
- `blocco3.json` (5 regioni: Molise → Sicilia)
- `blocco4.json` (6 regioni: Toscana → Veneto)

---

## Step 2: Separa i blocchi in file regionali

```bash
npm run split
```

Vedrai un output simile:
```
✅ Abruzzo (ABR.json) - 12 prestazioni
✅ Basilicata (BAS.json) - 8 prestazioni
...
✨ COMPLETATO! Regioni elaborate: 20/20
```

---

## Step 3: Avvia il sito

```bash
npm run dev
```

Apri il browser: `http://localhost:3000`

---

## ✅ Fatto!

Ora puoi:
- 📍 Navigare per regione
- 🔍 Cercare a livello nazionale
- 📊 Filtrare per categoria, ISEE, ecc.

---

## 🆘 Problemi?

### "Errore: Blocco non trovato"
→ Controlla che i file JSON siano nella cartella corretta: `public/data/blocks/`

### "Regione non trovata"
→ Verifica che lo script `npm run split` sia stato eseguito con successo

### "Cannot find module 'next'"
→ Esegui `npm install` per installare le dipendenze

---

## 📦 Build per produzione

```bash
npm run build
```

I file statici saranno nella cartella `/out` e potrai caricarli su:
- GitHub Pages
- Netlify
- Vercel
- Qualsiasi hosting statico

---

**Hai bisogno di aiuto?** Contatta il Dott. Picconi
