
import { useCallback, useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import EditUser from '../../components/editUser';
import Link from 'next/link';
import { getCookies } from 'cookies-next';

import dynamic from 'next/dynamic'



const index = () => {
  const [data, setData] = useState('');
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState(false);
  useEffect(() => {
    getData()
    let log = getCookies('login');
    setUsername(log.login)

  }, [])


  const getData = () => {
    axios.get('http://localhost:5002/note')
      .then(function (response) {
        setData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }





  const deleteUser = (e) => {
    let text = "ยื่นยันการลบรายชื่อ";
    if (confirm(text) == true) {
      axios.delete(`http://localhost:5002/note/${e}`)
        .then(function (response) {
          setMessage(response.data.message)
          getData()
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  console.log("username", username);

  return (
    <>
      <div style={{ backgroundColor: '#92CEA8', height: '100%', minHeight: '100vh' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'cornsilk' }}>
            <div>
              <h1 style={{ color: 'black', paddingTop: '10px', marginLeft: '20px' }}> My Notes Application </h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'cornsilk', marginRight: '20px' }}>
              <div >
                <Button > <Link href="/">Home</Link>  </Button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div style={{ backgroundColor: 'cornsilk', width: '100%', margin: '20px', borderRadius: '20px', paddingTop: '20px', paddingBottom: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>  User</h2>
            {username && username == "true" ?
              <>
                {data && data.map((note, i) => {
                  let j = i + 1;
                  return (
                    <div key={j} style={{ backgroundColor: '#D0F4DE', margin: '20px', borderRadius: '4px', padding: '10px' }}>
                      <p> id: {j}&nbsp; &nbsp; idname:{note._id} &nbsp; &nbsp; <span>username: {note.username}</span>
                        &nbsp; &nbsp;  <span>email :{note.email}&nbsp; &nbsp;  createdAt: {note.createdAt}</span>
                        <div style={{ float: 'right', display: 'flex', marginTop: 0, marginRight: 30 }}>
                          <EditUser posts={note._id} ></EditUser>
                          <button onClick={e => deleteUser(note._id)} style={{ marginLeft: 10, backgroundColor: 'red', border: "0.5px solid gray", color: "#FFF" }}>delete</button>
                        </div>
                      </p>
                    </div>
                  )
                })}
              </>
              : null
            }

          </div>
        </div>
      </div>

    </>
  )

}
export default index;