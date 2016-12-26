let network = null;

let nodeOptions = {
  font: '12px Roboto white',
  color: {
    highlight: 'red'
  },
  shape: 'circularImage',
  borderWidth: 2,
  borderWidthSelected: 4
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
    movie: {
      color: {
        border: 'yellow'
      },
      image: 'app/images/movie.svg'
    },
    actor: {
      color: {
        border: 'white'
      },
      image: 'app/images/actor.svg'
    },
    director: {
      color: {
        border: 'blue'
      },
      image: 'app/images/director.svg'
    }
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
  network = new vis.Network(container, data, options);
  network.on('click', clickHandler);
}

function fitViewport(nodes) {
  network.fit(nodes);
}

function reset() {
  network.destroy();
  document.getElementById('search').value = '';

  // create an array with nodes
  nodes = new vis.DataSet([]);

// create an array with edges
  edges = new vis.DataSet([]);

  initialize(nodes, edges);
}

window.onload = function() {
  initialize(nodes, edges);
};