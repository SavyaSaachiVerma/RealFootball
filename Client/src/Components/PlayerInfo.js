import React, {Component} from 'react';
import {Button, Image} from 'semantic-ui-react'
import './styles/MainLayout.css';
import PlayerDetails from './PlayerDetails';
import Search from './Search';
import acion from 'axios';

export default class PlayerInfo extends Component {
	constructor(props) {
		super(props);
		this.searchPlayer = this.searchPlayer.bind(this);
	}

	render() {
		return (
			<React.Fragment>
				<Search onClick = {this.searchPlayer}/>
				<PlayerDetails playerToShow = {this.props.playerToShow} user = {this.props.user} updateFavourites = {this.props.updateFavourites}/>			
			</React.Fragment>
			);
	}

	searchPlayer(searchQuery) {
		this.props.searchPlayer(searchQuery);
	}
}