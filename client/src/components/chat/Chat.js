/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import styles from './Chat.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {authenticate, sliceMessage} from '../../utils';
import ReactPlayer from 'react-player/youtube';
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
    let cheat = 0;

    socket.on('message', (message) => {
        if (cheat < 1) setAllMessages([message, ...allMessages]);
        cheat++;
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
        dispatch(setErrorHandling({loading: false, notFound: false, existing: false, connected: false}));
        history.push('/');
    }

    function sendMessage(e) {
        e.preventDefault();
        saveMessage(message);
        socket.emit('chatMessage', message);
        setMessage({...message, content: ''});
    }

    function setCheat() {
        cheat = 0;
    }

    return (
        <div className={styles.chatContainer}>
            <div className={styles.streaming}>
                <ReactPlayer url="https://www.youtube.com/watch?v=dtKciwk_si4&ab_channel=FlorinPop" width="100%" height="100%" muted playing />
            </div>
            {view ? (
                <div className={styles.chat}>
                    <div className={styles.infoContainer}>
                        {userStore.admin ? (
                            <button className={styles.chatIndicatorBtn} onClick={() => setView(false)}>
                                RECORD
                            </button>
                        ) : null}
                        <h2 className={userStore.admin ? null : styles.chatTitle}>CHAT</h2>
                        <button className={styles.chatLogout} onClick={() => logout()}>
                            X
                        </button>
                    </div>
                    <div className={styles.chatMessages}>
                        {setCheat()}
                        {allMessages.map((msg, i) => (
                            <div className={msg.username === userStore.username ? styles.chatYourMsg : styles.chatMsg} key={i}>
                                {msg.content.length > 50 ? (
                                    <div>
                                        <label>
                                            {msg.date.split(' ').pop().slice(0, 5)} {msg.username === userStore.username ? 'you' : msg.username}{' '}
                                            {msg.admin ? 'admin' : null}:
                                        </label>
                                        {sliceMessage(msg.content).map((content) => (
                                            <p>{content}</p>
                                        ))}
                                    </div>
                                ) : (
                                    <div>
                                        <label>
                                            {msg.date.split(' ').pop().slice(0, 5)} {msg.username === userStore.username ? 'you' : msg.username}{' '}
                                            {msg.admin ? 'admin' : null}:{' '}
                                        </label>
                                        <p>{msg.content}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={sendMessage}>
                        <input
                            className={styles.chatInput}
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
                        {message.content.length > 0 && message.content.length < 100 ? (
                            <input className={styles.sendButton} type="submit" value="SEND" />
                        ) : (
                            <input className={styles.sendButtonDisable} type="submit" disabled value="SEND" />
                        )}
                    </form>
                </div>
            ) : (
                <Record setView={setView} />
            )}
        </div>
    );
}
