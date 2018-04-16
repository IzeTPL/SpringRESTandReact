import React, {Component} from 'react';
import './App.css';
import Navigation from "./Navigation";
import Login from "./Login";
import Post from "./Post"
import {BrowserRouter, Route, Switch} from "react-router-dom";

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
                    <Navigation/>
                    <Switch>
                        <Route path='/login' component={Login}/>
                        <Route path='/post' component={Post}/>
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
