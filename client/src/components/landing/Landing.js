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

    const [user, setUser] = useState({fullname: '', user: '', password: '', student: true, admin: false});
    const [view, setView] = useState({error: false, step: 'login', found: false});

    useEffect(() => {
        if (authenticate()) history.push('/chat');
        else sessionStorage.clear();
    }, []);

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value});
    }

    function handleLogin(e) {
        setView('loading');
        e.preventDefault();
        getUser(user)
            .then((res) => {
                if (res.data.user) {
                    sessionStorage.setItem('userName', res.data.user);
                    dispatch({type: 'SET_USER', payload: res.data});
                    history.push('/chat');
                } else {
                    setView({...view, step: 'login', error: true});
                }
            })
            .catch((error) => console.log('error get user', error));
    }

    function handleCreate(e) {
        e.preventDefault();
        createUser(user)
            .then((res) => {
                if (res.data) {
                    handleLogin(e);
                } else {
                    setView({...view, step: 'register', found: true});
                }
            })
            .catch((err) => console.log('error create user', err));
    }

    return (
        <div style={{backgroundColor: 'grey', height: '100vh'}}>
            {view.step === 'login' ? (
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
                            setView({...view, error: false, step: 'register'});
                            setUser({fullname: '', user: '', password: '', student: true, admin: false});
                        }}
                    >
                        Register
                    </button>
                </div>
            ) : null}

            {view.step === 'register' ? (
                <div>
                    <h1>Register Account</h1>
                    <form onSubmit={handleCreate}>
                        <input onChange={handleChange} type="text" name="fullname" placeholder="Full name" value={user.fullname} required />
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
                            setView({...view, found: false, step: 'login'});
                            setUser({fullname: '', user: '', password: '', student: true, admin: false});
                        }}
                    >
                        Login
                    </button>
                </div>
            ) : null}
            {view.step === 'loading' ? (
                <div>
                    <h1>cargando...</h1>
                </div>
            ) : null}
        </div>
    );
}
