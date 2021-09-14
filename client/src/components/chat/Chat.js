/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import styles from './Chat.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {authenticate} from '../../utils';
import {useHistory} from 'react-router-dom';
import {saveMessage, setErrorHandling, setUserListStore, setUserStore} from '../../redux/actions/index.js';
import Record from '../record/Record';

let socket = io();

export default function Chat() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userStore = useSelector((state) => state.username);
    const [message, setMessage] = useState({date: '', username: '', content: '', admin: false});
    const [view, setView] = useState(true);
    const [allMessages, setAllMessages] = useState([]);

    socket.on('message', (message) => {
        setAllMessages([...allMessages, message]);
    });

    socket.on('updateUserList', (usernames) => {
        dispatch(setUserListStore(usernames));
    });

    useEffect(() => {
        socket.emit('addUserToList', userStore);
        if (!authenticate(userStore.username)) history.push('/');
        if (userStore.admin) setMessage({...message, admin: true});
        return () => logout();
    }, []);

    function logout() {
        sessionStorage.clear();
        socket.emit('removeUserFromList', userStore);
        dispatch(setUserStore({}));
        dispatch(setErrorHandling({loading: false, notFound: false, existing: false}));
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
                                    {msg.date.split(' ').pop()} {msg.username === userStore.username ? 'you' : msg.username}{' '}
                                    {msg.admin ? 'admin' : null}: {msg.content}
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
                                    username: userStore.username,
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
