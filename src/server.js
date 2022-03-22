export const translatorRoutes = {
  translate: 'translate'
};

export function getTranslatorUrl(url) {
  return process.env.REACT_APP_TRANSLATOR_URL + url + '?lang='
}
