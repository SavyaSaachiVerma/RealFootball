import React, {Component} from 'react';
import {Button, Image} from 'semantic-ui-react'
import './styles/MainLayout.css';
import TeamDetailsPage from './TeamDetailsPage';
import Search from './Search';
import acion from 'axios';

export default class TeamInfo extends Component {
	constructor(props) {
		super(props);
		this.searchTeam = this.searchTeam.bind(this);
	}

	render() {
		return (
			<React.Fragment>
					<Search onClick = {this.searchTeam}/>
				<TeamDetailsPage teamToShow = {this.props.teamToShow} showPage = {this.props.showPage}  user = {this.props.user} updateFavourites = {this.props.updateFavourites}/>			
			</React.Fragment>
			);
	}

	searchTeam(searchQuery) {
		this.props.searchTeam(searchQuery);
	}
}