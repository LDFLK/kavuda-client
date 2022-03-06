export const Locale = {
  en: "en",
  sinhala: "sinhala",
  tamil: "tamil"
};


export function setLocale(locale) {
  localStorage.setItem('kavuda-locale', locale);
}

export function getLocale() {
  return localStorage.getItem('kavuda-locale');
}
