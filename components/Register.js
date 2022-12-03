
import { useCallback, useState, useEffect } from 'react';
import { Input, Button, Modal } from 'antd';
import "antd/dist/antd.css";
import { PlusCircleOutlined } from '@ant-design/icons';
import NoteCard from './NoteCard'
import axios from 'axios';


const { TextArea } = Input;


function Register() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [userList, setUserList] = useState([]);
    const [statusLogin, setUserStatusLogin] = useState(false);

    useEffect(()=> {
        setUsername(null);
        setPassword(null);
        setEmail(null)
        setIsModalVisible(false);
        setUserStatusLogin(false)
    }, [statusLogin])

    const handleClickLogin = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    const onChangeUsername = (evt) => {
        setUsername(evt.target.value)
    };

    const onChangeEmail = (evt) => {
        setEmail(evt.target.value)
    };

    
    const onChangePassword = (evt) => {
        setPassword(evt.target.value)
    };

    const handleClickSubmit =  async() => {
      let id_no =   Math.floor((Math.random() * 100));
        const submitData = {
             "id_no": id_no,
            "username": username,
            "password": password,
            "email": email,
            "is_session": false
        }
       await axios.post('http://localhost:5002/note', submitData)   
         .then(function (response) {
            let username = response.data.data.username;
            let  password =  response.data.data.username;
             setUserList([username, password]);
             setUserStatusLogin(true); 
          })
          .catch(function (error) {
            console.log(error);
          }); 
       
     }


    return (
        <div>
            <Button onClick={handleClickLogin}> Register </Button>
            <div>
                <Modal title="Register" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Input style={{marginTop: 10}}
                        placeholder="input user name" 
                        onChange={onChangeUsername} value={username}
                    />
                    <Input style={{marginTop: 10}}
                        placeholder="input user Email"
                        onChange={onChangeEmail}  value={email}
                    />
                    <Input.Password style={{marginTop: 10}}
                        placeholder="input password" 
                        visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                        onChange={onChangePassword} value={password}
                    />
                    <Button onClick={handleClickSubmit} style={{marginTop: 10}}> Submit </Button>
                </Modal>
            </div>

        </div>
    )
}

export default Register