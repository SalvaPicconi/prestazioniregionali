# 🚀 Guida Deploy su GitHub Pages

## Opzione 1: Deploy Automatico (CONSIGLIATA)

### Step 1: Crea un Repository su GitHub

1. Vai su https://github.com/new
2. Nome repository: `prestazioni-regionali` (o quello che preferisci)
3. Scegli **Public** o **Private**
4. **NON** inizializzare con README
5. Clicca **Create repository**

### Step 2: Carica il Progetto

Nel terminale, nella cartella del progetto:

```bash
git init
git add .
git commit -m "Initial commit - Sistema Prestazioni Regionali"
git branch -M main
git remote add origin https://github.com/TUO_USERNAME/prestazioni-regionali.git
git push -u origin main
```

### Step 3: Configura GitHub Pages

1. Vai nelle **Settings** del repository
2. Nel menu laterale, clicca su **Pages**
3. In **Source**, seleziona **GitHub Actions**
4. Il workflow è già configurato nel file `.github/workflows/deploy.yml`
   - La variabile `NEXT_PUBLIC_BASE_PATH` viene impostata automaticamente con il nome del repository (necessaria per pubblicare correttamente le risorse su GitHub Pages)

### Step 4: Attendi il Deploy

- Il deploy parte automaticamente
- Vai su **Actions** per vedere il progresso
- Dopo ~2-3 minuti, il sito sarà online

Il tuo sito sarà disponibile all'indirizzo:
```
https://TUO_USERNAME.github.io/prestazioni-regionali/
```

### ⚠️ Importante per GitHub Pages

Il file `next.config.js` utilizza l'eventuale variabile `NEXT_PUBLIC_BASE_PATH` per impostare `basePath` e `assetPrefix`. Grazie al workflow, su GitHub Pages sarà già valorizzata con il nome del repository.

Se preferisci configurarlo manualmente (es. dominio custom o build locale simulando GitHub Pages) imposta l'ambiente:

```bash
export NEXT_PUBLIC_BASE_PATH=nome-del-repository
npm run build
```

---

## Opzione 2: Deploy Manuale

### Step 1: Build del Progetto

```bash
npm run build
```

Questo crea la cartella `/out` con i file statici.

### Step 2: Deploy con gh-pages

```bash
# Installa gh-pages
npm install --save-dev gh-pages

# Aggiungi script a package.json
# "deploy": "gh-pages -d out"

# Deploy
npm run deploy
```

### Step 3: Configura GitHub Pages

1. Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / (root)
4. Save

---

## Opzione 3: Altri Servizi di Hosting

### Vercel (Facile e Gratuito)

1. Vai su https://vercel.com
2. Importa il repository GitHub
3. Deploy automatico ✅

### Netlify

1. Vai su https://netlify.com
2. **New site from Git**
3. Collega GitHub
4. Build command: `npm run build`
5. Publish directory: `out`

### Cloudflare Pages

1. Vai su https://pages.cloudflare.com
2. Collega GitHub
3. Build command: `npm run build`
4. Output directory: `out`

---

## 🔄 Aggiornamenti Futuri

Ogni volta che fai `git push`, il sito si aggiorna automaticamente!

```bash
# Dopo aver modificato i dati o il codice
git add .
git commit -m "Aggiornamento dati prestazioni"
git push
```

---

## 🆘 Risoluzione Problemi

### "Build failed" su GitHub Actions

- Verifica che i file JSON siano validi
- Controlla i log in Actions per vedere l'errore

### Pagina bianca dopo il deploy

- Controlla il `basePath` in `next.config.js`
- Verifica che i file JSON siano nella cartella `public/data/`

### Stili non caricati

- Assicurati che `tailwindcss` sia installato
- Verifica che `globals.css` sia importato in `layout.tsx`

---

## 📞 Supporto

Per problemi tecnici o domande:
- **Dott. Picconi** - Consulente per la non autosufficienza
- Gruppo Facebook: Home care premium Italia
