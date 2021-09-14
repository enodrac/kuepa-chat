import React, {useState} from 'react';
import styles from './Login.module.css';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {login} from '../../utils';

export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [user, setUser] = useState({user: '', password: ''});
    const [error, setError] = useState(false);

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value});
    }
    function handleLogin(e) {
        e.preventDefault();
        login(user)
            .then((res) => {
                if (res) {
                    dispatch({type: 'SET_USER', payload: res});
                    history.push('/chat');
                } else throw new Error();
            })
            .catch((error) => setError(true));
    }
    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={handleLogin}>
                <input onChange={handleChange} type="text" name="user" placeholder="User" value={user.user} required />
                <input onChange={handleChange} type="password" name="password" placeholder="Password" value={user.password} required />
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
