import {Locales} from "../../components/constants/Locales";
import {getTranslatorUrl, translatorRoutes} from "../../server";

export async function translateValue(value, lang) {
  let translatorUrl = getTranslatorUrl(translatorRoutes.translate) + lang;
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/text'},
    body: value
  };
  const response = await fetch(translatorUrl, requestOptions);

  return response.json();
}

export async function translateValues(values, lang) {
  let contentArray = JSON.parse(JSON.stringify(values));
  for (let item of contentArray) {
    item.value_string = await translateValue(item.value_string, lang);
  }
  return contentArray;
}

export async function translateText(text, lang) {
  if (lang !== Locales.en) {
    let translatorUrl = getTranslatorUrl(translatorRoutes.translate) + lang;
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/text'},
      body: text
    };
    const response = await fetch(translatorUrl, requestOptions);

    return response.json();

  }
  return text

}

export async function translateEntityContent(entity, lang) {
  let values = [];
  if (entity.attributes && entity.attributes.content) {
    values = entity.attributes.content.values;
    return translateValues(values, lang);
  }
}
