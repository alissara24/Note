
import { useCallback, useState, useEffect } from 'react';
import { Input, Button, Modal } from 'antd';
import "antd/dist/antd.css";
import { PlusCircleOutlined } from '@ant-design/icons';
import NoteCard from '../components/NoteCard'
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { getCookie } from 'cookies-next';


const { TextArea } = Input;


function LogIn({ userNameCallback }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState(false);
    const [password, setPassword] = useState(false);
    const [userList, setUserList] = useState([]);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userLoggedInName, setUserLoggedInName] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5002` + `/note`).then((res) => {
            setUserList(res)

            axios.get(`http://localhost:5002` + `/note`).then((res) => {

                if (res.data.message == 'login sucesss') {
                    setUserLoggedIn(true)
                    setUserLoggedInName(res.data.username)
                }
            })
        })
        let login = getCookie('login');
        setUserLoggedIn(login)
    }, [])

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


    const onChangePassword = (evt) => {
        setPassword(evt.target.value)
    };

    const handleClickSubmit = () => {
        console.log('userList', userList.data)

        const submitData = { username: username, password: password }
        axios.post('http://localhost:5002' + `/note`, submitData).then((res) => {
            setCookie('login', true);
            setUserLoggedIn(true)
            setUserLoggedInName(res.data.username)
        })

    };

    const handleClickLogout = () => {


        /*       const submitData = { username: username, password: password }
              axios.post('http://localhost:5002' + `/note`, submitData).then((res) => {
                  console.log('login success', res)
                  setUserLoggedIn(false)
                  setUserLoggedInName(res.data.username)
              }) */
        setCookie('login', false);
        setUserLoggedIn(false)
        setUserLoggedInName("logout success")
    };


    useEffect(() => {
        console.log('effectopolio', userLoggedInName)
        userNameCallback(userLoggedInName)
    }, [userLoggedInName])



    return (
        <div>
            {userLoggedIn ?
                <>
                    <Button onClick={handleClickLogin}> Logout </Button>

                </>
                :
                <>
                    <Button onClick={handleClickLogin}> Login  </Button>

                </>}
            <div>
                <Modal title="Authentication" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                    {userLoggedIn ?
                        <>
                            <h2> Sure you would like to logout {userLoggedInName}</h2>
                            <Button onClick={handleClickLogout}> Logout </Button>
                        </>
                        :
                        <>
                            <Input
                                placeholder="input user name"
                                onChange={onChangeUsername}
                            />
                            <Input.Password
                                placeholder="input password"
                                visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                                onChange={onChangePassword}
                            />
                            <Button onClick={handleClickSubmit}> Submit </Button>
                        </>
                    }

                </Modal>
            </div>

        </div>
    )
}

export default LogIn;