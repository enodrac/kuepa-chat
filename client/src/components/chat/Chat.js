/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import styles from './Chat.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {authenticate} from '../../utils';
import {useHistory} from 'react-router-dom';
import {saveMessage} from '../../redux/actions/index.js';

let socket = io();

export default function Chat() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userStore = useSelector((state) => state.user);
    const [message, setMessage] = useState({date: '', user: '', content: ''});
    const [allMessages, setAllMessages] = useState([]);

    socket.on('message', (message) => {
        setAllMessages([...allMessages, message]);
    });

    useEffect(() => {
        if (!authenticate(userStore)) history.push('/');
    }, []);

    useEffect(() => {
        return () => logout();
    }, []);

    function logout() {
        sessionStorage.clear();
        dispatch({type: 'SET_USER', payload: {}});
        history.push('/');
    }

    return (
        <div style={{backgroundColor: 'grey', height: '100vh'}}>
            <h1>CHAT</h1>
            <button onClick={() => logout()}>logout</button>
            <div className={styles.chat}>
                <div className={styles.messages}>
                    {allMessages.map((msg, i) => (
                        <p key={i}>{`${msg.date.split(' ').pop()}  ${msg.user}:  ${msg.content}`}</p>
                    ))}
                </div>
                <input
                    onChange={(e) => {
                        setMessage({date: Date().split(' ').splice(1, 4).join(' '), user: userStore.user, content: e.target.value});
                    }}
                    type="text"
                    value={message.content}
                    name="name"
                />
                <button
                    onClick={() => {
                        socket.emit('chatMessage', message);
                        setMessage({...message, content: ''});
                        saveMessage(message);
                    }}
                >
                    send
                </button>
            </div>
        </div>
    );
}
