import React, { Component } from 'react';
import Immutable from 'immutable';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = { fixtures: '' }
  }

  componentWillMount() {
    // https://api.ffa.football/ribbon?team_ids=1962 - upcoming games
    // https://api.ffa.football/m927954/details - match details
    // https://api.ffa.football/t1962/fixture - fixtures
    const url = 'https://api.ffa.football/t1962/fixture';
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({ fixtures: Immutable.fromJS(data) }))
    .catch(err => console.error(url, err.toString()));
  }

  componentDidMount() {

  }

  render() {
    // const xxx = this.state.find(layout => true);
    const { fixtures } = this.state;
    console.log(fixtures);
    let layout = !fixtures ? false : fixtures;
    if (fixtures) {
      layout = ;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
