/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import styles from './Landing.module.css';
import {useHistory} from 'react-router-dom';
import {createUser, getUser} from '../../redux/actions/index';
import {authenticate} from '../../utils';
import {useDispatch} from 'react-redux';

export default function Landing() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [user, setUser] = useState({fullName: '', user: '', password: '', student: true, admin: false});
    const [view, setView] = useState({error: false, step: true, found: false});

    useEffect(() => {
        if (authenticate()) history.push('/chat');
    }, []);

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value});
    }

    function handleLogin(e) {
        e.preventDefault();
        getUser(user)
            .then((res) => {
                if (res.data.user) {
                    console.log('usuario encontrado', res.data);
                    sessionStorage.setItem('userName', res.data.user);
                    dispatch({type: 'SET_USER', payload: res.data});
                    history.push('/chat');
                } else {
                    setView({...view, error: true});
                }
            })
            .catch((err) => console.log('error get user', err));
    }

    function handleCreate(e) {
        e.preventDefault();
        createUser(user)
            .then((res) => {
                if (res.data) {
                    handleLogin(e);
                } else {
                    setView({...view, found: true});
                }
            })
            .catch((err) => console.log('error create user', err));
    }

    return (
        <div>
            {view.step ? (
                <div>
                    <h1>Log in</h1>
                    <form onSubmit={handleLogin}>
                        <input onChange={handleChange} type="text" name="user" placeholder="User" value={user.user} required />
                        <input onChange={handleChange} type="password" name="password" placeholder="Password" value={user.password} required />
                        <input className={styles.nav_button} type="submit" value="Login" />
                    </form>
                    {view.error ? (
                        <div>
                            <label className={styles.error}>User not found</label>
                        </div>
                    ) : null}

                    <button
                        className={styles.nav_button}
                        onClick={() => {
                            setView({...view, error: false, step: false});
                            setUser({fullName: '', user: '', password: '', student: true, admin: false});
                        }}
                    >
                        Register
                    </button>
                </div>
            ) : (
                <div>
                    <h1>Register Account</h1>
                    <form onSubmit={handleCreate}>
                        <input onChange={handleChange} type="text" name="fullName" placeholder="Full name" value={user.fullName} required />
                        <input onChange={handleChange} type="text" name="user" placeholder="User" value={user.user} required />
                        <input onChange={handleChange} type="password" name="password" placeholder="Password" value={user.password} required />
                        <select
                            onChange={(e) =>
                                e.target.value ? setUser({...user, student: false, admin: true}) : setUser({...user, student: true, admin: false})
                            }
                        >
                            <option value={false}>Student</option>
                            <option value={true}>Administrator</option>
                        </select>
                        <input className={styles.nav_button} type="submit" value="Register" />
                    </form>
                    {view.found ? (
                        <div>
                            <label className={styles.error}>This user {user.user} already exist</label>
                        </div>
                    ) : null}
                    <button
                        className={styles.nav_button}
                        onClick={() => {
                            setView({...view, found: false, step: true});
                            setUser({fullName: '', user: '', password: '', student: true, admin: false});
                        }}
                    >
                        Login
                    </button>
                </div>
            )}
        </div>
    );
}
