var express = require("express");
var router = express.Router();
var Note = require("./noteModel");

var NoteDetail = require("./noteDetailModel");

//Get All data
router.get("/", (req, res) => {
  Note.find().exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// Get one (Specific)
router.get("/:id", (req, res) => {
  Note.findById(req.params.id).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

//POST
router.post("/", async (req, res) => {
  var obj = new Note(req.body);
  console.log(req.body);
  obj.save((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({
      message: "Create data success",
      status: 200,
      data: data,
    });
  });
});



//PUT Update
router.put("/:user_id", (req, res) => {
  var _id = req.params.user_id;
  Note.findByIdAndUpdate({_id: _id}, req.body, (err, data) => {
    console.log("err",err);
    if (err) return res.status(400).send(err);
    res.status(200).send({
      message: "Update success",
    });
  });
});


//Delete  Remove
router.delete("/:id", (req, res) => {
  Note.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({ message: `Delete success`, status: 200, });
  });
});




/* NoteDetail  */


//Get All data
router.get("/detail", (req, res) => {
  console.log("data");
 /*  NoteDetail.find().exec((err, data) => {
    console.log(data);
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  }); */
});




//POST
router.post("/detail", async (req, res) => {
  var obj = new NoteDetail(req.body);
  obj.save((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({
      message: "Create data Detail success",
      status: 200,
      data: data,
    });
  });
});

module.exports = router;
// http://localhost:5002/note