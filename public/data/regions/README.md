# 📂 Cartella Regioni

## 📤 File JSON Regionali Generati Automaticamente

Questa cartella contiene i 20 file JSON separati, uno per ogni regione italiana.

I file vengono **generati automaticamente** dallo script `npm run split` che legge i blocchi dalla cartella `/public/data/blocks/`.

## 📋 File Attesi

```
ABR.json  → Abruzzo
BAS.json  → Basilicata
BOL.json  → Provincia Autonoma di Bolzano
CAL.json  → Calabria
CAM.json  → Campania
EMR.json  → Emilia-Romagna
FVG.json  → Friuli-Venezia Giulia
LAZ.json  → Lazio
LIG.json  → Liguria
LOM.json  → Lombardia
MAR.json  → Marche
MOL.json  → Molise
PIE.json  → Piemonte
PUG.json  → Puglia
SAR.json  → Sardegna
SIC.json  → Sicilia
TOS.json  → Toscana
TRE.json  → Provincia Autonoma di Trento
UMB.json  → Umbria
VDA.json  → Valle d'Aosta
VEN.json  → Veneto
```

## 🔄 Come Vengono Creati

1. Inserisci i 4 blocchi JSON in `/public/data/blocks/`
2. Esegui `npm run split`
3. I 20 file vengono creati automaticamente qui

## ✏️ Modifica Manuale

Puoi anche modificare manualmente questi file dopo la loro creazione, ad esempio per:
- Aggiornare una singola prestazione
- Correggere un errore
- Aggiungere nuove prestazioni

**Importante:** Se riesegui `npm run split`, i file verranno sovrascritti con i dati dei blocchi originali.

## 📊 File Index

Il file `index.json` (generato automaticamente) contiene l'elenco di tutte le regioni disponibili e statistiche generali.
