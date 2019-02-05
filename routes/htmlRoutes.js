var path = require("path");
var router = require("express").Router();

router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
  console.log("this is htmlroutes")
});

module.exports = router;