import React, { Component } from 'react';
import { List, Image, Button, Icon, Dropdown } from 'semantic-ui-react';
import PlayerSearchItem from './PlayerSearchItem';
import PropTypes from 'prop-types';
import axios from 'axios';
import './styles/PlayerSearchPage.css'


export default class PlayerSearchPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			players: this.props.players,
			filtered: this.props.players,
			alphabeticalUp: true,
			options: []
		}
		this.handleOnClick = this.handleOnClick.bind(this);
		this.alphabeticalSort = this.alphabeticalSort.bind(this);
		this.filterPlayers = this.filterPlayers.bind(this);
	}

	render() {
		var icon;
		if(this.state.alphabeticalUp) {
			icon = <Icon name='sort alphabet up' />
		}
		else {
			icon = <Icon name='sort alphabet down' />
		}
		return (
			<div className= 'SearchPage'>
			<div className = "SortFilter">
				<Dropdown id = "dropdown" className = "dropdown" placeholder='Types' fluid multiple selection options = {this.state.options} onChange = {this.filterPlayers}/>
				<Button icon onClick = {this.alphabeticalSort}>
					{icon}
	  			</Button>
			</div>
			<List celled verticalAlign = 'middle' >
				{this.ListItems()}
			</List>
			</div>
		);
	}

	ListItems = () =>  {
	return (this.state.filtered.map((el) => {
		return (<List.Item className = "SearchListItem" key = {el.id} onClick = {this.handleOnClick} player = {el}>
	      <PlayerSearchItem Player = {el} user = {this.props.user} updateFavourites = {this.props.updateFavourites}/>
	    </List.Item>);
		 })
		);
	}

	handleOnClick = (e, d) => {
		console.log(d.player);
		this.props.showPage(2, d.player);
	}

	alphabeticalSort = (e, d) => {
		console.log("Called");
		if(this.state.alphabeticalUp)  {
			var playersToSort = this.state.filtered;
			playersToSort.sort((player1, player2) => {
				return ((player1.name > player2.name) ? 1: -1);
			});
			console.log(playersToSort);
			this.setState({
				filtered: playersToSort,
				alphabeticalUp: false
			})
		}
		else {
			var playersToSort = this.state.filtered;
			playersToSort.sort((player1, player2) => {
				return ((player1.name < player2.name) ? 1: -1);
			});
			console.log(playersToSort);
			this.setState({
				filtered: playersToSort,
				alphabeticalUp: true
			})
		}
	}

	componentDidMount() {
		axios.get('http://localhost:4000/api/teams')
		.then(res => {
			var options = [];
			res.data.data.forEach(team => {
				options.push({key: team.name, text: team.name, value: team, image: {avatar: true, src: team.logo}});
			})
			this.setState({options: options});
		})
	}

	filterPlayers(e, d) {
		if(d.value.length === 0) {
			this.setState({filtered: this.state.players});
		}
		else {
			var updatedPlayers = this.state.filtered.filter((player => {
				var add = true;
				d.value.forEach(team => {
					if(team.league_id === "1") {
						// Iz a country
						if(player.nationality.toLowerCase() != team.name.toLowerCase()) {
							add = false;
						}
					}
					else {
						// Iz a club
						if(player.club.toLowerCase() != team.name.toLowerCase()) {
							add = false;
						}
					}
				});
				return add;
			}));
			this.setState({filtered: updatedPlayers});
		}
	}



}