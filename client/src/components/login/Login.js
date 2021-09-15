import React, {useState} from 'react';
import styles from './Login.module.css';
import {useDispatch, useSelector} from 'react-redux';
import io from 'socket.io-client';
import {useHistory} from 'react-router-dom';
import {login} from '../../utils';
import {setErrorHandling, setUserStore} from '../../redux/actions';

let socket = io();

export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const errorHandling = useSelector((state) => state.errorHandling);

    const [loginUser, setLoginUser] = useState({username: '', password: ''});
    let usersConnected = [];

    function handleChange(e) {
        setLoginUser({...loginUser, [e.target.name]: e.target.value});
    }
    socket.emit('requestUserList');
    socket.on('getUserList', (userList) => {
        usersConnected = userList;
    });

    function handleLogin(e) {
        e.preventDefault();
        const allredyOn = usersConnected.filter((user) => user.username === loginUser.username);
        if (allredyOn.length) {
            dispatch(setErrorHandling({...errorHandling, notFound: false, connected: true}));
        } else {
            dispatch(setErrorHandling({...errorHandling, loading: true}));
            login(loginUser)
                .then((res) => {
                    if (res.data) {
                        dispatch(setUserStore(res.data));
                        history.push('/chat');
                    } else throw new Error();
                })
                .catch((error) => dispatch(setErrorHandling({...errorHandling, loading: false, notFound: true, connected: false})));
        }
    }
    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.loginTitle}>Log in</h1>
            <form className={styles.loginForm} onSubmit={handleLogin}>
                <label>Username</label>
                <input
                    className={styles.inputForm}
                    onChange={handleChange}
                    type="text"
                    name="username"
                    placeholder="Enter your username..."
                    value={loginUser.username}
                    required
                />
                <label>Password</label>
                <input
                    className={styles.inputForm}
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Enter your password..."
                    value={loginUser.password}
                    required
                />
                <input className={styles.signInButton} type="submit" value="Sign in" />
            </form>
            {errorHandling.notFound ? (
                <div>
                    <label className={styles.error}>User not found</label>
                </div>
            ) : null}
            {errorHandling.connected ? (
                <div>
                    <label className={styles.error}>User is connected</label>
                </div>
            ) : null}
        </div>
    );
}
