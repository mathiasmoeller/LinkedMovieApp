function getMovie(movieName) {
  // if this looks super ugly its your IDE's fault
  let query = `PREFIX mdb: <http://data.linkedmdb.org/resource/movie/film> 
PREFIX dc: <http://purl.org/dc/terms/> 
SELECT ?label?resource WHERE { 
?resource mdb:id ?uri . 
?resource dc:title ?label . 
FILTER regex(?label, "${movieName}", "i")
}`;

  return runQuery(query);
}

function getActors(movieURI) {
  let query = `PREFIX movie: <http://data.linkedmdb.org/resource/movie/> 
SELECT ?uri ?name WHERE { 
<${movieURI}> movie:actor ?uri .
?uri movie:actor_name ?name .
}`;

  return runQuery(query);
}

function getActorsMovies(actorURI) {
  let query = `PREFIX movie: <http://data.linkedmdb.org/resource/movie/> 
PREFIX dc: <http://purl.org/dc/terms/> 
SELECT ?uri ?title WHERE { 
?uri movie:actor <${actorURI}> ; 
dc:title ?title . 
}`;

  return runQuery(query);
}

function runQuery(query) {
  return get('http://data.linkedmdb.org/sparql?query=' + query + '&output=json')
    .then(response => {
      return response.json();
    }).then(json => {
      return Promise.resolve(json.results.bindings);
    });
}