function clickHandler(event) {
  // nodes.add(Object.assign({
  //   id: ++lastNodeId,
  //   label: 'Marlon Brando',
  //   image: 'dummy_images/brando.jpg'
  // }, nodeOptions));
  // edges.add({from: event.nodes[0], to: lastNodeId, font: fontOptions, label: 'Actor'});
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
        getActors(uri).then(addActors.bind(undefined, uri));
      } else {
        showToast("No movies found for query: " + searchTerm);
      }
    });
  }
}

function addActors(sourceUri, actors) {
  console.log(actors);
  actors.map(actor => {
    console.log(actor);
    const uri = actor.uri.value;
    const name = actor.name.value;
    addNode(uri, name, 'actor');
    addEdge(sourceUri, uri, 'Actor');
  });

}

function addEdge(source, dest, label) {
  edges.add({from: source, to: dest, font: fontOptions, label: label});
}

function addNode(id, name, group) {
  let node = Object.assign({
    id: id,
    label: name,
    group: group,
    image: defaultImage
  }, nodeOptions);
  nodes.add(node);
  findImage(nodes, node.id, node.label);
}

function findImage(nodes, nodeID, query) {
  fetch('https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=100&titles=' + query)
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