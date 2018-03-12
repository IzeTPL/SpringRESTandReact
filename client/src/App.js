import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as axios from "axios";

class App extends Component {
    instance=null;
    constructor(props) {
        super(props);

        this.state = {
            demo: [],
            isLoading: false
        };

        this.instance = axios.create({
            baseURL: 'http://localhost:8080/demo',
        });

    }

    render() {

/*        if (isLoading) {
            return <p>Loading...</p>;
        }*/

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <div>
                    <h2>List</h2>
                    {this.state.demo.map((dat) =>
                        <div key={dat.id}>
                            {dat.name}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    componentDidMount() {
        //this.setState({isLoading: true});

        this.instance.get('/')
            .then(response => {
                let demo = response.data;
                this.setState({
                    demo
                });
            });

    }

}

export default App;
