const CONVERSIONS = {
  distance: {
    km: {
      miles: (value) => value * 0.621371,
      m: (value) => value * 1000,
    },
    miles: {
      km: (value) => value / 0.621371,
    },
    m: {
      km: (value) => value / 1000,
    },
  },
  temperature: {
    celsius: {
      fahrenheit: (value) => (value * 9) / 5 + 32,
      kelvin: (value) => value + 273.15,
    },
    fahrenheit: {
      celsius: (value) => ((value - 32) * 5) / 9,
    },
    kelvin: {
      celsius: (value) => value - 273.15,
    },
  },
  mass: {
    kg: {
      pounds: (value) => value * 2.20462,
      g: (value) => value * 1000,
    },
    pounds: {
      kg: (value) => value / 2.20462,
    },
    g: {
      kg: (value) => value / 1000,
    },
  },
  time: {
    hours: {
      minutes: (value) => value * 60,
      seconds: (value) => value * 3600,
    },
    minutes: {
      hours: (value) => value / 60,
    },
    seconds: {
      hours: (value) => value / 3600,
    },
  },
};

const FUTURE_READY = {
  currency: {
    prepared: true,
    implemented: false,
    notes: 'Live currency APIs are intentionally not implemented yet.',
  },
};

function normalize(value) {
  return String(value || '').toLowerCase();
}

function detectCategory(from, to) {
  const normalizedFrom = normalize(from);
  const normalizedTo = normalize(to);

  return Object.keys(CONVERSIONS).find(
    (category) => CONVERSIONS[category][normalizedFrom] && CONVERSIONS[category][normalizedFrom][normalizedTo]
  );
}

function convert(value, from, to) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    throw new Error('convert: value must be numeric.');
  }

  const category = detectCategory(from, to);
  if (!category) {
    throw new Error(`convert: unsupported conversion from '${from}' to '${to}'.`);
  }

  const fn = CONVERSIONS[category][normalize(from)][normalize(to)];
  return {
    category,
    from: normalize(from),
    to: normalize(to),
    input: numeric,
    output: fn(numeric),
  };
}

function formatConversion(result) {
  return `${result.input} ${result.from} = ${result.output} ${result.to} (${result.category})`;
}

module.exports = {
  CONVERSIONS,
  FUTURE_READY,
  convert,
  formatConversion,
};
