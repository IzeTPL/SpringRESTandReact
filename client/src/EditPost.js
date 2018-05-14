import * as React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Ui from 'material-ui'
import Auth from "./Auth";
import * as axios from "axios/index";

class EditPost extends React.Component {

    constructor(props) {

        super(props);

        this.instance = axios.create({
            baseURL: 'http://localhost:8080/post/',
            headers: {'Authorization': 'Bearer ' + Auth.getToken()}
        });

    }

    render() {

        return (

            <MuiThemeProvider>
                <div>
                    <h2>AddPost</h2>
                    <Ui.Paper zDepth={3} style={this.style}>
                        <div>
                            <Ui.TextField floatingLabelText="Tytuł postu" onChange={this.onTitleChange} />
                        </div>
                        <div>
                            <Ui.TextField floatingLabelText="Treść" multiLine="true" onChange={this.onContentChange}/>
                        </div>
                        <div>
                            <form>
                                <Ui.RaisedButton onClick={this.handleAdd} label="Dodaj" primary={true} />
                            </form>
                        </div>
                    </Ui.Paper>
                </div>
            </MuiThemeProvider>

        );

    }

    onTitleChange = (event) => {
        this.setState({
            title: event.target.value
        });
    };

    onContentChange = (event) => {

        this.setState({
            content: event.target.value
        });
    };

    handleAdd = () => {

        this.instance.post('/create', {
            name: this.state.title,
            content: this.state.content
        }).then(response => {
            this.props.history.push("/post/" + response.data.id);
        })

    };

    componentDidMount = () => {

        if(!Auth.isUserAuthenticated()) {

            this.props.history.push('/login');

        }

    };

}

export default EditPost;