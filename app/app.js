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

    nodes.add(Object.assign({
      id: ++lastNodeId,
      label: 'Full Metal Jacket',
      image: 'https://resizing.flixster.com/fsPpfxtGdLMbLjJvvPqFiNX7uG8=/180x270/v1.bTsxMTE2ODAyOTtqOzE3MjQ4OzIwNDg7ODAwOzEyMDA'
    }, nodeOptions));
    edges.add({from: event.nodes[0], to: lastNodeId, font: fontOptions, label: 'Recommendation'});
  } else if (counter == 2) {
    nodes.add(Object.assign({
      id: ++lastNodeId,
      label: 'The Godfather',
      image: 'https://i.ytimg.com/vi/rt-r-w7Z2Ag/maxresdefault.jpg'
    }, nodeOptions));
    edges.add({from: event.nodes[0], to: lastNodeId, font: fontOptions, label: 'Movie'});

    nodes.add(Object.assign({
      id: ++lastNodeId,
      label: 'The Godfather Part II',
      image: 'http://la-screenwriter.com/wp-content/uploads/2012/02/936full-the-godfather-part-ii-poster.jpg'
    }, nodeOptions));
    edges.add({from: event.nodes[0], to: lastNodeId, font: fontOptions, label: 'Movie'});

    nodes.add(Object.assign({
      id: ++lastNodeId,
      label: 'The Rainmaker',
      image: 'https://resizing.flixster.com/nDSnVAINbKpCvSHmEfsbucslVqc=/206x305/v1.bTsxMTIwNDg0NDtqOzE3MjI5OzEyMDA7OTAwOzEyMDA'
    }, nodeOptions));
    edges.add({from: event.nodes[0], to: lastNodeId, font: fontOptions, label: 'Movie'});

    nodes.add(Object.assign({
      id: ++lastNodeId,
      label: 'The Great Gatsby',
      image: 'http://static.rogerebert.com/uploads/movie/movie_poster/the-great-gatsby-1974/large_70FxgKoE8UXDYc8IZL0b6rMvNFD.jpg'
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