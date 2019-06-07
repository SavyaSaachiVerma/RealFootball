import React, {Component} from 'react';
import {Button, Image, Card, Header, Icon} from 'semantic-ui-react'
import './styles/SearchItem.css';
import TopScorers from './TopScorers';
export default class PlayerSearchItem extends Component {
	constructor(props) {
		super(props);
		this.starTeam = this.starTeam.bind(this);
		this.state = {
			iconName: "star outline",
			isFavourite: false
		}
	}

	render() {
			
		return (
			<Card className = "PlayerSearchCard">
				<Card.Content id = "CardContent">
					<Image circular size = "tiny" src = {this.props.Team.logo} className = "PlayerSearchImage"/>
					<Header as='h2' className = "PlayerSearchName" content = {this.props.Team.name} textAlign = 'center'/>
					{ this.props.user !== null ? <Icon name= {this.state.iconName} color = "yellow" id = "Star" size = "large" onClick = {this.starTeam}/> : null}
					
				</Card.Content>
			</Card>
			);
	}

	starTeam(e) {
		e.stopPropagation();
		var teams = this.props.user.teams;
		var iconName = "star outline"
		var favourite = false;
		if(!this.state.isFavourite) {
			// Add it to favourites
			teams.push(this.props.Team.team_id);
			iconName = "star"
			favourite = true;
		}
		else {
			var index = teams.indexOf(this.props.Team.team_id);
			if(index !== -1) {
				teams.splice(index, 1);
			}
		}
		this.props.updateFavourites(null, teams, null);
		this.setState({iconName: iconName, isFavourite: favourite});
	}

	componentDidMount() {
		if(this.props.user !== null && this.props.Team !== undefined) {
			if(this.props.user.teams.indexOf(this.props.Team.team_id) !== -1) {
				// Team is users favourite
				this.setState({iconName : "star", isFavourite : true});
			}
		}
	}
}