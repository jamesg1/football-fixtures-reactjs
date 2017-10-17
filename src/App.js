import React, { Component } from 'react';
import Immutable from 'immutable';
import moment from 'moment-timezone';
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

  render() {
    const { fixtures } = this.state;
    const imageUrl = 'https://dk7yn3bk5vn41.cloudfront.net/team-logos/150/';
    let layout = !fixtures ? null : fixtures;

    if (layout) {
      console.log(layout);
      layout = fixtures.filter(fixture => fixture.getIn(['competition', 'name']) === 'Hyundai A-League').map(fixture => {
        const kickoffTime = moment(fixture.getIn(['match', 'start_date'])).tz(fixture.getIn(['match', 'venue', 'timezone'])).format('ha z');
        const homeImage = imageUrl+fixture.getIn(['match', 'home_team', 'id'])+'.png';
        const awayImage = imageUrl+fixture.getIn(['match', 'away_team', 'id'])+'.png';
        const score = fixture.getIn(['match', 'status']) === 'FullTime' ? <p>{fixture.getIn(['match', 'match_info', 'home_team', 'score'])} v {fixture.getIn(['match', 'match_info', 'away_team', 'score'])}</p> : null;
        const hashtag = fixture.getIn(['match', 'hashtag']) ? fixture.getIn(['match', 'hashtag']) : null
        const buyTickets = fixture.getIn(['match', 'status']) !== 'FullTime' ? <a href={fixture.getIn(['match', 'buy_tickets'])}>Buy Tickets</a> : ''
        return (
          <div key={fixture.getIn(['match', 'uuid'])}>
            <h2>{fixture.getIn(['round', 'name'])}</h2>
            <img className='club-logo' src={homeImage} alt={fixture.getIn(['match', 'home_team', 'name'])}/> v <img className='club-logo' src={awayImage} alt={fixture.getIn(['match', 'away_team', 'name'])} />
            <h4>{fixture.getIn(['match', 'title'])}</h4>
            {score}
            <p>{kickoffTime}, {fixture.getIn(['match', 'venue', 'name'])}, {fixture.getIn(['match', 'venue', 'city'])} {buyTickets}</p>
            {hashtag}
          </div>
        );
      }).toJS();
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={imageUrl+'1962.png'} className="App-logo" alt="logo" />
          <h1 className="App-title">Sydney FC Fixtures</h1>
        </header>
        {layout}
      </div>
    );
  }
}

export default App;
