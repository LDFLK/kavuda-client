import {Locales} from "../../components/constants/Locales";

export async function translateValue(value, lang) {
  let translatorUrl = 'translate?lang=' + lang;
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/text'},
    body: value
  };
  const response = await fetch(translatorUrl, requestOptions);

  return await response.json();
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
    let translatorUrl = 'translate?lang=' + lang;
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/text'},
      body: text
    };
    const response = await fetch(translatorUrl, requestOptions);

    return await response.json();

  }
  return text

}

export async function translateEntityContent(entity, lang) {
  let values = [];
  if (entity.attributes && entity.attributes.content) {
    values = entity.attributes.content.values;
    return await translateValues(values, lang);
  }
}
