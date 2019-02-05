var path = require("path");
var router = require("express").Router();



router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
  console.log("this is htmlroutes")
});

router.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
  console.log("this is htmlroutes")
});

router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
  console.log("this is wildcard")
});

module.exports = router;