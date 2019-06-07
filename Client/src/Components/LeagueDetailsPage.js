import React, {Component} from 'react';
import {Button, Image, Icon} from 'semantic-ui-react'
import './styles/LeagueDetailsPage.css';
import LeagueTable from './LeagueTable';
import TopScorers from './TopScorers';
import Team from '../models/Team';

export default class LeagueDetailsPage extends Component {
	constructor(props) {
		super(props);
		this.starLeague = this.starLeague.bind(this);
		this.state = {
			iconName: "star outline",
			isFavourite: false
		}
	}

	render() {
		console.log(this.props.showPage);
		var team = new Team({
			league_id: this.props.leagueToShow.id
		});
		return (
			<div className = 'PageContainer'>
				{ this.props.user !== null ? <Icon name= {this.state.iconName} color = "yellow" id = "Star" size = "large" onClick = {this.starLeague}/> : null}
				<LeagueTable team = {team} showPage = {this.props.showPage}/>		
				<TopScorers showPage = {this.props.showPage}/>
			</div>
			);
	}

	starLeague(e) {
		e.stopPropagation();
		var leagues = this.props.user.leagues;
		var iconName = "star outline"
		var favourite = false;
		if(!this.state.isFavourite) {
			// Add it to favourites
			leagues.push(this.props.leagueToShow.id);
			iconName = "star"
			favourite = true;
		}
		else {
			var index = leagues.indexOf(this.props.leagueToShow.id);
			if(index !== -1) {
				leagues.splice(index, 1);
			}
		}
		this.props.updateFavourites(null, null, leagues);
		this.setState({iconName: iconName, isFavourite: favourite});
	}

	componentDidMount() {
		if(this.props.user !== null && this.props.user !== undefined && this.props.leagueToShow !== undefined) {
			if(this.props.user.leagues.indexOf(this.props.leagueToShow.id) !== -1) {
				// Team is users favourite
				this.setState({iconName : "star", isFavourite : true});
			}
		}
	}
}