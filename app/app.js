function clickHandler(event) {
  let nodeID = event.nodes[0];
  let node = nodes.get(nodeID);

  // TODO: on second click on node remove all connected edges and all nodes that are only connected to these edges

  switch (node.group) {
    case 'actor':
      expandActor(nodeID);
      break;
    case 'movie':
      expandMovie(nodeID);
      break;
    case 'director':
      // TODO
      break;
    default:
      break;
  }

  //TODO: how can we utilize stabilize?
  // network.stabilize(2000);
}

function search(event) {
  // check if user pressed enter
  if (event.keyCode === 13) {
    event.preventDefault();
    let searchTerm = document.getElementById('search').value;
    getMovie(searchTerm).then(movies => {
      if (movies[0]) {
        const uri = movies[0].resource.value;
        addNode(uri, movies[0].label.value, 'movie');
        expandMovie(uri);
      } else {
        showToast("No movies found for query: " + searchTerm);
      }
    });
  }
}

function addActors(sourceUri, actors) {
  actors.map(actor => {
    const uri = actor.uri.value;
    const name = actor.name.value;
    addNode(uri, name, 'actor');
    addEdge(sourceUri, uri, 'Actor');
  });


}

function addEdge(source, dest, label) {
  // we assign the source and dest id of the nodes as edge id to create a unique edge identifier.
  // when we check we need to check both combinations as the edges are not directed
  if (!edges.get(source + dest) && !edges.get(dest + source)) {
    edges.add({id: source + dest, from: source, to: dest, font: fontOptions, label: label});
  }
}

function addNode(id, name, group) {
  if (!nodes.get(id)) {
    let node = Object.assign({
      id: id,
      label: name,
      group: group,
      image: defaultImage
    }, nodeOptions);
    nodes.add(node);
    findImage(nodes, node.id, node.label);
  }
}

function findImage(nodes, nodeID, query) {
  // TODO: what is the optimal image size (pithumbsize)?
  get('https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=50&titles=' + query)
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
  getActors(movieURI).then(addActors.bind(undefined, movieURI));
  // TODO: get similiar movie
}