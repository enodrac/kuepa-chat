import React, {useState} from 'react';
import io from 'socket.io-client';
import styles from './Chat.module.css';

let socket = io();

export default function Chat() {
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);

    socket.on('message', (message) => {
        setAllMessages([...allMessages, message]);
    });

    return (
        <div>
            <h1>CHAT</h1>
            <button onClick={() => sessionStorage.clear()}>logout</button>
            <div className={styles.chat}>
                <div className={styles.messages}>
                    {allMessages.map((msg, i) => (
                        <p key={i}>{msg}</p>
                    ))}
                </div>
                <input
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                    type="text"
                    value={message}
                    name="name"
                />
                <button
                    onClick={() => {
                        socket.emit('chatMessage', message);
                    }}
                >
                    send
                </button>
            </div>
        </div>
    );
}
