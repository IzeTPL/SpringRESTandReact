import * as React from 'react'
import * as Ui from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as axios from "axios";
import Auth from "./Auth";

class Demo extends React.Component {
    instance = null;

    constructor(props) {
        super(props);
        this.state = {
            selectedDemoEntry: {
                id: '',
                name: ''
            },
            demos: [],
            empty: true,
            init: true,
        };
        this.instance = axios.create({
            baseURL: 'http://localhost:8080/demo',
            headers: {'Authorization': 'Bearer ' + Auth.getToken()}
        });
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <h3>Authors</h3>

                    <Ui.Paper zDepth={1} className="left-column">
                        <this.DemoList authors={this.demos}/>
                    </Ui.Paper>
                </div>
            </MuiThemeProvider>
        );
    }

    DemoList = (props) => {
        const demos = props.demos;
        const listItems = this.state.demos.map((demo) =>
            <Ui.ListItem key={demo.id}
                         primaryText={demo.name}
                //onClick={() => this.handleAuthorClick(demo)}
            />
        );
        return (
            <Ui.List>{listItems} </Ui.List>
        );
    };


    refreshList = function () {
        this.instance.get('/')
            .then(response => {
                let demos = response.data;
                this.setState({
                    demos
                });
            })
            .catch(error => {
                if (error.response.status === 401)
                    this.props.history.push('/login');
            });
    };

    componentDidMount = () => {
        if (!Auth.isUserAuthenticated())
            this.props.history.push('/login');
        else {
            this.refreshList();
        }

        this.refreshList();

    };

}

export default Demo;