import React, {useState} from 'react';
import styles from './Login.module.css';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {login} from '../../utils';
import {setLoadingStore, setUserStore} from '../../redux/actions';

export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [username, setUser] = useState({username: '', password: ''});
    const [error, setError] = useState(false);

    function handleChange(e) {
        setUser({...username, [e.target.name]: e.target.value});
    }
    function handleLogin(e) {
        e.preventDefault();
        dispatch(setLoadingStore(true));
        login(username)
            .then((res) => {
                if (res) {
                    dispatch(setUserStore(res));
                    history.push('/chat');
                } else throw new Error();
            })
            .catch((error) => setError(true));
    }
    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={handleLogin}>
                <input onChange={handleChange} type="text" name="username" placeholder="User" value={username.username} required />
                <input onChange={handleChange} type="password" name="password" placeholder="Password" value={username.password} required />
                <input className={styles.nav_button} type="submit" value="Login" />
            </form>
            {error ? (
                <div>
                    <label className={styles.error}>User not found</label>
                </div>
            ) : null}
        </div>
    );
}
