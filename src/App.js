import React, { Component } from 'react';
import Immutable from 'immutable';
import moment from 'moment-timezone';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, CardText, CardHeader, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';

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
        const hashtag = fixture.getIn(['match', 'hashtag']) ? '- '+fixture.getIn(['match', 'hashtag']) : null
        const buyTickets = fixture.getIn(['match', 'status']) !== 'FullTime' ? <a className='btn btn-primary' target='_blank' href={fixture.getIn(['match', 'buy_tickets'])}>Buy Tickets</a> : ''
        return (
          <Card key={fixture.getIn(['match', 'uuid'])} className='mb-3'>
            <CardHeader>{fixture.getIn(['round', 'name'])}</CardHeader>
            <CardBody>
              <CardTitle>{fixture.getIn(['match', 'title'])}</CardTitle>
              <CardSubtitle><img className='club-logo' src={homeImage} alt={fixture.getIn(['match', 'home_team', 'name'])}/> v <img className='club-logo' src={awayImage} alt={fixture.getIn(['match', 'away_team', 'name'])} /></CardSubtitle>
              <CardText>{score}</CardText>
              <CardText>{kickoffTime}, {fixture.getIn(['match', 'venue', 'name'])}, {fixture.getIn(['match', 'venue', 'city'])} {hashtag}</CardText>
              {buyTickets}
            </CardBody>
          </Card>
        );
      }).toJS();
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sydney FC Fixtures</h1>
        </header>
        <div className="container pt-3">
          {layout}
        </div>
      </div>
    );
  }
}

export default App;
