//Get All data
var express = require("express");
var router = express.Router();

var NoteDetail = require("./noteDetailModel");


//GET
router.get("/", (req, res) => {
    NoteDetail.find().exec((err, data) => {
      console.log(data);
      if (err) return res.status(400).send(err);
      res.status(200).send(data);
    });
  });


  //PUT Update
    router.put("/:user_id", (req, res) => {
        var _id = req.params.user_id;
        NoteDetail.findByIdAndUpdate({_id: _id}, req.body, (err, data) => {
        console.log("err",err);
        if (err) return res.status(400).send(err);
        res.status(200).send({
            message: "Update success",
        });
        });
    });

  //Delete  Remove
router.delete("/:id", (req, res) => {
    NoteDetail.findByIdAndDelete(req.params.id, (err, data) => {
      if (err) return res.status(400).send(err);
      res.status(200).send({ message: `Delete success`, status: 200, });
    });
  });
  
  

  module.exports = router;