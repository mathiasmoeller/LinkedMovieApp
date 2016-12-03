var lastNodeId = 0;
const nodeOptions = {
    font: '12px Roboto white',
    color: 'white',
    shape: 'circularImage',
    brokenImage: 'http://www.freeiconspng.com/uploads/movie-icon-2.png'
};

// create an array with nodes
var nodes = new vis.DataSet([]);

// create an array with edges
var edges = new vis.DataSet([]);

// create options
var options = {
    autoResize: true,
    height: '100%',
    width: '100%'
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
    edges.add({from: event.nodes[0], to: lastNodeId});
    console.log(event);
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