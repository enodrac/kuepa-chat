/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import styles from './Chat.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {authenticate} from '../../utils';
import {useHistory} from 'react-router-dom';
import {saveMessage, setLoadingStore, setUserListStore, setUserStore} from '../../redux/actions/index.js';
import Record from '../record/Record';

let socket = io();

export default function Chat() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userStore = useSelector((state) => state.user);
    const [message, setMessage] = useState({date: '', user: '', content: '', admin: false});
    const [view, setView] = useState(true);
    const [allMessages, setAllMessages] = useState([]);

    socket.on('message', (message) => {
        setAllMessages([...allMessages, message]);
    });

    socket.on('updateUserList', (users) => {
        dispatch(setUserListStore(users));
    });

    useEffect(() => {
        socket.emit('addUserToList', userStore);
        if (!authenticate(userStore.user)) history.push('/');
        if (userStore.admin) setMessage({...message, admin: true});
        return () => logout();
    }, []);

    function logout() {
        sessionStorage.clear();
        dispatch(setUserStore({}));
        dispatch(setLoadingStore(false));
        history.push('/');
    }

    function sendMessage(e) {
        e.preventDefault();
        socket.emit('chatMessage', message);
        saveMessage(message);
        setMessage({...message, content: ''});
    }

    return (
        <div>
            <h1>CHAT</h1>
            <button onClick={() => logout()}>logout</button>
            {userStore.admin ? <button onClick={() => setView(!view)}>{view ? 'history' : 'chat'}</button> : null}
            {view ? (
                <div className={styles.chat}>
                    <div className={styles.messages}>
                        {allMessages.map((msg, i) => (
                            <div key={i}>
                                <label>
                                    {msg.date.split(' ').pop()} {msg.user === userStore.user ? 'you' : msg.user} {msg.admin ? 'admin' : null}:{' '}
                                    {msg.content}
                                </label>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={sendMessage}>
                        <input
                            onChange={(e) =>
                                setMessage({
                                    ...message,
                                    date: Date().split(' ').splice(1, 4).join(' '),
                                    user: userStore.user,
                                    content: e.target.value,
                                })
                            }
                            type="text"
                            value={message.content}
                            name="name"
                        />
                        <input type="submit" value="send" />
                    </form>
                </div>
            ) : (
                <Record />
            )}
        </div>
    );
}
