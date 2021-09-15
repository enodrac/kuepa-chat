/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import styles from './Record.module.css';
import {useSelector} from 'react-redux';
import {getMessagesByUser} from '../../redux/actions/index.js';
import {sliceMessage} from '../../utils';

export default function Record({setView}) {
    const userStore = useSelector((state) => state.username);
    const usernameListStore = useSelector((state) => state.usernameList);
    const [allMsgByUser, setAllMsgByUser] = useState([]);
    const [search, setSearch] = useState('');

    function handleSearch(e) {
        e.preventDefault();
        if (search.length) {
            getMessagesByUser(search).then((res) => {
                setAllMsgByUser(res.data.reverse());
            });
        }
    }

    return (
        <div className={styles.record}>
            <div className={styles.infoContainer}>
                {userStore.admin ? (
                    <button className={styles.recordIndicatorBtn} onClick={() => setView(true)}>
                        CHAT
                    </button>
                ) : null}
                <h2 className={styles.recordTitle}>RECORD</h2>
            </div>
            <form className={styles.recordForm} onSubmit={handleSearch}>
                <select onChange={(e) => setSearch(e.target.value)}>
                    <option value="">online users...</option>
                    {usernameListStore.map((onlineUser, i) =>
                        onlineUser.username ? (
                            <option key={i} value={onlineUser.username}>
                                {onlineUser.username}
                            </option>
                        ) : null
                    )}
                </select>
                <label>all users: </label>
                <input onChange={(e) => setSearch(e.target.value)} type="text" value={search} placeholder="username..." />
                <input type="submit" value="search" />
            </form>
            <div className={styles.recordMessages}>
                {allMsgByUser.map((msg, i) => (
                    <div className={msg.username === userStore.username ? styles.chatYourMsg : styles.chatMsg} key={i}>
                        {msg.content.length > 50 ? (
                            <div>
                                <label>
                                    {msg.date} {msg.username === userStore.username ? 'you' : msg.username} {msg.admin ? 'admin' : null}:
                                </label>
                                {sliceMessage(msg.content).map((content) => (
                                    <p>{content}</p>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <label>
                                    {msg.date} {msg.username === userStore.username ? 'you' : msg.username} {msg.admin ? 'admin' : null}:{' '}
                                </label>
                                <p>{msg.content}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
