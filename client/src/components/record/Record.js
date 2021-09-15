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
    const [error, setError] = useState({loading: false, noMsg: false, noUser: false});

    function handleSearch(e) {
        e.preventDefault();
        if (search.length) {
            setAllMsgByUser([]);
            setError({loading: true, noMsg: false, noUser: false});
            getMessagesByUser(search).then((res) => {
                if (res.data) {
                    if (res.data.length) {
                        setError({loading: false, noMsg: false, noUser: false});
                        setAllMsgByUser(res.data.reverse());
                    } else setError({loading: false, noMsg: true, noUser: false});
                } else setError({loading: false, noMsg: false, noUser: true});
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
                <input className={styles.searchButton} type="submit" value="search" />
            </form>
            <div className={styles.errors}>
                {error.loading ? <p>Loading...</p> : null}
                {error.noMsg ? <p>There are no messages for this user </p> : null}
                {error.noUser ? <p>User not found </p> : null}
            </div>
            <div className={styles.recordMessages}>
                {allMsgByUser.map((msg, i) => (
                    <div className={styles.message} key={i}>
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
