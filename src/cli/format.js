const colors = require('./colors');
const { POWERED_BY_KONTYRA } = require('./branding');

function printDivider() {
  console.log(colors.info('----------------------------------------'));
}

function printSection(title) {
  printDivider();
  console.log(colors.section(title));
  printDivider();
}

function printFooter() {
  printDivider();
  console.log(colors.brand(POWERED_BY_KONTYRA));
}

function printResult(result) {
  console.log(colors.success(`✔ Result: ${colors.value(String(result))}`));
}

function printInfo(text) {
  console.log(colors.info(text));
}

function printSuccess(text) {
  console.log(colors.success(text));
}

function printError(text) {
  console.error(colors.error(`✖ Error: ${text}`));
}

function printTable(rows) {
  if (!rows || rows.length === 0) {
    printInfo('No entries found.');
    return;
  }

  const headers = Object.keys(rows[0]);
  const widths = headers.map((header) =>
    Math.max(header.length, ...rows.map((row) => String(row[header] === undefined ? '' : row[header]).length))
  );

  const headerLine = headers.map((header, i) => header.padEnd(widths[i])).join(' | ');
  console.log(colors.title(headerLine));
  console.log(colors.info(widths.map((w) => '-'.repeat(w)).join('-|-')));

  rows.forEach((row) => {
    const line = headers
      .map((header, i) => String(row[header] === undefined ? '' : row[header]).padEnd(widths[i]))
      .join(' | ');
    console.log(line);
  });
}

module.exports = {
  printDivider,
  printSection,
  printFooter,
  printResult,
  printInfo,
  printSuccess,
  printError,
  printTable,
};
