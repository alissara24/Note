var mongoose = require("mongoose");

// var subSchema = mongoose.Schema({
//   id_no: Number,
//   note_detail: String,
//   is_delete: Boolean,}, { _id : false });

var noteSchema = mongoose.Schema(
  {
    note_detail: String,
    is_delete: Boolean,
    
  },
  {
    timestamps: true,
    versionKey: false,

  },
  
);


var NoteDetail = mongoose.model('note_detail',noteSchema);
// var Note = mongoose.model('note_user',userSchema);

module.exports = NoteDetail;


// POST  http://localhost:5002/note/detail
// {
//      "note_detail": "วันนี้ทำอะไร",
//      "is_delete": false
// }