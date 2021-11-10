//BASIC EXPRESS SERVER


const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "express_test"
});

app.post("/create", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  

  db.query(
    "INSERT INTO test (title, description, date) VALUES (?,?,sysdate())",
    [title, description],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query("SELECT * FROM test", (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
      }
    }
  );
});

app.get("/notes", (req, res) => {
  db.query("SELECT * FROM test", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

const get = (res) => {
  db.query("SELECT * FROM test", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

app.delete("/notes", (req, res) => {
  const id = req.body.id;
  db.query("DELETE FROM test WHERE id = ? ", id,
  (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send("Delete successful")
    }
  }
  )
})


app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM test WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
