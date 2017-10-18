import React, { Component } from 'react';
import Immutable from 'immutable';
import MatchCard from './components/MatchCard/MatchCard';
import Header from './components/Header/Header';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';


class App extends Component {

  constructor(){
    super();
    this.toggle = this.toggle.bind(this);
    this.state = { fixtures: '', activeTab: '1' }
  }

  componentWillMount() {
    const url = 'https://api.ffa.football/t1962/fixture';
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({ fixtures: Immutable.fromJS(data) }))
    .catch(err => console.error(url, err.toString()));
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { fixtures } = this.state;
    let layout = !fixtures ? null : fixtures;
    let resultsLayout = !fixtures ? null : fixtures;
    const imageUrl = 'https://dk7yn3bk5vn41.cloudfront.net/team-logos/150/';

    if (layout) {
      layout = fixtures.filter(fixture => fixture.getIn(['competition', 'name']) === 'Hyundai A-League' && fixture.getIn(['match', 'status']) !== 'FullTime').map(fixture => <MatchCard key={fixture.getIn(['match', 'uuid'])} fixture={fixture} imageUrl={imageUrl} />).toJS();

      resultsLayout = fixtures.filter(fixture => fixture.getIn(['competition', 'name']) === 'Hyundai A-League' && fixture.getIn(['match', 'status']) === 'FullTime').map(fixture => <MatchCard key={fixture.getIn(['match', 'uuid'])} fixture={fixture} imageUrl={imageUrl} />).toJS();
    }

    return (
      <div className="App">
        <Header title={'Sydney FC Fixtures'} imageUrl={imageUrl} />
        <div className="container pt-3">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Upcoming Matches
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Results
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              {layout}
            </TabPane>
            <TabPane tabId="2">
              {resultsLayout}
            </TabPane>
          </TabContent>
          </div>
      </div>
    );
  }
}

export default App;
