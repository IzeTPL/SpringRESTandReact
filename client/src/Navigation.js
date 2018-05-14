import * as React from 'react'
import * as Ui from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Link} from 'react-router-dom'
import Auth from "./Auth";
import {withRouter} from "react-router-dom";
import {Popover} from "material-ui";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            userOpen: false,
        };
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Ui.AppBar
                        title="Menu"
                        onLeftIconButtonClick={this.openNavigationDrawer}
                        iconElementRight={<this.RightButtons />}
                    />
                    <Ui.Drawer open={this.state.open} docked={false} onRequestChange={(open) =>
                        this.setState({open})}>
                        <Ui.Menu>
                            <Ui.MenuItem primaryText="Posts"
                                         leftIcon={<Ui.FontIcon className="material-icons">home</Ui.FontIcon>}
                                         containerElement={<Link to="/post"/>}></Ui.MenuItem>
                        </Ui.Menu>
                    </Ui.Drawer>
                </div>
            </MuiThemeProvider>
        );
    }

    RightButtons = (props) => {

        return(
        <div>
            {Auth.isUserAuthenticated() ?
            <this.Logged /> :
            <Ui.FlatButton label="Zaloguj"
                           onClick={
                               () => {
                                   this.props.history.push('/login');
                               }
                           }
            />}
        </div>
        );

    };

    Logged = (props) => {

        return (
            <div>
                <Ui.IconButton
                    iconClassName="material-icons"
                    tooltip="Dodaj Post"
                    onClick={() => {
                        this.props.history.push('/post/add');
                    }}
                >
                    add
                </Ui.IconButton>
                <Ui.FlatButton label={Auth.getUsername()}
                               onClick={
                                   (event) => {
                                       event.preventDefault();

                                       this.setState({
                                           userOpen: true,
                                           anchorEl: event.currentTarget,
                                       });
                                   }
                               }
                />
                <Ui.Popover
                    open={this.state.userOpen}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={
                        () => {
                            this.setState({
                                userOpen: false,
                            });
                        }
                    }
                >
                    <Ui.Menu onItemClick={
                        (event) => {
                            event.preventDefault();
                            Auth.deauthenticateUser();
                            this.props.history.push('/');
                            window.location.reload();
                        }
                    }>
                        <Ui.MenuItem primaryText="Wyloguj" />
                    </Ui.Menu>
                </Ui.Popover>
            </div>
        )
    };

    openNavigationDrawer = (event) => {
        this.setState({
            open: true,
        });
    };
}

export default withRouter(Navigation);