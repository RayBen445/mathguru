export function add(a: number, b: number): number;
export function subtract(a: number, b: number): number;
export function multiply(a: number, b: number): number;
export function divide(a: number, b: number): number;
export function square(x: number): number;
export function sqrt(x: number): number;
export function power(base: number, exponent: number): number;
export function factorial(n: number): number;
export function percentage(value: number, total: number): number;
export function modulus(a: number, b: number): number;
export function average(values: number[]): number;
export function simpleInterest(principal: number, rate: number, time: number): number;
export function compoundInterest(principal: number, rate: number, time: number, frequency: number): number;
export function inflationRate(oldPrice: number, newPrice: number): number;
export function gdpGrowth(oldGDP: number, newGDP: number): number;
export function loanRepayment(principal: number, annualRate: number, months: number): number;
export function evaluateExpression(expression: string): number;

export interface MathGuruConfig {
  precision: number;
  colors: boolean;
  exportFormat: 'json' | 'txt' | 'csv' | 'md';
  currencySymbol: string;
  scientificMode: boolean;
  shellStartup: boolean;
  graphSize: string;
  graphFormat: 'ascii' | 'png' | 'svg';
}

export interface FormulaEntry {
  name: string;
  category: string;
  formula: string;
  description: string;
  variables: Record<string, string>;
  examples: string[];
  applications: string[];
}

export function readConfig(): MathGuruConfig;
export function setConfigValue(
  key: keyof MathGuruConfig,
  value: string | number | boolean
): string | number | boolean;
export function getConfigValue(key?: keyof MathGuruConfig): MathGuruConfig | string | number | boolean;
export function readHistory(): Array<{
  command: string;
  inputs: string[];
  result: number | string | Record<string, unknown>;
  timestamp: string;
}>;
export function clearHistory(): void;
export function registerPlugin(plugin: { name: string; version?: string; description?: string }): void;
export function listPlugins(): Array<{ name: string; version: string; description: string }>;

export const basic: {
  add: typeof add;
  subtract: typeof subtract;
  multiply: typeof multiply;
  divide: typeof divide;
  square: typeof square;
};

export const scientific: {
  sqrt: typeof sqrt;
  power: typeof power;
  factorial: typeof factorial;
  percentage: typeof percentage;
  modulus: typeof modulus;
  average: typeof average;
};

export const economics: {
  simpleInterest: typeof simpleInterest;
  inflationRate: typeof inflationRate;
  gdpGrowth: typeof gdpGrowth;
  cobbDouglas: (A: number, L: number, K: number, alpha: number, beta: number) => number;
};

export const finance: {
  compoundInterest: typeof compoundInterest;
  loanRepayment: typeof loanRepayment;
};

export const calc: {
  evaluate: (expression: string, scope?: Record<string, number>) => number | string;
  simplify: (expression: string) => string;
  differentiate: (expression: string, variable?: string) => string;
  integrate: (expression: string, variable?: string) => string;
  solve: (equation: string, variable?: string) => string;
  run: (expression: string) => number | string;
};

export const graph: {
  plot: (expression: string, options?: { size?: string; minX?: number; maxX?: number }) => string;
  export: (expression: string, options?: { size?: string; format?: 'svg' | 'png' }) => string;
};

export const latex: {
  convert: (expression: string) => string;
};

export const formulas: {
  get: (nameOrSlug: string, category?: string) => FormulaEntry | null;
  list: (category?: string) => FormulaEntry[];
  search: (query: string, options?: { category?: string }) => FormulaEntry[];
  explain: (query: string, options?: { category?: string }) => string;
  categories: () => string[];
};

export const trainer: {
  generate: (
    category: string,
    difficulty?: 'easy' | 'medium' | 'hard',
    count?: number
  ) => {
    category: string;
    difficulty: string;
    questions: Array<{ question: string; answer: string }>;
  };
  format: (quiz: {
    category: string;
    difficulty: string;
    questions: Array<{ question: string; answer: string }>;
  }) => string;
};

export const convert: {
  run: (
    value: number | string,
    from: string,
    to: string
  ) => {
    category: string;
    from: string;
    to: string;
    input: number;
    output: number;
  };
  format: (result: { category: string; from: string; to: string; input: number; output: number }) => string;
};

export const markdown: {
  detect: (content: string) => Array<{ line: string; index: number }>;
  format: (content: string) => string;
  processFile: (filePath: string) => { filePath: string; expressions: number };
};
