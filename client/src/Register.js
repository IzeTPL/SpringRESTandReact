import * as React from 'react'
import * as Ui from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Auth from "./Auth";
class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error : '',
            user: {
                username: '',
                password: ''
            }
        };
    }
    style = {
        height: 250,
        width: 300,
        margin: '200px auto auto auto',
        display: 'block',
        padding: '20px 20px 20px 20px'
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
                            <form onSubmit={this.handleRegister}>
                                <Ui.RaisedButton type="submit" label="Zarejestruj się" primary={true} />
                            </form>
                        </div>
                        <div>
                            <Ui.FlatButton labelStyle={{ fontSize: '10px' }} label="Masz już konto? Zaloguj się" primary={true} onClick={ () => { this.props.history.push('/login') } }/>
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

    handleRegister = (event) => {
        const loginUrl = 'http://localhost:8080/register';
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
                //Auth.authenticateUser(xhr.response.token);
                // zmieniamy routing
                this.props.history.push('/login');
            } else {
                // cos poszlo nie tak
                // pobieramy informacje o bledach z
                const error = xhr.response.message ? xhr.response.message : {};
                this.setState({
                    error
                });
            }
        });
        xhr.send(JSON.stringify(this.state.user));
        event.preventDefault()
    };

}
export default Register;