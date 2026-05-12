const fs = require('fs');
const path = require('path');

const FORMULAS_ROOT = __dirname;

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function loadAllFormulas() {
  const categories = fs
    .readdirSync(FORMULAS_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const formulas = [];

  categories.forEach((category) => {
    const filePath = path.join(FORMULAS_ROOT, category, 'formulas.json');
    if (!fs.existsSync(filePath)) {
      return;
    }

    const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    parsed.forEach((entry) => {
      formulas.push({ ...entry, slug: slugify(entry.name), category: entry.category || category });
    });
  });

  return formulas;
}

function getCategories() {
  return Array.from(new Set(loadAllFormulas().map((entry) => entry.category))).sort();
}

function list(category) {
  const formulas = loadAllFormulas();
  if (!category) {
    return formulas;
  }
  const normalized = slugify(category);
  return formulas.filter((entry) => slugify(entry.category) === normalized);
}

function get(nameOrSlug, category) {
  const normalized = slugify(nameOrSlug);
  const collection = list(category);
  return collection.find((entry) => entry.slug === normalized || slugify(entry.name) === normalized) || null;
}

function scoreFormula(entry, query) {
  const q = slugify(query);
  const haystack = [
    entry.name,
    entry.slug,
    entry.formula,
    entry.description,
    entry.category,
    ...(entry.keywords || []),
  ]
    .join(' ')
    .toLowerCase();

  if (entry.slug === q) {
    return 100;
  }
  if (entry.slug.startsWith(q) || entry.name.toLowerCase().startsWith(String(query).toLowerCase())) {
    return 90;
  }
  if (haystack.includes(String(query).toLowerCase())) {
    return 75;
  }
  const tokens = String(query).toLowerCase().split(/\s+/).filter(Boolean);
  const tokenHits = tokens.filter((token) => haystack.includes(token)).length;
  return tokenHits > 0 ? 50 + tokenHits : 0;
}

function search(query, options = {}) {
  const source = list(options.category);
  const ranked = source
    .map((entry) => ({ entry, score: scoreFormula(entry, query) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.entry);

  return ranked;
}

function explain(query, options = {}) {
  const formula = get(query, options.category) || search(query, options)[0];
  if (!formula) {
    throw new Error(`No formula found for '${query}'.`);
  }

  const variables = Object.entries(formula.variables || {})
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n');

  const examples = (formula.examples || []).map((item) => `- ${item}`).join('\n');
  const applications = (formula.applications || []).map((item) => `- ${item}`).join('\n');

  return [
    `${formula.name} (${formula.category})`,
    '',
    `Formula: ${formula.formula}`,
    '',
    `Meaning: ${formula.description}`,
    '',
    'Variables:',
    variables || '- Not specified',
    '',
    'Applications:',
    applications || '- Not specified',
    '',
    'Interpretation:',
    `This formula helps interpret ${formula.category} relationships in practical scenarios.`,
    '',
    'Examples:',
    examples || '- Not specified',
  ].join('\n');
}

function formatFormulaSummary(entries) {
  if (!entries || entries.length === 0) {
    return 'No formulas found.';
  }

  return entries.map((entry) => `- [${entry.category}] ${entry.name} :: ${entry.formula}`).join('\n');
}

module.exports = {
  FORMULAS_ROOT,
  slugify,
  loadAllFormulas,
  getCategories,
  list,
  get,
  search,
  explain,
  formatFormulaSummary,
};
