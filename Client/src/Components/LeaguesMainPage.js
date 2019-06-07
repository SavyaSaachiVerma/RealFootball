import React, {Component} from 'react';
import './styles/HomePage.css';
import LiveScoresHP from './LiveScoresHP';
import ActuallyHorizontalList from './ActuallyHorizontalList';
import HorizontalListItem from '../models/HorizontalListItem';
import axios from 'axios';


export default class LeaguesMainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			leagues: []
		}
	}

	render(){
		return(
			<div className = "MainContainer" style = {{display: "flex", flexDirection: "column", justifyConent: "space-between"}}>		
				<ActuallyHorizontalList items = {this.state.leagues} itemType = "Leagues" onClickItem = {this.onClickLeague}/>
			</div>
		);
	}

	onClickLeague = (e,d) => {
		console.log(d.data);
		this.props.showPage(0, d.data);
	}

	componentDidMount() {
		axios.get('http://localhost:4000/api/leagues')
		.then(res => {
			var popularLeagues = [];
			res.data.data.forEach(league => {
				var newItem = new HorizontalListItem({
					header: league.name,
					img: league.item_logo,
					data: league
				});
				popularLeagues.push(newItem);
			});

			this.setState({leagues: popularLeagues})
		})

	// 	axios.all([this.getPopularLeagues(), this.getPopularPlayers(), this.getPopularTeams()])
	// 	.then(axios.spread( (leagues, players, teams) => {
	// 		var popularLeagues = [];
	// 		var popularPlayers = [];
	// 		var popularTeams = [];

	// 		console.log("Leagues: ", leagues);
	// 		console.log("Players: ", players);
	// 		console.log("Teams: ", teams);
			
	// 		leagues.data.data.forEach(league => {
	// 			var newItem = new HorizontalListItem({
	// 				header: league.name,
	// 				img: league.item_logo,
	// 				data: league
	// 			});
	// 			popularLeagues.push(newItem);
	// 		});

	// 		players.data.data.forEach(player => {
	// 			var newItem = new HorizontalListItem({
	// 				header: player.name,
	// 				img: player.image,
	// 				data: player
	// 			});
	// 			popularPlayers.push(newItem);
	// 		});

	// 		teams.data.data.forEach(team => {
	// 			var newItem = new HorizontalListItem({
	// 				header: team.name,
	// 				img: team.logo,
	// 				data: team
	// 			});
	// 			popularTeams.push(newItem)
	// 		})

	// 		this.setState({
	// 			leagues: popularLeagues,
	// 			players: popularPlayers,
	// 			teams: popularTeams
	// 		})

	// 	}));
	}

	getPopularLeagues = () => {
		return axios.get('http://localhost:4000/api/leagues');
	}

	getPopularPlayers = () => {
		return axios.get('http://localhost:4000/api/players', {
			params: {
				where: {"popular": true}
			}
		});
	}

	getPopularTeams = () => {
		return axios.get('http://localhost:4000/api/teams', {
			params: {
				where: {"popular": true}
			}
		})
	}
}

