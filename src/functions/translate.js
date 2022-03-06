async function translateValue(value,lang) {
  let translatorUrl = 'translate?lang=' + lang;
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/text'},
    body: value
  };
  const response = await fetch(translatorUrl, requestOptions);

  return await response.json();
}
