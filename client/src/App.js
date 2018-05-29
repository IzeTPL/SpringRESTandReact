import React, {Component} from 'react';
import './App.css';
import Navigation from "./Navigation";
import Login from "./Login";
import Post from "./Post"
import Register from "./Register"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ShowPost from "./ShowPost";
import AddPost from "./AddPost";
import EditPost from "./EditPost";
import Tag from "./Tag";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            demo: [],
            isLoading: false
        };

    }

    render() {

        return (
            <BrowserRouter>
                <div>
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                    <Navigation/>
                    <Switch>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/post' component={Post}/>
                        <Route exact path='/post/add' component={AddPost}/>
                        <Route path='/post/tag/:tags' component={Tag}/>
                        <Route path='/post/id/:postId' component={ShowPost}/>
                        <Route path='/post/id/:postId/edit' component={EditPost}/>
                        <Route render={() => <h1>Page not found</h1>}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }

    clickMeMethod = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

}

export default App;
