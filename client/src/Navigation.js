import * as React from 'react'
import * as Ui from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router-dom'
class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Ui.AppBar
                        title="Menu"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        onLeftIconButtonClick={this.openNavigationDrawer}
                    />
                    <Ui.Drawer open={this.state.open} docked={false} onRequestChange={(open) =>
                        this.setState({open})}>
                        <Ui.Menu>
                            <Ui.MenuItem primaryText="Posts" leftIcon={<Ui.FontIcon className="material-icons">home</Ui.FontIcon>} containerElement={<Link to="/post"/>}></Ui.MenuItem>
                        </Ui.Menu>
                    </Ui.Drawer>
                </div>
            </MuiThemeProvider>
        );
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    openNavigationDrawer = (event) => {
        this.setState({
            open: true,
        });
    };
}

export default Navigation;