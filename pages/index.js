
import { useCallback, useState, useEffect } from 'react';
import { Input } from 'antd';
import "antd/dist/antd.css";
import { PlusCircleOutlined } from '@ant-design/icons';
import NoteCard from '../components/NoteCard'
import NavBar from '../components/NavBar';
import axios from 'axios';



const { TextArea } = Input;


function HomePage() {

  const [noteList, setNoteList] = useState([]);
  const [newNoteText, setNewNoteText] = useState(null);
  const [idNoteText, setIdNoteText] = useState(null);
  const [plusColor, setPlusColor] = useState('gray');
  const [username, setUsername] = useState('');
  const [data, setData] = useState('');
  const [status, setStatus] = useState(false);

  useEffect(() => {
    getData()
  }, [data])

  /**
     *!get Note  */
  const getData = () => {
    axios.get('http://localhost:5002/notedetail')
      .then(function (response) {
        setData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleTextChange = (evt) => {

    setNewNoteText(evt.target.value)
  }


  const handleMouseEnter = () => {
    console.log('mouse enter')
    setPlusColor('blue')
  }

  const handleMouseLeave = () => {
    console.log('mouse leave')
    setPlusColor('gray')
  }

  /**
   *!CRUD Note  */

  const handleCreateNote = (evt) => {
    const submitData = {
      "note_detail": newNoteText,
      "is_delete": false
    }

    axios.post(`http://localhost:5002/note/detail`, submitData).then((res) => {
      setStatus(true)
      setNewNoteText(null)
    })

    setNoteList([...noteList, newNoteText])
  }


  const EditDetail = (e) => {
    setIdNoteText(e[0])
    setNewNoteText(e[1])
  }


  const handleUpdateNote = () => {
    const submitData = {
      "note_detail": newNoteText,
      "is_delete": false
    }
    console.log("idNoteText", idNoteText);
    axios.put(`http://localhost:5002/notedetail/${idNoteText}`, submitData)
      .then(function (response) {
        setNewNoteText(null)
        setIdNoteText(null)
        getData()
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const deleteDetail = (e) => {
    let text = "ยื่นยันการลบรายชื่อ";
    if (confirm(text) == true) {
      axios.delete(`http://localhost:5002/notedetail/${e}`)
        .then(function (response) {
          setMessage(response.data.message)
          getData()
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }


  const handleUserNameCallback = (username) => {
    setUsername(username)
  }

  return (
    <div style={{ backgroundColor: '#92CEA8', height: '100%', minHeight: '100vh' }}>
      <NavBar userNameCallback={handleUserNameCallback}></NavBar>
      {idNoteText === null ?
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'cornsilk', width: '100%', margin: '20px', borderRadius: '20px', paddingTop: '20px' }}>
            <h2 style={{ textAlign: 'center' }}> Create New Note</h2>

            <div style={{ margin: '20px' }}>
              <TextArea rows={4} onChange={handleTextChange} value={newNoteText} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <PlusCircleOutlined onClick={handleCreateNote} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ color: plusColor, fontSize: '30px', width: '100px', textAlign: 'center' }} />
            </div>
          </div>
        </div>
        :
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'cornsilk', width: '100%', margin: '20px', borderRadius: '20px', paddingTop: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Edit Note</h2>

            <div style={{ margin: '20px' }}>
              <TextArea rows={4} onChange={handleTextChange} value={newNoteText} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <PlusCircleOutlined onClick={handleUpdateNote} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ color: plusColor, fontSize: '30px', width: '100px', textAlign: 'center' }} />
            </div>
          </div>
        </div>
      }
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div style={{ backgroundColor: 'cornsilk', width: '100%', margin: '20px', borderRadius: '20px', paddingTop: '20px', paddingBottom: '20px' }}>
          <h2 style={{ textAlign: 'center' }}>  {username ? username : 'My'} Notes</h2>

          {noteList.length == 0 && <p style={{ textAlign: 'center' }}> You have no perviously created notes. Create a new note and it will appear here. </p>}

          {data && data.map((note, i) => {
            let j = i + 1;
            return (
              <div key={j} style={{ backgroundColor: '#D0F4DE', margin: '20px', borderRadius: '4px', paddingTop: '10px' }}>
                <p style={{ paddingLeft: 20 }}> {j} &nbsp; &nbsp; id:&nbsp; &nbsp; {note._id}&nbsp; &nbsp;note:&nbsp; &nbsp;  {note.note_detail}&nbsp; &nbsp;&nbsp; &nbsp; Date: {note.createdAt}
                  <div style={{ display: 'flex', justifyContent: 'right', marginRight: 50, marginTop: -20 }}>
                    <button onClick={e => EditDetail([note._id, note.note_detail])} style={{ marginLeft: 20, marginBottom: 10 }}>Edit</button>
                    <button onClick={e => deleteDetail(note._id)} style={{ marginLeft: 20, marginBottom: 10, backgroundColor: 'red', border: "0.5px solid gray", color: "#FFF" }}>delete</button>
                  </div>
                </p>
              </div>
            )
          })}

        </div>
      </div>
    </div>

  )
}

export default HomePage