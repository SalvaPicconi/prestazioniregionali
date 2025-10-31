#!/usr/bin/env node

/**
 * Rigenera `public/data/regions/index.json` a partire dai file regionali.
 */

const fs = require('node:fs');
const path = require('node:path');

const rootDir = process.cwd();
const regionsDir = path.join(rootDir, 'public', 'data', 'regions');
const indexPath = path.join(regionsDir, 'index.json');

function readRegionFiles() {
  if (!fs.existsSync(regionsDir)) {
    throw new Error(`Cartella non trovata: ${regionsDir}`);
  }

  const files = fs
    .readdirSync(regionsDir)
    .filter((file) => file.endsWith('.json') && file !== 'index.json');

  return files.map((file) => {
    const fullPath = path.join(regionsDir, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const data = JSON.parse(raw);
    return { file, data };
  });
}

function buildIndex(regions) {
  const regioniDisponibili = [];
  let totalePrestazioni = 0;

  regions.forEach(({ file, data }) => {
    if (!data || !data.metadata) {
      throw new Error(`File ${file}: metadata mancante`);
    }
    const codice = data.metadata.codice_regione;
    if (!codice) {
      throw new Error(`File ${file}: campo metadata.codice_regione mancante`);
    }
    regioniDisponibili.push(codice);

    if (!Array.isArray(data.prestazioni)) {
      throw new Error(`File ${file}: campo 'prestazioni' assente o non è un array`);
    }
    totalePrestazioni += data.prestazioni.length;
  });

  regioniDisponibili.sort();

  return {
    generato: new Date().toISOString(),
    totale_regioni: regioniDisponibili.length,
    totale_prestazioni: totalePrestazioni,
    regioni_disponibili: regioniDisponibili,
  };
}

function main() {
  try {
    const regions = readRegionFiles();
    const index = buildIndex(regions);
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n', 'utf8');
    console.log(`✅ Indice rigenerato (${index.totale_regioni} regioni, ${index.totale_prestazioni} prestazioni).`);
    console.log(`   File aggiornato: ${indexPath}`);
  } catch (err) {
    console.error('❌ Errore durante la rigenerazione dell’indice:');
    console.error(err.message);
    process.exit(1);
  }
}

main();
