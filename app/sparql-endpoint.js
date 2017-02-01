const mdbPrefix = 'PREFIX mdb: <http://data.linkedmdb.org/resource/movie/>';
const filmPrefix = 'PREFIX film: <http://data.linkedmdb.org/resource/movie/film>';
const dcPrefix = 'PREFIX dc: <http://purl.org/dc/terms/> ';
const owlPrefix = 'PREFIX owl: <http://www.w3.org/2002/07/owl%23>';
const dctPrefix = 'PREFIX dct: <http://purl.org/dc/terms/>';

function getMovie(movieName) {
  let queryObject = {
    prefixes: [dcPrefix, filmPrefix],
    select: ['?label', '?resource'],
    where: ['?resource film:id ?uri', '?resource dc:title ?label'],
    filter: [`regex(?label, "${movieName}", "i")`]
  };

  return runQuery(queryObject);
}

function getMoviesActors(movieURI) {
  let queryObject = {
    prefixes: [mdbPrefix],
    select: ['?uri', '?name'],
    where: [`<${movieURI}> mdb:actor ?uri`, '?uri mdb:actor_name ?name']
  };

  return runQuery(queryObject);
}

function getActorsMovies(actorURI) {
  let queryObject = {
    prefixes: [mdbPrefix, dcPrefix],
    select: ['?uri', '?title'],
    where: [`?uri mdb:actor <${actorURI}>`, '?uri dc:title ?title']
  };

  return runQuery(queryObject);
}

function getMoviesDirector(movieURI) {
  let queryObject = {
    prefixes: [mdbPrefix],
    select: ['?uri', '?name'],
    where: [`<${movieURI}> mdb:director ?uri`, '?uri mdb:director_name ?name']
  };

  return runQuery(queryObject);
}

function getDirectorsMovies(directorURI) {
  let queryObject = {
    prefixes: [mdbPrefix, dcPrefix],
    select: ['?uri', '?title'],
    where: [`?uri mdb:director <${directorURI}>`, '?uri dc:title ?title']
  };

  return runQuery(queryObject);
}

function getPrequelAndSequel(movieURI) {
  let queryObject = {
    prefixes: [mdbPrefix, dcPrefix],
    select: ['?prequel', '?prequelTitle', '?sequel', '?sequelTitle'],
    where: [`<${movieURI}> mdb:prequel ?prequel`, '?prequel dc:title ?prequelTitle', `<${movieURI}> mdb:sequel ?sequel`, '?sequel dc:title ?sequelTitle']
  };

  return runQuery(queryObject);
}

// function getDBPediaURI(movieURI) {
//   let queryObject = {
//     prefixes: [owlPrefix],
//     select: ['?sameAs'],
//     where: [`<${movieURI}> owl:sameAs ?sameAs`],
//     filter: [`regex(STR(?sameAs), "dbpedia", "i")`]
//   };
//
//   return runQuery(queryObject);
// }

// function getSimilarMovies(movieURI) {
//     let queryObject = {
//       prefix: [dctPrefix],
//       select: ['?movie'],
//       where: [`<${movieURI}> dct:subject ?subject`, `?movie dct:subject ?subject`],
//       filter: [`(?movie != <${movieURI}>)`],
//       constraint: ['GROUP BY ?movie', 'ORDER BY DESC(COUNT(?subject))', 'LIMIT 5']
//     };
//
//     let query = parseQuery(queryObject);
//
//     return get('http://dbpedia.org/sparql?query=' + query + '&output=json')
//       .then(response => {
//         return response.json();
//       }).then(json => {
//         return Promise.resolve(json.results.bindings);
//       });
// }

function parseQuery(queryObject) {
  let query = '';

  query = queryObject.prefixes ? query.concat(queryObject.prefixes.join(' '), ' ') : query;
  query = query.concat('SELECT ', queryObject.select.join(' '), ' ');
  query = query.concat('WHERE { ', queryObject.where.join('. '), '. ');
  query = queryObject.filter ? query.concat('FILTER ', queryObject.filter.join('. '), '} ') : query + '}';
  query = queryObject.constraint ? query.concat(queryObject.constraint.join(' ')) : query;

  return query;
}

function runQuery(queryObject) {
  let query = parseQuery(queryObject);

  return get(`http://data.linkedmdb.org/sparql?query=${query}&output=json`)
    .then(response => {
      return response.json();
    }, error => {
      console.log(error);
      showToast('LinkedMDB is currently not available');
    }).then(json => {
      return Promise.resolve(json.results.bindings);
    });
}