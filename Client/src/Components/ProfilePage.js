import React, {Component} from 'react';
import './styles/HomePage.css';
import LiveScoresHP from './LiveScoresHP';
import MatchItem from './MatchItem';
import ActuallyHorizontalList from './ActuallyHorizontalList';
import HorizontalListItem from '../models/HorizontalListItem';
import UserInfo from './UserInfo';
import axios from 'axios';


export default class ProfilePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			leagues: [],
			players: [],
			teams: []
		}
		console.log(this.props.user.leagues);
	}

	render(){
		return(
			<div className = "MainContainer" style = {{display: "flex", flexDirection: "column", justifyConent: "space-between"}}>
				<UserInfo user = {this.props.user}/>
				<ActuallyHorizontalList items = {this.state.players} itemType = "Favourite Players" onClickItem = {this.onClickPlayer}/>
				<ActuallyHorizontalList items = {this.state.teams} itemType = "Favourite Teams" onClickItem = {this.onClickTeam}/>			
				<ActuallyHorizontalList items = {this.state.leagues} itemType = "Favourite Leagues" onClickItem = {this.onClickLeague}/>
			</div>
		);
	}

	onClickPlayer = (e,d) => {
		this.props.showPage(2, d.data);
	}

	onClickTeam = (e,d) => {
		this.props.showPage(1, d.data);
	}

	onClickLeague = (e,d) => {
		console.log(d.data);
		this.props.showPage(0, d.data);
	}

	componentDidMount() {
		var favouritePlayers = [];
		var favouriteTeams = [];
		var favouriteLeagues = [];

		var teamPromises = [];
		this.props.user.teams.forEach(team_id => {
			var url = 'http://localhost:4000/api/teams/' + team_id;
			teamPromises.push(axios.get(url));
		});

		var leaguePromises = [];
		this.props.user.leagues.forEach(id => {
			var url = 'http://localhost:4000/api/leagues/' + id;
			leaguePromises.push(axios.get(url));
		});

		var playerPromises = [];
		this.props.user.players.forEach(id => {
			var url = 'http://localhost:4000/api/players/' + id;
			playerPromises.push(axios.get(url));
		})

		axios.all(teamPromises)
		.then(res => {
			res.forEach(teamResult => {
				var team = teamResult.data.data;
				var newItem = new HorizontalListItem({
					header: team.name,
					img: team.logo,
					data: team
				});
				favouriteTeams.push(newItem)
			});

			axios.all(playerPromises)
			.then(res => {
				res.forEach(playerResult => {
					var player = playerResult.data.data;
					var newItem = new HorizontalListItem({
						header: player.name,
						img: player.image,
						data: player
					});
					favouritePlayers.push(newItem);
				});

				axios.all(leaguePromises)
				.then(res => {
					console.log("Leagues: ", res);
					res.forEach(leagueResult => {
						var league = leagueResult.data.data;
						console.log(league);
						var newItem = new HorizontalListItem({
							header: league.name,
							img: league.item_logo,
							data: league
						});
						favouriteLeagues.push(newItem);
					})

					this.setState({teams: favouriteTeams, players: favouritePlayers, leagues: favouriteLeagues});
				});

			});

		});

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

	getFavouriteLeagues = () => {
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

