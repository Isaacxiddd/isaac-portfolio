#!/usr/bin/env node
/**
 * Performance audit script using Lighthouse.
 * Usage:
 *   pnpm perf              → audit production (https://fullstackisaac.vercel.app)
 *   pnpm perf --local      → audit local dev/preview server (http://localhost:4173)
 *   pnpm perf --url <url>  → audit any custom URL
 */

import { execSync, spawn } from 'child_process';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const REPORTS_DIR = resolve(ROOT, 'lighthouse-reports');

// ─── Config ───────────────────────────────────────────────────────────────────
const PROD_URL = 'https://fullstackisaac.vercel.app';
const LOCAL_URL = 'http://localhost:4173';

const THRESHOLDS = {
  performance:    90,
  accessibility:  95,
  'best-practices': 90,
  seo:            90,
};

// ─── CLI args ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const isLocal = args.includes('--local');
const customUrlIdx = args.indexOf('--url');
const customUrl = customUrlIdx !== -1 ? args[customUrlIdx + 1] : null;
const url = customUrl ?? (isLocal ? LOCAL_URL : PROD_URL);

// ─── Colors ───────────────────────────────────────────────────────────────────
const c = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  red:    '\x1b[31m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  cyan:   '\x1b[36m',
  gray:   '\x1b[90m',
};

function score(val, threshold) {
  if (val >= threshold) return `${c.green}${c.bold}${val}${c.reset}`;
  if (val >= threshold - 10) return `${c.yellow}${c.bold}${val}${c.reset}`;
  return `${c.red}${c.bold}${val}${c.reset}`;
}

function bar(val) {
  const filled = Math.round(val / 5);
  const empty  = 20 - filled;
  const color  = val >= 90 ? c.green : val >= 50 ? c.yellow : c.red;
  return `${color}${'█'.repeat(filled)}${c.gray}${'░'.repeat(empty)}${c.reset}`;
}

// ─── Check Chrome ─────────────────────────────────────────────────────────────
function findChrome() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.CHROME_PATH,
  ].filter(Boolean);

  for (const p of candidates) {
    if (existsSync(p)) return p;
  }

  try {
    const result = execSync('where chrome', { stdio: 'pipe' }).toString().trim().split('\n')[0];
    if (result) return result;
  } catch {}

  return null;
}

// ─── Run Lighthouse ───────────────────────────────────────────────────────────
async function runLighthouse(targetUrl) {
  // Dynamic import so we can use the installed version
  const { default: lighthouse } = await import('lighthouse');
  const chromeLauncher = await import('chrome-launcher');

  console.log(`\n${c.cyan}${c.bold}⚡ Portfolio Performance Audit${c.reset}`);
  console.log(`${c.gray}${'─'.repeat(50)}${c.reset}`);
  console.log(`${c.bold}URL:${c.reset} ${targetUrl}`);
  console.log(`${c.bold}Date:${c.reset} ${new Date().toLocaleString()}\n`);

  const chromePath = findChrome();
  const launchOpts = {
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
    ...(chromePath ? { chromePath } : {}),
  };

  console.log(`${c.gray}Launching Chrome...${c.reset}`);
  const chrome = await chromeLauncher.launch(launchOpts);

  const opts = {
    logLevel: 'error',
    output: ['json', 'html'],
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
    throttlingMethod: 'simulate',
  };

  console.log(`${c.gray}Running audit (this takes ~30s)...${c.reset}\n`);

  let result;
  try {
    result = await lighthouse(targetUrl, opts);
  } finally {
    await chrome.kill();
  }

  return result;
}

// ─── Print Results ────────────────────────────────────────────────────────────
function printResults(lhr) {
  const cats = lhr.categories;
  const audits = lhr.audits;

  console.log(`${c.bold}${c.cyan}SCORES${c.reset}`);
  console.log(`${c.gray}${'─'.repeat(50)}${c.reset}`);

  let allPassed = true;
  for (const [key, threshold] of Object.entries(THRESHOLDS)) {
    const cat = cats[key];
    if (!cat) continue;
    const val = Math.round(cat.score * 100);
    const passed = val >= threshold;
    if (!passed) allPassed = false;
    const label = cat.title.padEnd(20);
    const status = passed ? `${c.green}✔${c.reset}` : `${c.red}✘${c.reset}`;
    console.log(`  ${status} ${label} ${bar(val)}  ${score(val, threshold)} / 100`);
  }

  // Core Web Vitals
  console.log(`\n${c.bold}${c.cyan}CORE WEB VITALS${c.reset}`);
  console.log(`${c.gray}${'─'.repeat(50)}${c.reset}`);

  const vitals = [
    { id: 'first-contentful-paint',       label: 'FCP' },
    { id: 'largest-contentful-paint',     label: 'LCP' },
    { id: 'total-blocking-time',          label: 'TBT' },
    { id: 'cumulative-layout-shift',      label: 'CLS' },
    { id: 'speed-index',                  label: 'Speed Index' },
    { id: 'interactive',                  label: 'TTI' },
  ];

  for (const { id, label } of vitals) {
    const a = audits[id];
    if (!a) continue;
    const display = a.displayValue ?? '—';
    const scoreVal = a.score !== null ? Math.round(a.score * 100) : null;
    const scoreStr = scoreVal !== null
      ? ` ${score(scoreVal, 90)}`
      : '';
    console.log(`  ${label.padEnd(14)} ${c.bold}${display.padEnd(12)}${c.reset}${scoreStr}`);
  }

  // Opportunities
  const opportunities = Object.values(audits).filter(
    a => a.details?.type === 'opportunity' && a.score !== null && a.score < 0.9
  );

  if (opportunities.length > 0) {
    console.log(`\n${c.bold}${c.yellow}OPORTUNIDADES DE MEJORA${c.reset}`);
    console.log(`${c.gray}${'─'.repeat(50)}${c.reset}`);
    for (const a of opportunities.slice(0, 6)) {
      const savings = a.details?.overallSavingsMs
        ? ` ${c.gray}(~${Math.round(a.details.overallSavingsMs)}ms)${c.reset}`
        : '';
      console.log(`  ${c.yellow}→${c.reset} ${a.title}${savings}`);
    }
  }

  return allPassed;
}

// ─── Save Report ──────────────────────────────────────────────────────────────
function saveReport(result) {
  if (!existsSync(REPORTS_DIR)) mkdirSync(REPORTS_DIR, { recursive: true });

  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const htmlPath = resolve(REPORTS_DIR, `report-${ts}.html`);
  const jsonPath = resolve(REPORTS_DIR, `report-${ts}.json`);

  writeFileSync(htmlPath, result.report[1]);
  writeFileSync(jsonPath, result.report[0]);

  console.log(`\n${c.gray}${'─'.repeat(50)}${c.reset}`);
  console.log(`${c.bold}Reporte HTML:${c.reset} ${htmlPath}`);
  console.log(`${c.bold}Reporte JSON:${c.reset} ${jsonPath}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  try {
    const result = await runLighthouse(url);
    const lhr = result.lhr;

    const allPassed = printResults(lhr);

    saveReport(result);

    if (allPassed) {
      console.log(`\n${c.green}${c.bold}✔ Todos los scores superan los umbrales.${c.reset}\n`);
    } else {
      console.log(`\n${c.yellow}${c.bold}⚠ Algunos scores están por debajo de los umbrales.${c.reset}\n`);
    }

    process.exit(allPassed ? 0 : 1);
  } catch (err) {
    console.error(`\n${c.red}Error al ejecutar el audit:${c.reset}`, err.message);
    if (err.message.includes('ECONNREFUSED') && isLocal) {
      console.error(`${c.yellow}Asegurate de que el servidor local esté corriendo: pnpm preview${c.reset}`);
    }
    process.exit(1);
  }
}

main();
