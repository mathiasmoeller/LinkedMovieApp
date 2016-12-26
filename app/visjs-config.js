const defaultImage = 'http://www.freeiconspng.com/uploads/movie-icon-2.png';

let nodeOptions = {
  font: '12px Roboto white',
  color: 'white',
  shape: 'circularImage',
  borderWidth: 2,
  brokenImage: defaultImage
};

const fontOptions = {
  strokeWidth: '0',
  color: 'white',
  size: '14'
};

// create an array with nodes
let nodes = new vis.DataSet([]);

// create an array with edges
let edges = new vis.DataSet([]);

// create options
let options = {
  autoResize: true,
  height: '100%',
  width: '100%',
  physics: {
    maxVelocity: 5,
    timestep: 2,
    repulsion: {
      nodeDistance: 1000,
      springLength: 1000,
      centralGravity: 0.05
      //damping: 0.8,
    },
    stabilization: {
      enabled: false,
      iterations: 10000,
      updateInterval: 100000,
      onlyDynamicEdges: false
    }
  },
  interaction: {
    dragNodes: false
  },
  groups: {
    // TODO: this could be used for styling the groups (specific style overrides group styles)
    movie: {},
    actor: {},
    director: {}
  }
};

// create a network
let container = document.getElementById('graph');

function initialize(nodes, edges) {
  // provide the data in the vis format
  let data = {
    nodes: nodes,
    edges: edges
  };
  let network = new vis.Network(container, data, options);
  network.on('click', clickHandler);
}

function reset() {
  document.getElementById('search').value = '';

  // create an array with nodes
  nodes = new vis.DataSet([]);

// create an array with edges
  edges = new vis.DataSet([]);

  initialize(nodes, edges);
}


initialize(nodes, edges);