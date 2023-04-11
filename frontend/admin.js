
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://127.0.0.1:3000/all')
    .then(response => response.json())
    .then(data => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        // Iterate through each row of data
        data.forEach(row => {
            console.log(row)
            // Create a div element
            const div = document.createElement('p');
            div.innerText = 'TEST';


            // Set div styles based on row data
            div.style.position = 'absolute';
            div.style.width = '100px'; // Set the width as needed
            div.style.height = '100px'; // Set the height as needed
            div.style.backgroundColor = "grey";
            // Set other styles as needed, e.g., background color, border, etc.
            div.style.zIndex = "999";
            // Set div position based on row data
            div.style.left = '50vw'; // Set x coordinate as needed
            div.style.top = '50vh'; // Set y coordinate as needed

            // Append div to canvas
            canvas.appendChild(div);

            // Draw line between divs based on row data
            ctx.beginPath();
            ctx.moveTo(row.start_node_x + 50, row.start_node_y + 50); // Set start point as needed
            ctx.lineTo(row.end_node_x + 50, row.end_node_y + 50); // Set end point as needed
            ctx.stroke();
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}, false);