const mysql = require("mysql");
const express = require("express");
const cors = require('cors');
const fs = require('fs');


const app = express();
const PORT = 3000;
app.use(cors());

var start_node = 1

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

app.get("/all", (req, res) => {
  conn.getCategories().then((rows) => {
    var result = Object.values(rows);
    console.log(result);
    res.setHeader('Content-Type', 'text/html');
    res.send(JSON.stringify(result));
  });
});

app.get("/byId/:ID", (req, res) => {
  start_node = req.params.ID
  conn.getCategoryById(req.params.ID).then((rows) => {
    let result = Object.values(rows);
    console.log(JSON.stringify(result));
    res.setHeader('Content-Type', 'text/html');
    res.send(JSON.stringify(result));
  });
});

var lastSentNode = null;

// Route to fetch node 1 from nodes table
app.get('/ja/:current', (req, res) => {
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
        console.log(rows[0])
        const node1 = rows[0];
        console.log(node1.id)
        lastSentNode = node1.id; // Update the last sent node
        console.log(lastSentNode)
        // Fetch rows from edges table where start_node is the last sent node and answer is 'yes'
        const selectEdgesQuery = "SELECT * FROM edges WHERE start_node = ? AND answer = 'yes'";
        mysqlConnection.query(selectEdgesQuery, req.params.current, (err, rows) => {
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

app.get('/nee/:current', (req, res) => {
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
        console.log(rows[0])
        const node1 = rows[0];
        console.log(node1.id)
        lastSentNode = node1.id; // Update the last sent node
        console.log(lastSentNode)
        // Fetch rows from edges table where start_node is the last sent node and answer is 'yes'
        const selectEdgesQuery = "SELECT * FROM edges WHERE start_node = ? AND answer = 'no'";
        mysqlConnection.query(selectEdgesQuery, req.params.current, (err, rows) => {
          if (err) {
            console.error('Failed to fetch edges with start_node as the last sent node and answer as "no":', err);
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

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ala",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("DB Connection Established Successfully");
    return true;
  } else {
    console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
    return false;
  }
});

class DB {
  constructor() {
    this.connection = mysqlConnection;
  }
  // All categories
  getCategories() {
    return new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM edges", (err, rows) => {
        if (!err) resolve(rows);
        else reject(err);
      });
    });
  }
  // Get category by id
  getCategoryById(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT * FROM nodes WHERE id = ?",
        [id],
        (err, rows) => {
          if (!err) resolve(rows);
          else reject(err);
        }
      );
    });
  }
  // Add category
  addCategory(category) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "INSERT INTO categories SET ?",
        [category],
        (err, rows) => {
          if (!err) resolve(this.getCategories());
          else reject(err);
        }
      );
    });
  }
  // Update category
  updateCategory(id, category) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "UPDATE categories SET ? WHERE id = ?",
        [category, id],
        (err, rows) => {
          if (!err) resolve(this.getCategories());
          else reject(err);
        }
      );
    });
  }
  // Delete category
  deleteCategory(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "DELETE FROM categories WHERE id = ?",
        [id],
        (err, rows) => {
          if (!err) resolve(this.getCategories());
          else reject(err);
        }
      );
    });
  }

  // Delete category
  next(jaNee) {
    if (jaNee = 'ja') {
      console.log(start_node)
      return new Promise((resolve, reject) => {
        this.connection.query(
          "SELECT * FROM edges WHERE start_node = ? AND answer = ?",
          [start_node, 'yes'],
          (err, rows) => {
            if (!err) resolve(this.getCategories());
            else reject(err);
          }
        );
      })
    }
    else {
      console.log(start_node)
      return new Promise((resolve, reject) => {
        this.connection.query(
          "SELECT * FROM edges WHERE start_node = ? AND answer = ?",
          [start_node, 'no'],
          (err, rows) => {
            if (!err) resolve(this.getCategories());
            else reject(err);
          }
        );
      })
    };
  }
}

const conn = new DB();


module.exports = DB;
