export async function getResults(searchUrl, newSearch, result, page, setResults, setPage, limit) {
  searchUrl += '&limit=' + limit + '&page=' + (newSearch ? 1 : (page + 1));
  const response = await fetch(searchUrl, {method: 'GET'});
  const json = await response.json();

  if (response.status === 200) {
    if (newSearch || result == null) {
      setResults(json);
      setPage(1);
    } else {
      if (json) {
        setResults(result.concat(json));
        setPage(page + 1);
      } else {
        setResults([]);
        setPage(0);
        return false;
      }
    }
  }
  return true
}
