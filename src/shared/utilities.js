// https://gist.github.com/mizrael/50c10be8ec92264751187d7705362eb2
let locale;
if (window.navigator.languages) {
  locale = window.navigator.languages[0];
} else {
  locale = window.navigator.userLanguage || window.navigator.language;
}

export function localeCurrency(number) {
  return number.toLocaleString(locale, {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

// This expects a whole number (i.e. 7.2 for 7.2%) rather than fractions (0.072), to encourage
// storing data in that format. This is because fractions are more prone to quirky rounding errors,
// for example:
//  12.345 / 100 == 0.12345
//  12.456 / 100 == 0.12455999999999999
export function localePercent(number) {
  return (number / 100).toLocaleString(locale, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}
