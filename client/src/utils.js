import {getUser, createUser} from './redux/actions';

export function authenticate(userStore) {
    let username = sessionStorage.getItem('username');
    if (username !== null && userStore) return true;
    return false;
}

export async function login(loginUser) {
    try {
        const res = await getUser(loginUser);
        if (res.data) {
            sessionStorage.setItem('username', res.data.username);
            return res;
        } else throw new Error();
    } catch (error) {
        return false;
    }
}

export async function register(newUser) {
    try {
        const res = await createUser(newUser);
        if (res.data) {
            return login(res.data);
        } else throw new Error();
    } catch (error) {
        return false;
    }
}
