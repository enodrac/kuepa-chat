import React, {useState} from 'react';
import styles from './Register.module.css';
import {register} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {setErrorHandling, setUserStore} from '../../redux/actions';

export default function Register() {
    const dispatch = useDispatch();
    const [newUser, setNewUser] = useState({fullname: '', username: '', password: '', student: true, admin: false});
    const errorHandling = useSelector((state) => state.errorHandling);
    const history = useHistory();

    function handleChange(e) {
        setNewUser({...newUser, [e.target.name]: e.target.value});
    }
    function handleCreate(e) {
        e.preventDefault();
        dispatch(setErrorHandling({...errorHandling, loading: true}));
        register(newUser)
            .then((res) => {
                if (res.data) {
                    dispatch(setUserStore(res.data));
                    history.push('/chat');
                } else throw new Error();
            })
            .catch((error) => dispatch(setErrorHandling({...errorHandling, loading: false, existing: true})));
    }
    return (
        <div>
            <h1>Register Account</h1>
            <form onSubmit={handleCreate}>
                <input onChange={handleChange} type="text" name="fullname" placeholder="Full name" value={newUser.fullname} required />
                <input onChange={handleChange} type="text" name="username" placeholder="User" value={newUser.username} required />
                <input onChange={handleChange} type="password" name="password" placeholder="Password" value={newUser.password} required />
                <select
                    onChange={(e) =>
                        e.target.value ? setNewUser({...newUser, student: false, admin: true}) : setNewUser({...newUser, student: true, admin: false})
                    }
                >
                    <option value={false}>Student</option>
                    <option value={true}>Administrator</option>
                </select>
                <input className={styles.nav_button} type="submit" value="Register" />
            </form>
            {errorHandling.existing ? (
                <div>
                    <label className={styles.error}>This user {newUser.username} already exist</label>
                </div>
            ) : null}
        </div>
    );
}
