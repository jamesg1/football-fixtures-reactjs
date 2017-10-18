import React, { Component } from 'react';
import Immutable from 'immutable';
import moment from 'moment-timezone';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, CardText, CardHeader, CardBody,
  CardTitle, CardSubtitle, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';


class App extends Component {

  constructor(){
    super();
    this.toggle = this.toggle.bind(this);
    this.state = { fixtures: '', activeTab: '1' }
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

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { fixtures } = this.state;
    const imageUrl = 'https://dk7yn3bk5vn41.cloudfront.net/team-logos/150/';
    let layout = !fixtures ? null : fixtures;
    let resultsLayout = !fixtures ? null : fixtures;

    if (layout) {
      console.log(layout);

      layout = fixtures.filter(fixture => fixture.getIn(['competition', 'name']) === 'Hyundai A-League' && fixture.getIn(['match', 'status']) !== 'FullTime').map(fixture => {
        const kickoffTime = moment(fixture.getIn(['match', 'start_date'])).tz(fixture.getIn(['match', 'venue', 'timezone'])).format('ha z');
        const homeImage = imageUrl+fixture.getIn(['match', 'home_team', 'id'])+'.png';
        const awayImage = imageUrl+fixture.getIn(['match', 'away_team', 'id'])+'.png';
        const hashtag = fixture.getIn(['match', 'hashtag']) ? '- '+fixture.getIn(['match', 'hashtag']) : null
        const buyTickets = fixture.getIn(['match', 'status']) !== 'FullTime' ? <a className='btn btn-primary' target='_blank' href={fixture.getIn(['match', 'buy_tickets'])}>Buy Tickets</a> : ''
        return (
          <Card key={fixture.getIn(['match', 'uuid'])} className='mb-3'>
            <CardHeader>{fixture.getIn(['round', 'name'])}</CardHeader>
            <CardBody>
              <CardTitle>{fixture.getIn(['match', 'title'])}</CardTitle>
              <CardSubtitle><img className='club-logo' src={homeImage} alt={fixture.getIn(['match', 'home_team', 'name'])}/> v <img className='club-logo' src={awayImage} alt={fixture.getIn(['match', 'away_team', 'name'])} /></CardSubtitle>
              <CardText>{kickoffTime}, {fixture.getIn(['match', 'venue', 'name'])}, {fixture.getIn(['match', 'venue', 'city'])} {hashtag}</CardText>
              {buyTickets}
            </CardBody>
          </Card>
        );
      }).toJS();

      resultsLayout = fixtures.filter(fixture => fixture.getIn(['competition', 'name']) === 'Hyundai A-League' && fixture.getIn(['match', 'status']) === 'FullTime').map(fixture => {
        const kickoffTime = moment(fixture.getIn(['match', 'start_date'])).tz(fixture.getIn(['match', 'venue', 'timezone'])).format('ha z');
        const homeImage = imageUrl+fixture.getIn(['match', 'home_team', 'id'])+'.png';
        const awayImage = imageUrl+fixture.getIn(['match', 'away_team', 'id'])+'.png';
        const score = fixture.getIn(['match', 'status']) === 'FullTime' ? <span>{fixture.getIn(['match', 'match_info', 'home_team', 'score'])} v {fixture.getIn(['match', 'match_info', 'away_team', 'score'])}</span> : null;
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
