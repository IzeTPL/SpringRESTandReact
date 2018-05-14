import * as React from 'react'
import * as Ui from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as axios from "axios";
import Auth from "./Auth";

class ShowPost extends React.Component {
    instance = null;

    constructor(props) {

        super(props);
        this.state = {
            postId: this.props.match.params.postId,
            post: [],
            empty: true,
            init: true,
        };

        this.instance = axios.create({
            baseURL: 'http://localhost:8080/post/',
            headers: {'Authorization': 'Bearer ' + Auth.getToken()}
        });

        this.anonymous = axios.create({
            baseURL: 'http://localhost:8080/post/',
        });

    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <h2>Post</h2>
                    <this.PostContent post={this.post}/>
                </div>
            </MuiThemeProvider>
        );
    }

    PostContent = () => {

        return(

            <Ui.List>
                <Ui.Paper zDepth={1}>
                    <Ui.ListItem primaryText = {this.state.post.name}/>
                </Ui.Paper>
                <Ui.Paper zDepth={1}>
                    <Ui.ListItem primaryText = {this.state.post.content}/>
                </Ui.Paper>
                <Ui.Paper zDepth={1}>
                    <Ui.ListItem primaryText = {this.state.post.author}/>
                </Ui.Paper>
                <Ui.Paper zDepth={1}>
                    <Ui.RaisedButton onClick={this.handleRemove} label="Usuń" secondary={true} />
                </Ui.Paper>
            </Ui.List>

        );

    };

    handleRemove = () => {

        this.instance.delete(this.state.postId).then(response => {
            this.props.history.push("/post/");
        })

    };

    refresh = () => {
        this.anonymous.get(this.props.match.params.postId)
            .then(response => {
                let post = response.data;
                this.setState({
                    post
                });
            })
    };

    componentDidMount = () => {

        this.refresh();

    };

}

export default ShowPost;