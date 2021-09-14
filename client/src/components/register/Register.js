import React, {useState} from 'react';
import styles from './Register.module.css';
import {register} from '../../utils';
import {useDispatch} from 'react-redux';
import {setLoadingStore} from '../../redux/actions';

export default function Register() {
    const dispatch = useDispatch();
    const [username, setUser] = useState({fullname: '', username: '', password: '', student: true, admin: false});
    const [error, setError] = useState(false);

    function handleChange(e) {
        setUser({...username, [e.target.name]: e.target.value});
    }
    function handleCreate(e) {
        e.preventDefault();
        dispatch(setLoadingStore(true));
        register(username)
            .then((res) => {
                if (!res.data) throw new Error();
            })
            .catch((error) => setError(true));
    }
    return (
        <div>
            <h1>Register Account</h1>
            <form onSubmit={handleCreate}>
                <input onChange={handleChange} type="text" name="fullname" placeholder="Full name" value={username.fullname} required />
                <input onChange={handleChange} type="text" name="username" placeholder="User" value={username.username} required />
                <input onChange={handleChange} type="password" name="password" placeholder="Password" value={username.password} required />
                <select
                    onChange={(e) =>
                        e.target.value ? setUser({...username, student: false, admin: true}) : setUser({...username, student: true, admin: false})
                    }
                >
                    <option value={false}>Student</option>
                    <option value={true}>Administrator</option>
                </select>
                <input className={styles.nav_button} type="submit" value="Register" />
            </form>
            {error ? (
                <div>
                    <label className={styles.error}>This username {username.username} already exist</label>
                </div>
            ) : null}
        </div>
    );
}
