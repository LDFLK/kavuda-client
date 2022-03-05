async function GetRelatedResults(title, newSearch) {
  if (title !== undefined) {
    let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/relations/' + title;
    return await this.getResults(searchUrl + '?', newSearch, "relatedResults", 4)
  }

}

export async function getResults(searchUrl, newSearch, result, page, setResults,setPage, limit) {
  searchUrl += '&limit=' + limit + '&page=' + (newSearch ? 1 : (page + 1));
  const response = await fetch(searchUrl, {method: 'GET'});
  const json = await response.json();

  if (response.status === 200) {
    if (newSearch) {
      setResults(json);
      setPage(1);
    } else {
      if (json) {
        setResults(result.concat(json));
        setPage(page+1);
      } else {
        return false;
      }
    }
  }
  return true
}
