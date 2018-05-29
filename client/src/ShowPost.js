import * as React from 'react'
import * as Ui from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as axios from "axios";
import Auth from "./Auth";
import {Link} from 'react-router-dom'

class ShowPost extends React.Component {
    instance = null;

    constructor(props) {

        super(props);
        this.state = {
            postId: this.props.match.params.postId,
            post: {
                tags: [],
            },
            comments: [],
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
                    <this.checkStatus status={this.state.status}/>
                </div>
            </MuiThemeProvider>
        );
    }

    checkStatus = (props) => {

        if (props.status == 404) {

            return (<h2>Post not found</h2>);

        } else {

            return (
                <div>
                    <h2>Post</h2>
                    <this.PostContent post={this.post}/>
                    <Ui.Paper zDepth={3} style={this.style} className="column">
                        <div>
                            <Ui.TextField floatingLabelText="Treść" multiLine="true" onChange={this.onContentChange}/>
                        </div>
                        <div>
                            <form>
                                <Ui.RaisedButton disabled={this.state.empty} onClick={this.handleAdd} label="Dodaj"
                                                 primary={true}/>
                            </form>
                        </div>
                    </Ui.Paper>
                    <this.CommentList/>
                </div>
            );
        }

    };

    onContentChange = (event) => {

        this.setState({
            content: event.target.value,
            empty: false
        });

        if (event.target.value === "") {
            this.setState({
                empty: true
            });
        }


    };

    PostContent = () => {

        return (

            <Ui.List>
                <Ui.Paper zDepth={1} className="column">
                    <Ui.ListItem disabled={true} primaryText={this.state.post.name}/>
                </Ui.Paper>
                <Ui.Paper zDepth={1} className="column">
                    <Ui.ListItem disabled={true} primaryText={this.state.post.content} secondaryText={this.state.post.author}/>
                    <Ui.ListItem disabled={true} primaryText={this.state.post.tags.map((tag) => <Link to={"/post/tag/" + tag}><Ui.FlatButton label={tag} primary={true} /></Link>)} />
                </Ui.Paper>
                <Ui.Paper zDepth={1} className="column">
                    <Ui.RaisedButton onClick={this.handleRemove} label="Usuń" secondary={true}/>
                </Ui.Paper>
            </Ui.List>

        );

    };

    CommentList = () => {

        const listItems = this.state.comments.map((comment) =>
            <Ui.Paper zDepth={1} className="column">
                <Ui.ListItem key={comment.id}
                             primaryText={comment.content}
                             secondaryText={comment.author}
                />
            </Ui.Paper>
        );

        return (
            <Ui.List>{listItems}</Ui.List>
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
            .catch(error => {
                if (error.response.status == 404) {

                    let status = error.response.status;
                    this.setState({
                        status
                    });

                }
            });

        this.anonymous.get(this.props.match.params.postId, {baseURL: 'http://localhost:8080/comment/postId/'})
            .then(response => {
                let comments = response.data;
                this.setState({
                    comments
                });
            })
    };

    handleAdd = () => {

        this.instance.post('/create', {
                content: this.state.content,
                postId: this.props.match.params.postId
            },
            {
                baseURL: 'http://localhost:8080/comment'
            }).then(response => {
            this.refresh()
        })

    };

    componentDidMount = () => {

        this.refresh();

    };

}

export default ShowPost;