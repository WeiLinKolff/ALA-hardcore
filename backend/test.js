const express = require('express');
const mysql = require('mysql');

const app = express();

// Create MySQL connection
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ala",
  multipleStatements: true,
});

// Connect to MySQL
mysqlConnection.connect((err) => {
  if (err) {
    console.error('Failed to connect to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Store the last sent node
let lastSentNode = 1;

// Route to fetch node 1 from nodes table
app.get('/yes', (req, res) => {
  // Fetch node 1 from nodes table
  const selectNode1Query = "SELECT * FROM nodes WHERE id = 1";
  mysqlConnection.query(selectNode1Query, (err, rows) => {
    if (err) {
      console.error('Failed to fetch node 1 from nodes table:', err);
      res.status(500).send('Failed to fetch node 1 from nodes table');
    } else {
      if (rows.length === 0) {
        res.status(404).send('Node 1 not found in nodes table');
      } else {
        const node1 = rows[0];
        console.log(node1)
        lastSentNode = node1.id; // Update the last sent node
        console.log(lastSentNode)

        // Fetch rows from edges table where start_node is the last sent node and answer is 'yes'
        const selectEdgesQuery = "SELECT * FROM edges WHERE start_node = ? AND answer = 'yes'";
        mysqlConnection.query(selectEdgesQuery, [lastSentNode], (err, rows) => {
          if (err) {
            console.error('Failed to fetch edges with start_node as the last sent node and answer as "yes":', err);
            res.status(500).send('Failed to fetch edges');
          } else {
            // Send edges as response
            res.json(rows);
          }
        });
      }
    }
  });
});

// Start the server
const port = 3000; // Change this to the desired port number
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});