import React from 'react';
import moment from 'moment-timezone';
import {
  Card,
  CardText,
  CardHeader,
  CardBody,
  CardTitle,
  CardSubtitle } from 'reactstrap';

import './MatchCard.css';

const MatchCard = ({ fixture, imageUrl }) => {
  const kickoffTime = moment(fixture.getIn(['match', 'start_date'])).tz(fixture.getIn(['match', 'venue', 'timezone'])).format('ha z');
  const homeImage = imageUrl+fixture.getIn(['match', 'home_team', 'id'])+'.png';
  const awayImage = imageUrl+fixture.getIn(['match', 'away_team', 'id'])+'.png';
  const score = fixture.getIn(['match', 'status']) === 'FullTime' ? <span>{fixture.getIn(['match', 'match_info', 'home_team', 'score'])} v {fixture.getIn(['match', 'match_info', 'away_team', 'score'])}</span> : null;
  const hashtag = fixture.getIn(['match', 'hashtag']) ? '- '+fixture.getIn(['match', 'hashtag']) : null
  const buyTickets = fixture.getIn(['match', 'status']) !== 'FullTime' ? <a className='btn btn-primary' target='_blank' href={fixture.getIn(['match', 'buy_tickets'])}>Buy Tickets</a> : ''

  return (
    <Card className='mb-3'>
      <CardHeader>{fixture.getIn(['round', 'name'])}</CardHeader>
      <CardBody>
        <CardTitle>{fixture.getIn(['match', 'title'])}</CardTitle>
        <CardSubtitle><img className='club-logo' src={homeImage} alt={fixture.getIn(['match', 'home_team', 'name'])}/> v <img className='club-logo' src={awayImage} alt={fixture.getIn(['match', 'away_team', 'name'])} /></CardSubtitle>
        <CardText>{score}</CardText>
        <CardText>{kickoffTime}, {fixture.getIn(['match', 'venue', 'name'])}, {fixture.getIn(['match', 'venue', 'city'])} {hashtag}</CardText>
        {buyTickets}
      </CardBody>
    </Card>
  )
}

export default MatchCard;
