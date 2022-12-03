var mongoose = require("mongoose");

// var subSchema = mongoose.Schema({
//   id_no: Number,
//   note_detail: String,
//   is_delete: Boolean,}, { _id : false });


var userSchema = mongoose.Schema(
  {
    id_no: Number,
    username: String,
    password: String,
    email: String,
    
    is_session: {type : Boolean, default: false},

  },
  {
    timestamps: true,
    versionKey: false,
    

  },
  
);

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


// var Note = mongoose.model('note_data',noteSchema);
var Note = mongoose.model('note_user',userSchema);

module.exports = Note;

// POST  http://localhost:5002/note 
// {
// "id_no": 1,
// "username": "test01",
// "password": "sdfsdsdvsadfv",
// "email": "aaaa@mail.com"
// }