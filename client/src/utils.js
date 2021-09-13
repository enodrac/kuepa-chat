export function authenticate(history) {
    let user = sessionStorage.getItem('userName');
    if (user !== null) return true;
    return false;
}
