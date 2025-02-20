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
    Cookies.remove('avatar')
    Cookies.remove('username')
    return Cookies.remove('token');
}

export function SET_AVATAR(avatar: string) {
    Cookies.set('avatar', avatar, {path: '/'})
}

export function GET_AVATAR() {
    return Cookies.get('avatar')
}

export function SET_USERNAME(username: string) {
    Cookies.set('username',username,{path: '/'})
}
export function GET_USERNAME(){
    return Cookies.get('username')
}