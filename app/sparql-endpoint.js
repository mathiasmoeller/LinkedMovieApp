function getMovie(movieName) {
  // if this looks super ugly its your IDE's fault
  let query = `PREFIX mdb: <http://data.linkedmdb.org/resource/movie/film> 
PREFIX dc: <http://purl.org/dc/terms/> 
SELECT ?label?resource WHERE { 
?resource mdb:id ?uri . 
?resource dc:title ?label . 
FILTER regex(?label, "${movieName}", "i")
}`;

  return runQuery(query).then(json => {
    return Promise.resolve(json.results.bindings[0]);
  });
}

function runQuery(query) {
  return fetch('http://data.linkedmdb.org/sparql?query=' + query + '&output=json')
    .then(response => {
      return response.json();
    });
}
