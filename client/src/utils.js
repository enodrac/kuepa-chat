import {getUser, createUser} from './redux/actions';

export function authenticate(userStore) {
    let username = sessionStorage.getItem('usernameName');
    if (username !== null && userStore) return true;
    return false;
}

export async function login(username) {
    try {
        const res = await getUser(username);
        if (res.data) {
            sessionStorage.setItem('usernameName', res.data.username);
            return res.data;
        } else throw new Error();
    } catch (error) {
        return false;
    }
}

export async function register(username) {
    try {
        const res = await createUser(username);
        if (res.data) {
            login(res.data.username);
            return true;
        } else throw new Error();
    } catch (error) {
        return false;
    }
}
