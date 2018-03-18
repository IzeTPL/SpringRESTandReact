import React, {Component} from 'react';
import './App.css';
import Demo from "./Demo";
import Navigation from "./Navigation";
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
                        <Route path='/demo' component={Demo}/>
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
