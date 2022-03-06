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

async function translateValues(values) {
  if (this.props.loadedEntity.attributes && values) {
    let contentArray = JSON.parse(JSON.stringify(values));
    for (let item of contentArray) {
      item.value_string = await this.translateValue(item.value_string);
    }
    return contentArray;
  }
  return values;
}

async function translateText(text,lang) {
  let values = [];
  if (this.props.loadedEntity.attributes && this.props.loadedEntity.attributes.content) {
    values = this.props.loadedEntity.attributes.content.values;
  }

  if (lang === 'en') {
    this.setState({title: text, translatedTitle: text, language: 'en', content: values})
  }
  else {
    let translatorUrl = 'translate?lang=' + lang;
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/text'},
      body: text
    };
    const response = await fetch(translatorUrl, requestOptions);

    const translated_text = await response.json();

    const translated_values = await translateValues(values);

    this.setState({translatedTitle: translated_text, title: text, language: lang, content: translated_values})
  }

}
