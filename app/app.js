var lastNodeId = 0;
const nodeOptions = {
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
    maxVelocity: 10,
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
  nodes.add(Object.assign({
    id: ++lastNodeId,
    label: 'Marlon Brando',
    image: 'http://a1.files.biography.com/image/upload/c_fit,cs_srgb,dpr_1.0,q_80,w_620/MTE4MDAzNDEwNDYyMjEzNjQ2.jpg'
  }, nodeOptions));
  edges.add({from: event.nodes[0], to: lastNodeId, font: fontOptions, label: 'Actor'});

  nodes.add(Object.assign({
    id: ++lastNodeId,
    label: 'Francis Ford Coppola',
    image: 'https://www.nyfa.edu/student-resources/wp-content/uploads/2014/06/Francis-Ford-Coppola.jpg'
  }, nodeOptions));
  edges.add({from: event.nodes[0], to: lastNodeId, font: fontOptions, label: 'Director'});

  nodes.add(Object.assign({
    id: ++lastNodeId,
    label: 'Martin Sheen',
    image: 'http://www.onbeing.org/sites/default/files/styles/width175/public/MARTIN-SHEEN.gif'
  }, nodeOptions));
  edges.add({from: event.nodes[0], to: lastNodeId, font: fontOptions, label: 'Actor'});

  nodes.add(Object.assign({
    id: ++lastNodeId,
    label: 'Harrison Ford',
    image: 'http://i1076.photobucket.com/albums/w450/tincanbandit/Movie%20guns/42218-star-wars_833648f8_zpsf47a6e46.jpg'
  }, nodeOptions));
  edges.add({from: event.nodes[0], to: lastNodeId, font: fontOptions, label: 'Actor'});
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