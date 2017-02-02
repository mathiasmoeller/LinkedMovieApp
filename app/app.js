let dialog = document.querySelector('dialog');

function clickHandler(event) {
  let nodeID = event.nodes[0];
  let node = nodes.get(nodeID);

  switch (node.group) {
    case 'actor':
      expandActor(nodeID);
      break;
    case 'movie':
      expandMovie(nodeID);
      break;
    case 'director':
      expandDirector(nodeID);
      break;
    default:
      break;
  }
}

function search(event) {
  // check if user pressed enter
  if (event.keyCode === 13) {
    event.preventDefault();
    let searchTerm = document.getElementById('search').value;
    getMovie(searchTerm).then(movies => {
      if (movies.length > 0) {
        movies.map(movie => {
          const uri = movie.resource.value;
          addNode(uri, movie.label.value, 'movie');
          expandMovie(uri);
        });
      } else {
        showToast('No movies found for query: ' + searchTerm);
      }
    });
  }
}

function addActors(sourceURI, actors) {
  actors.map(actor => {
    const uri = actor.uri.value;
    const name = actor.name.value;
    addNode(uri, name, 'actor');
    addEdge(sourceURI, uri, 'Actor');
  });
}

function addDirector(sourceURI, director) {
  if (!director[0]) {
    return;
  }

  const uri = director[0].uri.value;
  const name = director[0].name.value;
  addNode(uri, name, 'director');
  addEdge(sourceURI, uri, 'Director');
}

function addMovies(sourceURI, movies) {
  movies.map(movie => {
    const uri = movie.uri.value;
    const title = movie.title.value;
    addNode(uri, title, 'movie');
    addEdge(sourceURI, uri, 'Director');
  })
}

function addPrequelAndSequel(sourceURI, movie) {
  if (!movie[0]) {
    return;
  }

  const prequelUri = movie[0].prequel.value;
  const prequelName = movie[0].prequelTitle.value;
  addNode(prequelUri, prequelName, 'movie');
  addEdge(sourceURI, prequelUri, 'Prequel/Sequel');

  const sequelUri = movie[0].sequel.value;
  const sequelName = movie[0].sequelTitle.value;
  addNode(sequelUri, sequelName, 'movie');
  addEdge(sourceURI, sequelUri, 'Prequel/Sequel');
}

function addEdge(source, dest, label) {
  // we assign the source and dest id of the nodes as edge id to create a unique edge identifier.
  // when we check we need to check both combinations as the edges are not directed
  if (!edges.get(source + dest) && !edges.get(dest + source)) {
    edges.add({
      id: source + dest,
      from: source,
      to: dest,
      font: fontOptions,
      label: useLabels() ? label : '',
      color: 'white',
      labelBackup: label
    });
  }
}

function addNode(id, name, group) {
  if (!nodes.get(id)) {
    let node = Object.assign({
      id: id,
      label: name,
      group: group
    }, nodeOptions);
    nodes.add(node);
    findImage(nodes, node.id, node.label);
  }
}

function useImages() {
  return document.getElementById('imageSwitch').checked;
}

function useLabels() {
  return document.getElementById('labelSwitch').checked;
}

function findImage(nodes, nodeID, query) {
  if (useImages()) {
    getJsonP('https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=50&titles=' + query)
      .then(function(response) {
        response.json().then(data => {
          try {
            let pages = data.query.pages;
            let url = pages[Object.keys(pages)].thumbnail.source;
            nodes.update({id: nodeID, image: url});
          } catch (e) {
            console.log(e, data);
          }
        })
      })
  }
}

function showToast(message) {
  let snackbarContainer = document.querySelector('#toast');
  snackbarContainer.MaterialSnackbar.showSnackbar({message: message});
}

function expandActor(actorURI) {
  getActorsMovies(actorURI).then(movies => {
    movies.map(movie => {
      const movieURI = movie.uri.value;
      const title = movie.title.value;
      addNode(movieURI, title, 'movie');
      addEdge(actorURI, movieURI, 'Actor');
    });
  });
}

function expandMovie(movieURI) {
  getMoviesActors(movieURI).then(addActors.bind(undefined, movieURI));
  getMoviesDirector(movieURI).then(addDirector.bind(undefined, movieURI));
  getPrequelAndSequel(movieURI).then(addPrequelAndSequel.bind(undefined, movieURI));
}

function expandDirector(directorURI) {
  getDirectorsMovies(directorURI).then(addMovies.bind(undefined, directorURI));
}

function showKeyDialog() {
  dialog.showModal();
}

function hideKeyDialog() {
  dialog.close();
}

function initialize() {
  dialog = document.querySelector('dialog');

  if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }

  document.getElementById('imageSwitch').addEventListener('change', resetImages);
  document.getElementById('labelSwitch').addEventListener('change', resetLabels);
}

function resetLabels(event) {
  if (event.target.checked) {
    addLabels();
  } else {
    removeLabel();
  }
}

function resetImages(event) {
  if (event.target.checked) {
    addImages();
  } else {
    removeImages();
  }
}

initialize();