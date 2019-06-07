import React, {Component} from 'react';
import {Card} from 'semantic-ui-react'
import './styles/UpcomingMatches.css';
import TopScorers from './TopScorers';

export default class UpcomingMatches extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card className= 'UpcomingMatches'>
			</Card>
			);
	}
}