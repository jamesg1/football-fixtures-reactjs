import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {data: ''}
  }

  componentWillMount() {
    const url = 'https://api.ffa.football/t1962/fixture';
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({ data: data }))
    .catch(err => console.error(url, err.toString()))
  }

  render() {
    const data = JSON.stringify(this.state.data);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {data}
      </div>
    );
  }
}

export default App;
