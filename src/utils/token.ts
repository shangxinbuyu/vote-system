import Cookies from 'js-cookie'

export function SET_TOKEN(token: string) {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 604800000);
    Cookies.set('token', token, {path: '/'});
}

export function GET_TOKEN() {
    return Cookies.get('token');
}

export function REMOVE_TOKEN() {
    return Cookies.remove('token');
}