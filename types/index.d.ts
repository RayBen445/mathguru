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
}

export function readConfig(): MathGuruConfig;
export function setConfigValue(key: keyof MathGuruConfig, value: string | number | boolean): string | number | boolean;
export function getConfigValue(key?: keyof MathGuruConfig): MathGuruConfig | string | number | boolean;
export function readHistory(): Array<{ command: string; inputs: string[]; result: number; timestamp: string }>;
export function clearHistory(): void;
export function registerPlugin(plugin: { name: string; version?: string; description?: string }): void;
export function listPlugins(): Array<{ name: string; version: string; description: string }>;
