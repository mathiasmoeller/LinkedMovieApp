$(function() { // on dom ready

// photos from flickr with creative commons license

  var cy = cytoscape({
    container: document.getElementById('graph'),

    boxSelectionEnabled: false,
    autounselectify: true,

    style: cytoscape.stylesheet()
      .selector('node')
      .css({
        'height': 80,
        'width': 80,
        'background-fit': 'cover',
        'border-color': '#000',
        'border-width': 3,
        'border-opacity': 0.5,
        'label': 'data(label)'
      })
      .selector('.bottom-center').css({
        'text-valign': 'bottom',
        'text-halign': 'center',
        'text-margin-y': '6px'
      })
      .selector('.starring')
      .css({
        'border-color': 'red'
      })
      .selector('.actor')
      .css({
        'border-width': 9
      })
      .selector('edge')
      .css({
        'label': 'data(label)',
        'width': 3,
        'line-color': '#ffaaaa'
      })
      .selector('#bird')
      .css({
        'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg'
      })
      .selector('#cat')
      .css({
        'background-image': 'https://farm2.staticflickr.com/1261/1413379559_412a540d29_b.jpg'
      })
      .selector('#ladybug')
      .css({
        'background-image': 'https://farm4.staticflickr.com/3063/2751740612_af11fb090b_b.jpg'
      })
      .selector('#aphid')
      .css({
        'background-image': 'https://farm9.staticflickr.com/8316/8003798443_32d01257c8_b.jpg'
      })
      .selector('#rose')
      .css({
        'background-image': 'https://farm6.staticflickr.com/5109/5817854163_eaccd688f5_b.jpg'
      })
      .selector('#grasshopper')
      .css({
        'background-image': 'https://farm7.staticflickr.com/6098/6224655456_f4c3c98589_b.jpg'
      })
      .selector('#plant')
      .css({
        'background-image': 'https://farm1.staticflickr.com/231/524893064_f49a4d1d10_z.jpg'
      })
      .selector('#wheat')
      .css({
        'background-image': 'https://farm3.staticflickr.com/2660/3715569167_7e978e8319_b.jpg'
      }),

    elements: {
      nodes: [
        {data: {id: 'cat', label: 'Cat'}, classes: 'bottom-center'},
        {data: {id: 'bird'}},
        {data: {id: 'ladybug'}},
        {data: {id: 'aphid'}},
        {data: {id: 'rose'}},
        {data: {id: 'grasshopper'}},
        {data: {id: 'plant'}},
        {data: {id: 'wheat'}}
      ],
      edges: [
        {data: {source: 'cat', target: 'bird', label: 'Hello'}},
        {data: {source: 'bird', target: 'ladybug'}},
        {data: {source: 'bird', target: 'grasshopper'}},
        {data: {source: 'grasshopper', target: 'plant'}},
        {data: {source: 'grasshopper', target: 'wheat'}},
        {data: {source: 'ladybug', target: 'aphid'}},
        {data: {source: 'aphid', target: 'rose'}}
      ]
    }

  }); // cy init

  var layout = cy.makeLayout({
    name: 'cose-bilkent',
    // Called on `layoutready`
    ready: function() {
    },
    // Called on `layoutstop`
    stop: function() {
    },
    // Whether to fit the network view after when done
    fit: true,
    // Padding on fit
    padding: 10,
    // Whether to enable incremental mode
    randomize: true,
    // Node repulsion (non overlapping) multiplier
    nodeRepulsion: 4500,
    // Ideal edge (non nested) length
    idealEdgeLength: 50,
    // Divisor to compute edge forces
    edgeElasticity: 0.5,
    // Nesting factor (multiplier) to compute ideal edge length for nested edges
    nestingFactor: 0.1,
    // Gravity force (constant)
    gravity: 0.9,
    // Maximum number of iterations to perform
    numIter: 2500,
    // For enabling tiling
    tile: true,
    // Type of layout animation. The option set is {'during', 'end', false}
    animate: 'end',
    // Represents the amount of the vertical space to put between the zero degree members during the tiling operation(can also be a function)
    tilingPaddingVertical: 10,
    // Represents the amount of the horizontal space to put between the zero degree members during the tiling operation(can also be a function)
    tilingPaddingHorizontal: 10,
    // Gravity range (constant) for compounds
    gravityRangeCompound: 1.5,
    // Gravity force (constant) for compounds
    gravityCompound: 1.0,
    // Gravity range (constant)
    gravityRange: 3.8
  });

  cy.on('tap', 'node', function() {
    var nodes = this;
    cy.add([
      {group: "nodes", data: {id: "n0"}},
      {group: "nodes", data: {id: "n1"}},
      {group: "edges", data: {id: "e0", source: "n0", target: "n1"}},
      {group: "edges", data: {id: "e1", source: nodes.data('id'), target: "n1"}}
    ]);

    cy.$('#n1').style({'background-image': 'https://farm7.staticflickr.com/6098/6224655456_f4c3c98589_b.jpg'});

  }); // on tap


  layout.run();

}); // on dom ready