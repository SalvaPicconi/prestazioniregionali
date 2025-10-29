#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const REGION_CODES = {
  'Abruzzo': 'ABR',
  'Basilicata': 'BAS',
  'Calabria': 'CAL',
  'Campania': 'CAM',
  'Emilia-Romagna': 'EMR',
  'Emilia Romagna': 'EMR',
  'Friuli-Venezia Giulia': 'FVG',
  'Friuli Venezia Giulia': 'FVG',
  'Lazio': 'LAZ',
  'Liguria': 'LIG',
  'Lombardia': 'LOM',
  'Marche': 'MAR',
  'Molise': 'MOL',
  'Piemonte': 'PIE',
  'Puglia': 'PUG',
  'Sardegna': 'SAR',
  'Sicilia': 'SIC',
  'Toscana': 'TOS',
  'Trento': 'TRE',
  'Provincia Autonoma di Trento': 'TRE',
  'Bolzano': 'BOL',
  'Provincia Autonoma di Bolzano': 'BOL',
  'Umbria': 'UMB',
  "Valle d'Aosta": 'VDA',
  'Valle d Aosta': 'VDA',
  'Veneto': 'VEN'
};

const blocksDir = path.join(__dirname, '../public/data/blocks');
const regionsDir = path.join(__dirname, '../public/data/regions');

if (!fs.existsSync(regionsDir)) {
  fs.mkdirSync(regionsDir, { recursive: true });
}

console.log('Inizio separazione dei blocchi JSON...\n');

let totalRegions = 0;
let totalPrestazioni = 0;

for (let i = 1; i <= 4; i++) {
  const blockFile = path.join(blocksDir, 'blocco' + i + '.json');
  
  if (!fs.existsSync(blockFile)) {
    console.log('Blocco ' + i + ' non trovato: ' + blockFile);
    continue;
  }

  console.log('Elaborazione Blocco ' + i + '...');
  
  try {
    const blockData = JSON.parse(fs.readFileSync(blockFile, 'utf8'));
    
    let regions = [];
    
    if (Array.isArray(blockData)) {
      regions = blockData;
    } else if (typeof blockData === 'object') {
      regions = Object.values(blockData);
    }
    
    console.log('   Trovate ' + regions.length + ' regioni nel blocco ' + i);
    
    regions.forEach((regionData) => {
      if (!regionData.metadata) {
        console.log('   Regione senza metadata, salto...');
        return;
      }
      
      const regionName = regionData.metadata.regione_nome || 
                        regionData.metadata.nome_regione ||
                        regionData.metadata.regione;
                        
      const regionCodeFromJSON = regionData.metadata.regione_codice || 
                                regionData.metadata.codice_regione;
      
      if (!regionName) {
        console.log('   Regione senza nome, salto...');
        return;
      }
      
      const regionCode = regionCodeFromJSON || REGION_CODES[regionName];
      
      if (!regionCode) {
        console.log('   Codice non trovato per: ' + regionName);
        return;
      }
      
      const outputFile = path.join(regionsDir, regionCode + '.json');
      
      const normalizedData = {
        metadata: {
          nome_regione: regionName,
          codice_regione: regionCode,
          ultimo_aggiornamento: regionData.metadata.ultimo_aggiornamento || new Date().toISOString().split('T')[0],
          schema_version: regionData.metadata.schema_version,
          taxonomy_version: regionData.metadata.taxonomy_version,
          fonti: regionData.metadata.fonti || []
        },
        prestazioni: regionData.prestazioni || []
      };
      
      fs.writeFileSync(outputFile, JSON.stringify(normalizedData, null, 2), 'utf8');
      
      const prestazioniCount = normalizedData.prestazioni.length;
      totalPrestazioni += prestazioniCount;
      
      console.log('   OK ' + regionName + ' (' + regionCode + '.json) - ' + prestazioniCount + ' prestazioni');
      totalRegions++;
    });
    
  } catch (error) {
    console.error('   ERRORE nel blocco ' + i + ':', error.message);
  }
  
  console.log('');
}

console.log('===============================================');
console.log('COMPLETATO!');
console.log('Regioni elaborate: ' + totalRegions + '/20');
console.log('Totale prestazioni: ' + totalPrestazioni);
console.log('File creati in: ' + regionsDir);
console.log('===============================================\n');

const indexData = {
  generato: new Date().toISOString(),
  totale_regioni: totalRegions,
  totale_prestazioni: totalPrestazioni,
  regioni_disponibili: fs.readdirSync(regionsDir)
    .filter(f => f.endsWith('.json') && f !== 'index.json')
    .map(f => f.replace('.json', ''))
    .sort()
};

fs.writeFileSync(
  path.join(regionsDir, 'index.json'),
  JSON.stringify(indexData, null, 2),
  'utf8'
);

console.log('Creato anche index.json con elenco delle regioni disponibili\n');
