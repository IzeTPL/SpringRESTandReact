class Auth {

    static authenticateUser(token, username) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
    }
    static isUserAuthenticated() {

        let date = new Date().getTime()/1000;
        if (localStorage.getItem('token') !== null) {

            if (date > this.getExpirationTime()) this.deauthenticateUser();

        }
        return localStorage.getItem('token') !== null;

    }
    static deauthenticateUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }
    static getToken() {
        return localStorage.getItem('token');
    }
    static getUsername() {
        return localStorage.getItem('username');
    }

    static getExpirationTime() {
        var base64Url = this.getToken().split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        var jwt = JSON.parse(window.atob(base64));
        var array = Object.values(jwt);
        return array[1];
    };

}
export default Auth;