export const ApiRoutes = {
  images: 'images',
  search: 'api/search?query=',
  links: 'api/links/',
  relations: 'api/relations/',
  entity: 'api/get/',
};

export function getServerUrl(url) {
  return process.env.REACT_APP_SERVER_URL + url
}

export const translatorRoutes = {
  translate: 'translate'
};

export function getTranslatorUrl(url) {
  return process.env.REACT_APP_TRANSLATOR_URL + url + '?lang='
}
