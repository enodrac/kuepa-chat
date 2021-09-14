/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import styles from './Record.module.css';
import {useSelector} from 'react-redux';
import {getMessagesByUser} from '../../redux/actions/index.js';

export default function Record() {
    const userStore = useSelector((state) => state.username);
    const usernameListStore = useSelector((state) => state.usernameList);
    const [allMsgByUser, setAllMsgByUser] = useState([]);
    const [search, setSearch] = useState('');

    function handleSearch(e) {
        e.preventDefault();
        if (search.length) {
            getMessagesByUser(search).then((res) => {
                setAllMsgByUser(res.data);
            });
        }
    }

    return (
        <div className={styles.container}>
            <p>historial</p>
            <form onSubmit={handleSearch}>
                <select onChange={(e) => setSearch(e.target.value)}>
                    <option value="">online usernames...</option>
                    {usernameListStore.map((username, i) =>
                        username.data.username ? (
                            <option key={i} value={username.data.username}>
                                {username.data.username}
                            </option>
                        ) : null
                    )}
                </select>
                <label>all usernames: </label>
                <input onChange={(e) => setSearch(e.target.value)} type="text" value={search} placeholder="username..." />
                <input type="submit" value="search" />
            </form>
            <div>
                {allMsgByUser.map((msg, i) => (
                    <div key={i}>
                        <label>
                            {msg.date} {msg.username === userStore.username ? 'you' : msg.username} {msg.admin ? 'admin' : null}: {msg.content}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
