const express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");

var mongo_uri = "mongodb+srv://Aun25454:Aun25454@cluster0.rnxeiqn.mongodb.net/?retryWrites=true&w=majority";
 //var mongo_uri = "mongodb+srv://thanet:gGPN27AwLXZvDldj@atlascluster.y538bkc.mongodb.net/?retryWrites=true&w=majority";
// var mongo_uri = "mongodb+srv://Napatcha:Napatcha2001@cluster0.rt9nceo.mongodb.net/?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

mongoose
  .connect(mongo_uri, {
    useNewUrlParser: true,

  })
  .then(
    () => {
      console.log("[success] task 2 : connected to the database ");
    },
    (error) => {
      console.log("[failed] task 2 " + error);
      process.exit();
    }
  );

  mongoose.connection.on('error', err => {
    console.error('MongoDB error', err)
  })
  

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

var port = process.env.PORT || 5002;

app.listen(port, ()=>{
    console.log('Application listening on port '+ port);
})

app.get('/', (req, res)=>{
    res.status(200).send('Application Start Homepage');
});


app.get('/detail', (req, res)=>{
  res.status(200).send('Application Start Homepage 555');
});


var Note = require("./noteRouter");
app.use('/note', Note);

var NoteDetail = require("./noteDetailRouter");
app.use('/notedetail', NoteDetail);



app.use((req, res, next)=>{
    var err = new Error('Page not found');
    err.status = 404;
    next(err);
});
