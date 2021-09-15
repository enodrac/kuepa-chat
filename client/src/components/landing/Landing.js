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
    const errorHandling = useSelector((state) => state.errorHandling);

    const [view, setView] = useState(true);

    useEffect(() => {
        if (authenticate()) history.push('/chat');
        else sessionStorage.clear();
    }, []);

    return (
        <div className={styles.container}>
            {!errorHandling.loading ? (
                <div className={styles.inputContainer}>
                    <button
                        className={styles.swapButton}
                        onClick={() => {
                            setView(!view);
                            dispatch(setErrorHandling({loading: false, notFound: false, existing: false, connected: false}));
                        }}
                    >
                        {view ? 'Register' : 'Sign in'}
                    </button>
                    {view ? <Login /> : <Register />}
                </div>
            ) : (
                <div className={styles.loading}>
                    <img src="https://cdn.dribbble.com/users/108183/screenshots/5331825/loading_xxi.gif" alt="" />
                </div>
            )}
        </div>
    );
}
