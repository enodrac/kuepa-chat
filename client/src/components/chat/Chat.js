/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import styles from './Chat.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {authenticate} from '../../utils';
import {useHistory} from 'react-router-dom';

let socket = io();

export default function Chat() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userStore = useSelector((state) => state.user);
    const [message, setMessage] = useState({user: '', content: ''});
    const [allMessages, setAllMessages] = useState([]);

    socket.on('message', (message) => {
        setAllMessages([...allMessages, message]);
    });

    useEffect(() => {
        if (!authenticate()) history.push('/');
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
        <div>
            <h1>CHAT</h1>
            <button onClick={() => logout()}>logout</button>
            <div className={styles.chat}>
                <div className={styles.messages}>
                    {allMessages.map((msg, i) => (
                        <p key={i}>
                            {msg.user.fullName}: {msg.content}
                        </p>
                    ))}
                </div>
                <input
                    onChange={(e) => {
                        setMessage({user: userStore, content: e.target.value});
                    }}
                    type="text"
                    value={message.content}
                    name="name"
                />
                <button
                    onClick={() => {
                        socket.emit('chatMessage', message);
                        setMessage({...message, content: ''});
                    }}
                >
                    send
                </button>
            </div>
        </div>
    );
}
