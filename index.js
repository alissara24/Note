const express = require("express");

const app = express();

app.use(express.json());

var note_data = [{
  "_id": {
    "$oid": "63845c90de2b59a02d40af0e"
  },
  "id_no": 1,
  "note_detail": "note1",
  "is_delete": false
},{
  "_id": {
    "$oid": "63845c90de2b59a02d40af0f"
  },
  "id_no": 2,
  "note_detail": "note2",
  "is_delete": false
},{
  "_id": {
    "$oid": "63845c90de2b59a02d40af10"
  },
  "id_no": 3,
  "note_detail": "note3",
  "is_delete": false
}];

app.get("/api/note_data/:id", (req, res) => {
  const note = note_data.find((m) => m.id === parseInt(req.params.id));

  res.send(note);
});

app.get("/api/note_data/", (req, res) => {
  res.send(note_data);
});

app.post("/api/note_data/", (req, res) => {
  const note = {
    id: note_data.length + 1,
    note_detail: req.body.note_detail,
    is_delete: req.body.note.is_delete

  };
  note_data.push(note);
  res.send(note);
});

app.put("/api/note_data/:id", (req, res) => {
  const note = note_data.find((m) => m.id === parseInt(req.params.id));

  if (!note) {
    res.status(404).send("The note with the given ID was not found");
  } else {
    note.id_no = req.body.id_no;
    note.note_detail = req.body.note_detail;
    note.is_delete = req.body.is_delete;

    res.send(note);
  }
});

app.delete("/api/note_data/:id", (req, res) => {
  const note = note_data.find((m) => m.id === parseInt(req.params.id));

  if (!note) {
    res.status(404).send("The note with the given ID was not found");
  } else {
    const index = note_data.indexOf(note);
    note_data.splice(index, 1);

    res.send(note);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Application is runnning on port ${port}...`);
});


// POST  http://localhost:5002/note 
// {
// "id_no": 1,
// "username": "test01",
// "password": "sdfsdsdvsadfv",
// "email": "aaaa@mail.com"
// }