var router = require("express").Router();
var connection = require("../db/connection");

// Get all tables that aren't waiting
router.get("/api/notes", function(req, res) {
  connection.query("SELECT * FROM notes", function(err, dbNotes) {
    res.json(dbNotes);
    console.log("this is apiroutes")
  });
});

router.post("/api/notes", function(req, res) {
  connection.query("INSERT INTO notes SET ?", req.body, function(err, dbNotes) {
    res.json(dbNotes);
  });
});

router.delete("/api/notes/:id", function(req, res) {
  connection.query("DELETE FROM notes WHERE ?", {id:req.params.id}, function(err, dbNotes) {
    res.json(dbNotes);
  });
});
module.exports = router;