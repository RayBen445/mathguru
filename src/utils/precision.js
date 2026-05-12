function formatWithPrecision(value, precision) {
  if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) {
    return String(value);
  }

  if (precision === undefined || precision === null) {
    return String(value);
  }

  return Number(value).toFixed(precision);
}

function readPrecisionFromArgs(rawArgs) {
  const args = [...rawArgs];
  let precision;

  const index = args.findIndex((arg) => arg === '--precision' || arg === '-p');
  if (index !== -1) {
    const raw = args[index + 1];
    if (raw === undefined) {
      throw new Error('precision: missing value after --precision.');
    }
    const parsed = Number(raw);
    if (!Number.isInteger(parsed) || parsed < 0 || parsed > 15) {
      throw new Error('precision: value must be an integer between 0 and 15.');
    }
    precision = parsed;
    args.splice(index, 2);
  }

  return {
    args,
    precision,
  };
}

module.exports = {
  formatWithPrecision,
  readPrecisionFromArgs,
};
