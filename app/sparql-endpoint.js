const mdbPrefix = 'PREFIX mdb: <http://data.linkedmdb.org/resource/movie/>';
const filmPrefix = 'PREFIX film: <http://data.linkedmdb.org/resource/movie/film>';;;;;;;;;;;;;;;
const dcPrefix = 'PREFIX dc: <http://purl.org/dc/terms/> ';

function getMovie(movieName) {
  let query = `${filmPrefix} ${dcPrefix} 
    SELECT ?label ?resource WHERE { 
    ?resource film:id ?uri . 
    ?resource dc:title ?label . 
    FILTER regex(?label, "${movieName}", "i")
    }`;

  return runQuery(query);
}

function getMoviesActors(movieURI) {
  let query = `${mdbPrefix} 
    SELECT ?uri ?name WHERE { 
    <${movieURI}> mdb:actor ?uri .
    ?uri mdb:actor_name ?name .
    }`;

  return runQuery(query);
}

function getActorsMovies(actorURI) {
  let query = `${mdbPrefix} ${dcPrefix}  
    SELECT ?uri ?title WHERE { 
    ?uri mdb:actor <${actorURI}> ; 
    dc:title ?title . 
    }`;

  return runQuery(query);
}

function getMoviesDirector(movieURI) {
  let query = `${mdbPrefix} 
    SELECT ?uri ?name WHERE { 
    <${movieURI}> mdb:director ?uri .
    ?uri mdb:director_name ?name .
    }`;

  return runQuery(query);
}

function getDirectorsMovies(directorURI) {
  let query = `${mdbPrefix} ${dcPrefix} 
    SELECT ?uri ?title WHERE{
    ?uri mdb:director <${directorURI}> ;
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