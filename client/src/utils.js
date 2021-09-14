import {getUser, createUser} from './redux/actions';

export function authenticate(userStore) {
    let user = sessionStorage.getItem('userName');
    if (user !== null && userStore) return true;
    return false;
}

export async function login(user) {
    try {
        const res = await getUser(user);
        if (res.data) {
            sessionStorage.setItem('userName', res.data.user);
            return res.data;
        } else throw new Error();
    } catch (error) {
        return false;
    }
}

export async function register(user) {
    try {
        const res = await createUser(user);
        if (res.data) {
            login(res.data.user);
            return true;
        } else throw new Error();
    } catch (error) {
        return false;
    }
}
