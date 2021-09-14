/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import styles from './Landing.module.css';
import {useHistory} from 'react-router-dom';
import {authenticate} from '../../utils';
import Login from '../login/Login';
import Register from '../register/Register';

export default function Landing() {
    const history = useHistory();

    const [view, setView] = useState(true);

    useEffect(() => {
        if (authenticate()) history.push('/chat');
        else sessionStorage.clear();
    }, []);

    return (
        <div>
            {view ? <Login /> : <Register />}
            <button className={styles.nav_button} onClick={() => setView(!view)}>
                {view ? 'register' : 'login'}
            </button>
        </div>
    );
}
