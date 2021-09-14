export function authenticate(userStore) {
    let user = sessionStorage.getItem('userName');
    if (user !== null && userStore.user) return true;
    return false;
}
