import React, {Component} from 'react';
import {Card, Image, Header, Icon} from 'semantic-ui-react'
import './styles/TeamDetailsPage.css';
import LeagueTable from './LeagueTable';
import UpcomingMatches from './UpcomingMatches';
import SquadList from './SquadList';

export default class TeamDetailsPage extends Component {
	constructor(props) {
		super(props);
		this.starTeam = this.starTeam.bind(this);
		this.state = {
			iconName: "star outline",
			isFavourite: false
		}
	}

	render() {
		console.log(this.props.teamToShow);
		if(this.props.teamToShow !== null && this.props.teamToShow !== undefined) {
			if(this.props.teamToShow !== -1) {
				var logo = this.props.teamToShow.logo;
				return (
					<div className= 'Page'>

						<div className = 'RowContainer'>
							<Card className= 'teamlogo'>
								{ this.props.user !== null ? <Icon name= {this.state.iconName} color = "yellow" id = "Star" size = "large" onClick = {this.starTeam}/> : null}

								<Image className='crest' wrapped circular size='small' src= {logo} />
							</Card>
							<UpcomingMatches />		
						</div>
						<div className = 'RowContainer'>
							<SquadList team = {this.props.teamToShow} showPage = {this.props.showPage}/>
							<LeagueTable team = {this.props.teamToShow} showPage = {this.props.showPage}/>
						</div>
					</div>

				);
			}
			else {
				return (
						<Header as = 'h1' content = "No Results Found"/>
						);
			}
		}
		else {
			return (
			<div/>);
		}
	}

	starTeam(e) {
		e.stopPropagation();
		var teams = this.props.user.teams;
		var iconName = "star outline"
		var favourite = false;
		if(!this.state.isFavourite) {
			// Add it to favourites
			teams.push(this.props.teamToShow.team_id);
			iconName = "star"
			favourite = true;
		}
		else {
			var index = teams.indexOf(this.props.teamToShow.team_id);
			if(index !== -1) {
				teams.splice(index, 1);
			}
		}
		this.props.updateFavourites(null, teams, null);
		this.setState({iconName: iconName, isFavourite: favourite});
	}

	componentDidMount() {
		if(this.props.user !== null && this.props.user !== undefined && this.props.teamToShow !== undefined) {
			if(this.props.user.teams.indexOf(this.props.teamToShow.team_id) !== -1) {
				// Team is users favourite
				this.setState({iconName : "star", isFavourite : true});
			}
		}
	}
}