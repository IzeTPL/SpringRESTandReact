import * as React from 'react'
import * as Ui from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Auth from "./Auth";
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error : '',
            user: {
                username: '',
                password: '',
            },
            keepLogged: false
        };
    }
    style = {
        height: 250,
        width: 300,
        margin: '200px auto auto auto',
        display: 'block',
        padding: '20px 20px 20px 20px',
    };

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Ui.Paper zDepth={3} style={this.style}>
                        <div>
                            <Ui.TextField floatingLabelText="Username" onChange={this.onUsernameChange} />
                        </div>
                        <div>
                            <Ui.TextField floatingLabelText="Password" onChange={this.onPasswordChange}
                                          type="password" />
                        </div>
                        <div>
                            <form onSubmit={this.handleLogin}>
                            <Ui.RaisedButton type="submit" label="Zaloguj się" primary={true} />
                            </form>
                        </div>
                        <div>
                            <Ui.Checkbox
                                label="Nie wylogowuj mnie"
                                defaultcChecked={false}
                                onCheck={this.onCheckboxChange.bind(this)}
                            />
                        </div>
                        <div>
                            <Ui.FlatButton labelStyle={{ fontSize: '10px' }} label="Nie masz konta? Zarejestruj się" primary={true} onClick={ () => { this.props.history.push('/register') } }/>
                        </div>
                        <div>{this.state.error}</div>
                    </Ui.Paper>
                </div>
            </MuiThemeProvider>
        );
    }

    onUsernameChange = (event) => {
        let user = this.state.user;
        user.username = event.target.value;
        this.setState({
            user: user
        });
    };

    onPasswordChange = (event) => {
        let user = this.state.user;
        user.password = event.target.value;
        this.setState({
            user: user
        });
    };

    onCheckboxChange = () => {
        this.setState((oldState) => {
            return {
                keepLogged: !oldState.keepLogged,
            };
        });
    };

    handleLogin = (event) => {
        const loginUrl = 'http://localhost:8080/login';
        const xhr = new XMLHttpRequest();
        xhr.open('post', loginUrl);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // sukces
                // usuwamy bledy
                this.setState({
                    errors: {}
                });
                // zapisujemy token
                Auth.authenticateUser(xhr.response.token, xhr.response.username);
                // zmieniamy routing
                this.props.history.push('/');
            } else {
                // cos poszlo nie tak
                // pobieramy informacje o bledach z
                const error = xhr.response.message ? xhr.response.message : {};
                this.setState({
                    error
                });
            }
        });
        let user = this.state.user;
        user.keepLogged = this.state.keepLogged;
        this.setState({
            user: user
        });
        console.log(this.state.user);
        xhr.send(JSON.stringify(this.state.user));
        event.preventDefault()
    };

    componentDidMount = () => {

        if(Auth.isUserAuthenticated()) {

            this.props.history.push('/');

        }

    };

}
export default Login;