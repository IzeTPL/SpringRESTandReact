import * as React from 'react'
import * as Ui from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as axios from "axios";
import Auth from "./Auth";

class Post extends React.Component {
    instance = null;

    constructor(props) {
        super(props);
        this.state = {
            selectedPost: {
                id: '',
                name: '',
                author: '',
                content: ''
            },
            posts: [],
            empty: true,
            init: true,
        };
        this.instance = axios.create({
            baseURL: 'http://localhost:8080/post',
            headers: {'Authorization': 'Bearer ' + Auth.getToken()}
        });
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <this.PostList posts={this.posts}/>
                </div>
            </MuiThemeProvider>
        );
    }

    PostList = (props) => {
        //const posts = props.posts;
        const listItems = this.state.posts.map((post) =>
            <Ui.Paper zDepth={1}>
            <Ui.ListItem key={post.id}
                         primaryText={post.name}
                onClick={() => this.handlePostClick(post)}
            />
            </Ui.Paper>
        );
        return (
            <Ui.List>{listItems}</Ui.List>
        );
    };

    PostContent = (props) => {

        return(

                <Ui.List>
                    <Ui.Paper zDepth={1}>
                        <Ui.ListItem primaryText = {props.state.selectedPost.name}/>
                    </Ui.Paper>
                    <Ui.Paper zDepth={1}>
                        <Ui.ListItem primaryText = {props.state.selectedPost.content}/>
                    </Ui.Paper>
                    <Ui.Paper zDepth={1}>
                        <Ui.ListItem primaryText = {props.state.selectedPost.author}/>
                    </Ui.Paper>
                </Ui.List>

        );

    };


    refreshList = function () {
        this.instance.get('/')
            .then(response => {
                let posts = response.data;
                this.setState({
                    posts
                });
            })
    };

    componentDidMount = () => {

        this.refreshList();

    };

    handlePostClick = (post) => {

        console.log(post.content);

        this.instance.get('/' + post.id)
            .then(response => {
                let selectedPost = response.data;
                this.setState({
                    selectedPost
                });
            });

        console.log(post.content);

        this.props.history.push('/post/' + post.id);

    }
}



export default Post;