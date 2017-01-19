let network = null;
const groupImages = {
  actor: 'app/images/actor.svg',
  director: 'app/images/director.svg',
  movie: 'app/images/movie.svg'
};

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
    adaptiveTimestep: true,
    repulsion: {
      nodeDistance: 1000,
      springLength: 1000,
      centralGravity: 0.05
      //damping: 0.8,
    },
    stabilization: {
      enabled: true,
      iterations: 10000,
      updateInterval: 100000,
      onlyDynamicEdges: false
    }
  },
  interaction: {
    dragNodes: false
  },
  layout: {
    improvedLayout: true
  },
  groups: {
    movie: {
      color: {
        border: 'yellow'
      },
      image: groupImages.movie
    },
    actor: {
      color: {
        border: 'white'
      },
      image: groupImages.actor
    },
    director: {
      color: {
        border: 'blue'
      },
      image: groupImages.director
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

function removeImages() {
  nodes.get().map(node => {
    nodes.update({id: node.id, image: groupImages[node.group]});
  });
}

function removeLabel() {
  edges.get().map(edge => {
    edges.update({id: edge.id, label: ''})
  });
}

function addLabels() {
  edges.get().map(edge => {
    edges.update({id: edge.id, label: edge.labelBackup})
  });
}

function addImages() {
  nodes.get().map(node => {
    findImage(nodes, node.id, node.label);
  })
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