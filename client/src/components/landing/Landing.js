/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import styles from './Landing.module.css';
import {useHistory} from 'react-router-dom';
import {authenticate} from '../../utils';
import {useSelector, useDispatch} from 'react-redux';
import Login from '../login/Login';
import Register from '../register/Register';
import {setErrorHandling} from '../../redux/actions';

export default function Landing() {
    const history = useHistory();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);

    const [view, setView] = useState(true);

    useEffect(() => {
        if (authenticate()) history.push('/chat');
        else sessionStorage.clear();
    }, []);

    return (
        <div className={styles.container}>
            {!loading ? (
                <div className={styles.inputContainer}>
                    {view ? <Login /> : <Register />}
                    <button
                        className={styles.nav_button}
                        onClick={() => {
                            setView(!view);
                            dispatch(setErrorHandling({loading: false, notFound: false, existing: false}));
                        }}
                    >
                        {view ? 'register' : 'login'}
                    </button>
                </div>
            ) : (
                <div>
                    <h1>loading...</h1>
                </div>
            )}
        </div>
    );
}
