/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import styles from './Record.module.css';
import {useSelector} from 'react-redux';
import {getMessagesByUser} from '../../redux/actions/index.js';

export default function Record() {
    const userStore = useSelector((state) => state.user);
    const userListStore = useSelector((state) => state.userList);
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
                    <option value="">online users...</option>
                    {userListStore.map((user, i) =>
                        user.user ? (
                            <option key={i} value={user.user}>
                                {user.user}
                            </option>
                        ) : null
                    )}
                </select>
                <label>all users: </label>
                <input onChange={(e) => setSearch(e.target.value)} type="text" value={search} placeholder="user..." />
                <input type="submit" value="search" />
            </form>
            <div>
                {allMsgByUser.map((msg, i) => (
                    <div key={i}>
                        <label>
                            {msg.date} {msg.user === userStore.user ? 'you' : msg.user} {msg.admin ? 'admin' : null}: {msg.content}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
