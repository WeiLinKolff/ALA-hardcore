const container = document.getElementById("form-container");

function start_node_coord(id) {
    let node = document.getElementById("i-" + id);
    let pos = node.getBoundingClientRect();
    let leftx = pos.left;
    let rightx = pos.right;
    let x = (leftx + rightx) / 2;
    let y = pos.bottom;
    return [x, y];
}

function end_node_coord(id) {
    let edge = document.getElementById("i-" + id);
    let pos = edge.getBoundingClientRect();
    let leftx = pos.left;
    let rightx = pos.right;
    let x = (leftx + rightx) / 2;
    let y = pos.top;
    return [x, y];
}

window.onresize = resize;
container.onresize = resize;

function resize() {
    const edgesJson = '{{ edges|tojson|safe }}'; // Store the JSON string in a variable
    const nodes = edgesJson ? JSON.parse(edgesJson) : []; // Check if edgesJson is defined and parse it, otherwise set an empty array
    console.log(nodes);
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (let i = 0; i < nodes.length; i++) {
        let start = start_node_coord(nodes[i].start_node);
        let end = end_node_coord(nodes[i].end_node);
        context.beginPath();
        context.moveTo(start[0], start[1]);
        context.lineTo(end[0], end[1]);
        context.stroke();
    }
}

resize();
