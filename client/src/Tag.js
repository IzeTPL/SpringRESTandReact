import * as React from 'react'
import * as Ui from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as axios from "axios";
import Auth from "./Auth";

class Tag extends React.Component {
    instance = null;

    constructor(props) {

        super(props);
        this.state = {
            tags: this.props.match.params.tags,
            posts: [],
            empty: true,
            init: true,
        };

        this.instance = axios.create({
            baseURL: 'http://localhost:8080/',
            headers: {'Authorization': 'Bearer ' + Auth.getToken()}
        });

        this.anonymous = axios.create({
            baseURL: 'http://localhost:8080/',
        });

    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <h2>Posty:{this.props.match.params.tags}</h2>
                    <this.PostList />
                </div>
            </MuiThemeProvider>
        );
    }

    PostList = () => {
        const listItems = this.state.posts.map((post) =>
            <Ui.Paper zDepth={1} className="column">
            <Ui.ListItem key={post.id}
                         primaryText={post.name}
                         secondaryText={post.author}
                         onClick={() => this.handlePostClick(post)}
            />
            </Ui.Paper>
        );
        return (
            <Ui.List>{listItems}</Ui.List>
        );
    };

    refresh = () => {
        this.anonymous.get('/post/tag/' + this.props.match.params.tags)
            .then(response => {
                let posts = response.data;
                this.setState({
                    posts
                });
            });
    };

    componentDidMount = () => {

        this.refresh();

    };

    handlePostClick = (post) => {

        this.props.history.push('/post/id/' + post.id);

    }
}

export default Tag;