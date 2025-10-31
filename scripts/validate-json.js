#!/usr/bin/env node

/**
 * Valida i file dati presenti nella cartella `public/data/regions`.
 * I controlli sono volutamente basilari ma permettono di intercettare
 * JSON non validi o strutture mancanti prima del deploy.
 */

const fs = require('node:fs');
const path = require('node:path');

const rootDir = process.cwd();
const regionsDir = path.join(rootDir, 'public', 'data', 'regions');

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function validateRegionFile(filePath) {
  const errors = [];
  const name = path.basename(filePath);
  let json;

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    json = JSON.parse(raw);
  } catch (err) {
    errors.push(`JSON non valido: ${err.message}`);
    return { name, errors };
  }

  if (!isObject(json)) {
    errors.push('Il file deve esportare un oggetto JSON');
    return { name, errors };
  }

  if (!isObject(json.metadata)) {
    errors.push("Chiave mancante o non valida: 'metadata'");
  } else {
    const requiredMeta = ['nome_regione', 'codice_regione', 'ultimo_aggiornamento'];
    for (const key of requiredMeta) {
      if (!json.metadata[key]) {
        errors.push(`Metadata: campo obbligatorio mancante '${key}'`);
      }
    }
  }

  if (!Array.isArray(json.prestazioni)) {
    errors.push("Chiave mancante o non valida: 'prestazioni' (deve essere un array)");
  } else {
    json.prestazioni.forEach((prestazione, index) => {
      if (!isObject(prestazione)) {
        errors.push(`Prestazione #${index + 1}: valore non valido (atteso oggetto)`);
        return;
      }

      if (!prestazione.prestazione_id) {
        errors.push(`Prestazione #${index + 1}: campo mancante 'prestazione_id'`);
      }
      if (!prestazione.nome_ufficiale) {
        errors.push(`Prestazione #${index + 1}: campo mancante 'nome_ufficiale'`);
      }
      if (!isObject(prestazione.benefit)) {
        errors.push(`Prestazione #${index + 1}: campo mancante o non valido 'benefit'`);
      }
      if (!isObject(prestazione.requisiti)) {
        errors.push(`Prestazione #${index + 1}: campo mancante o non valido 'requisiti'`);
      }
      if (!isObject(prestazione.accesso)) {
        errors.push(`Prestazione #${index + 1}: campo mancante o non valido 'accesso'`);
      }
      if (!isObject(prestazione.governance)) {
        errors.push(`Prestazione #${index + 1}: campo mancante o non valido 'governance'`);
      }
    });
  }

  return { name, errors };
}

function main() {
  if (!fs.existsSync(regionsDir)) {
    console.error('Cartella non trovata:', regionsDir);
    process.exit(1);
  }

  const entries = fs
    .readdirSync(regionsDir)
    .filter((file) => file.endsWith('.json') && file !== 'index.json')
    .map((file) => path.join(regionsDir, file));

  if (entries.length === 0) {
    console.warn('Nessun file JSON trovato in', regionsDir);
    process.exit(0);
  }

  const results = entries.map(validateRegionFile);
  const errors = results.filter(({ errors }) => errors.length > 0);

  if (errors.length > 0) {
    console.error('❌ Validazione fallita.\n');
    for (const { name, errors: entryErrors } of errors) {
      console.error(`- ${name}`);
      entryErrors.forEach((err) => console.error(`  • ${err}`));
    }
    process.exit(1);
  }

  console.log(`✅ Tutti i ${results.length} file JSON sono validi.`);
}

main();
