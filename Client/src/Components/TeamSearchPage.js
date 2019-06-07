import React, { Component } from 'react';
import { List, Image, Button, Icon, Dropdown} from 'semantic-ui-react';
import TeamSearchItem from './TeamSearchItem';
import PropTypes from 'prop-types';
import axios from 'axios';
import './styles/PlayerSearchPage.css';


export default class TeamSearchPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teams: this.props.teams,
			filtered: this.props.teams,
			alphabeticalUp: true,
			options: []
		}
		this.handleOnClick = this.handleOnClick.bind(this);
		this.alphabeticalSort = this.alphabeticalSort.bind(this);
		this.filterTeams = this.filterTeams.bind(this);
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
			<div className='SearchPage'>
				<div className = "SortFilter">
					<Dropdown id = "dropdown" className = "dropdown" placeholder='Types' fluid selection options = {this.state.options} onChange = {this.filterTeams}/>
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
		return (<List.Item className = "PlayerItem" key = {el.team_id} onClick = {this.handleOnClick} team = {el}>
	      <TeamSearchItem Team = {el} user = {this.props.user} updateFavourites = {this.props.updateFavourites}/>
	    </List.Item>);
		 })
		);
	}

	handleOnClick = (e, d) => {
		console.log(d.player);
		this.props.showPage(1, d.team);
	}

	alphabeticalSort = (e, d) => {
		console.log("Called");
		if(this.state.alphabeticalUp)  {
			var teamsToSort = this.state.filtered;
			teamsToSort.sort((team1, team2) => {
				return ((team1.name > team2.name) ? 1: -1);
			});
			console.log(teamsToSort);
			this.setState({
				filtered: teamsToSort,
				alphabeticalUp: false
			})
		}
		else {
			var teamsToSort = this.state.filtered;
			teamsToSort.sort((team1, team2) => {
				return ((team1.name < team2.name) ? 1: -1);
			});
			console.log(teamsToSort);
			this.setState({
				filtered: teamsToSort,
				alphabeticalUp: true
			})
		}
	}

	componentDidMount() {
		axios.get('http://localhost:4000/api/leagues')
		.then(res => {
			var options = [];
			res.data.data.forEach(league => {
				options.push({key: league.name, text: league.name, value: league, image: {avatar: true, src: league.logo}});
			})
			this.setState({options: options});
		})
	}

	filterTeams(e, d) {
		if(d.value.length === 0) {
			this.setState({filtered: this.state.teams});
		}
		else {
			var updatedTeams = this.state.teams.filter((team => {
				if(team.league_id === d.value.id) {
					return true;
				}
				return false;
			}));
			this.setState({filtered: updatedTeams});
		}
	}



}