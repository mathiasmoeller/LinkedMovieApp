var lastNodeId = 0;
var counter = 0;

var nodeOptions = {
  font: '12px Roboto white',
  color: 'white',
  shape: 'circularImage',
  brokenImage: 'http://www.freeiconspng.com/uploads/movie-icon-2.png'
};

const fontOptions = {
  strokeWidth: '0',
  color: 'white',
  size: '14'
};

// create an array with nodes
var nodes = new vis.DataSet([]);

// create an array with edges
var edges = new vis.DataSet([]);

// create options
var options = {
  autoResize: true,
  height: '100%',
  width: '100%',
  physics: {
    maxVelocity: 25,
    repulsion: {
      nodeDistance: 1000,
      springLength: 1000,
      centralGravity: 0.05
    }
  },
  dragNodes: false
};

// create a network
var container = document.getElementById('graph');

// provide the data in the vis format
var data = {
  nodes: nodes,
  edges: edges
};

// initialize your network!
var network = new vis.Network(container, data, options);
network.on('click', clickHandler);

function clickHandler(event) {
  counter++;
  if (counter == 1) {
    nodes.add(Object.assign({
      id: ++lastNodeId,
      label: 'Marlon Brando',
      image: 'dummy_images/brando.jpg'
    }, nodeOptions));
    edges.add({from: event.nodes[0], to: lastNodeId, font: fontOptions, label: 'Actor'});

    nodes.add(Object.assign({
      id: ++lastNodeId,
      label: 'Francis Ford Coppola',
      image: 'dummy_images/Francis-Ford-Coppola.jpg'
    }, nodeOptions));
    edges.add({from: event.nodes[0], to: lastNodeId, font: fontOptions, label: 'Director'});

    nodes.add(Object.assign({
      id: ++lastNodeId,
      label: 'Martin Sheen',
      image: 'dummy_images/MARTIN-SHEEN.gif'
    }, nodeOptions));
    edges.add({from: event.nodes[0], to: lastNodeId, font: fontOptions, label: 'Actor'});

    nodes.add(Object.assign({
      id: ++lastNodeId,
      label: 'Harrison Ford',
      image: 'dummy_images/42218-star-wars_833648f8_zpsf47a6e46.jpg'
    }, nodeOptions));
    edges.add({from: event.nodes[0], to: lastNodeId, font: fontOptions, label: 'Actor'});

    nodes.add(Object.assign({
      id: ++lastNodeId,
      label: 'Full Metal Jacket',
      image: 'dummy_images/full_metal_jacket.jpg'
    }, nodeOptions));
    edges.add({from: event.nodes[0], to: lastNodeId, font: fontOptions, label: 'Recommendation'});
  } else if (counter == 2) {
    nodes.add(Object.assign({
      id: ++lastNodeId,
      label: 'The Godfather',
      image: 'dummy_images/maxresdefault.jpg'
    }, nodeOptions));
    edges.add({from: event.nodes[0], to: lastNodeId, font: fontOptions, label: 'Movie'});

    nodes.add(Object.assign({
      id: ++lastNodeId,
      label: 'The Godfather Part II',
      image: 'dummy_images/936full-the-godfather-part-ii-poster.jpg'
    }, nodeOptions));
    edges.add({from: event.nodes[0], to: lastNodeId, font: fontOptions, label: 'Movie'});

    nodes.add(Object.assign({
      id: ++lastNodeId,
      label: 'The Rainmaker',
      image: 'dummy_images/rainmaker.jpg'
    }, nodeOptions));
    edges.add({from: event.nodes[0], to: lastNodeId, font: fontOptions, label: 'Movie'});

    nodes.add(Object.assign({
      id: ++lastNodeId,
      label: 'The Great Gatsby',
      image: 'dummy_images/large_70FxgKoE8UXDYc8IZL0b6rMvNFD.jpg'
    }, nodeOptions));
    edges.add({from: event.nodes[0], to: lastNodeId, font: fontOptions, label: 'Movie'});
  }
}

function search(event) {
  // check if user pressed enter
  if (event.keyCode === 13) {
    event.preventDefault();
    var searchTerm = document.getElementById('search').value;
    nodes.add(Object.assign({
      id: ++lastNodeId,
      label: searchTerm,
      image: 'http://fedrev.net/wp-content/uploads/2013/12/apocalypsenow.jpg'
    }, nodeOptions));
  }
}