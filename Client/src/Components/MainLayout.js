import React, {Component} from 'react';
import {Button, Image} from 'semantic-ui-react'
import './styles/MainLayout.css';
import PlayerDetails from './PlayerDetails';
import LeagueDetailsPage from './LeagueDetailsPage';
import LeaguesMainPage from './LeaguesMainPage';
import MatchDetails from './MatchDetails';
import TeamDetailsPage from './TeamDetailsPage'
import TeamInfo from './TeamInfo';
import TeamSearchItem from './TeamSearchItem';
import TeamSearchPage from './TeamSearchPage';
import PlayerInfo from './PlayerInfo';
import PlayerSearchItem from './PlayerSearchItem';
import PlayerSearchPage from './PlayerSearchPage';
import ProfilePage from './ProfilePage';
import Search from './Search';
import axios from 'axios';
import Player from '../models/Player';
import User from '../models/User';
import Team from '../models/Team';
import HomePage from './HomePage'
import SignInPage from './SignInPage'

export default class MainLayout extends Component {
	constructor(props) {
		super(props);
		this.searchPlayer = this.searchPlayer.bind(this);
		this.searchTeam = this.searchTeam.bind(this);
		this.state = {
			searchedPlayers: []
		}
	}


	render() {

		if(this.props.pageToShow == 1) {
			return (
			<div className = "MainLayout">
				<TeamInfo searchTeam = {this.searchTeam} user = {this.props.user} teamToShow = {this.props.dataToShow} showPage = {this.props.showPage} updateFavourites = {this.updateFavourites}/>			

			</div>
			);
		}
		else if(this.props.pageToShow === 0) {
			return (
			<div className = "MainLayout">
				<LeagueDetailsPage leagueToShow = {this.props.dataToShow} showPage = {this.props.showPage} user = {this.props.user} updateFavourites = {this.updateFavourites}/>
			</div>
			);
		}
		else if(this.props.pageToShow == 2) {
			return (
			<div className = "MainLayout">
				<PlayerInfo searchPlayer = {this.searchPlayer} playerToShow = {this.props.dataToShow} showPage = {this.props.showPage} user = {this.props.user} updateFavourites = {this.updateFavourites}/>			
			</div>
			);
		}
		else if(this.props.pageToShow === 4) {
			return (
			<div className = "MainLayout">
				<PlayerSearchPage showPage = {this.props.showPage} players = {this.props.dataToShow} user = {this.props.user} updateFavourites = {this.updateFavourites}/>
			</div>
			);
		}
		else if(this.props.pageToShow === 5) {
			return (
			<div className = "MainLayout">
				<TeamSearchPage showPage = {this.props.showPage} teams = {this.props.dataToShow} user = {this.props.user} updateFavourites = {this.updateFavourites}/>
			</div>
			);
		}
		else if(this.props.pageToShow === 6) {
			return (
			<div className = "MainLayout">
				<SignInPage saveUserState = {this.props.saveUserState}/>
			</div>
			);
		}
		else if(this.props.pageToShow === 7) {
			return (
			<div className = "MainLayout">
				<LeaguesMainPage showPage = {this.props.showPage} pageToShow = {this.props.pageToShow} user = {this.props.user} updateFavourites = {this.updateFavourites}/>
			</div>
			);
		}
		else if(this.props.pageToShow === 8) {
			return (
			<div className = "MainLayout">
				<ProfilePage showPage = {this.props.showPage} pageToShow = {this.props.pageToShow} user = {this.props.user} updateFavourites = {this.updateFavourites}/>
			</div>
			)
		}
		else {
			return (
			<div className = "MainLayout">
				<HomePage showPage = {this.props.showPage}/>			

			</div>
			);
		}
		
	}

	searchPlayer(searchQuery) {
		var url = 'http://localhost:4000/api/players/?name=' + searchQuery;
		// console.log(url);
		axios.get(url)
		.then(res => {
			var resultingPlayers = [];
			if(res.data.data.length === 0) {
				this.props.showPage(2, -1);
				return;
			}
			res.data.data.forEach(player => {
				var player = {
					dateOfBirth: player.dateOfBirth,
					nationality: player.nationality,
					position: player.position,
					shirtNumber: player.shirtNumber,
					image: player.image,
					id: player._id,
					club: player.club,
					name: player.name
				}
				var newPlayer = new Player(player);
				resultingPlayers.push(newPlayer);
			});
		console.log(resultingPlayers);
		// this.setState({searchedPlayers: resultingPlayers});
		this.props.showPage(4, resultingPlayers);
		})
		.catch(err => {
			//Display no results found page
			this.props.showPage(2, -1);
		});
	}

	searchTeam(searchQuery) {
		console.log("Here");
		var url = 'http://localhost:4000/api/teams/?name=' + searchQuery;
		axios.get(url)
		.then(res => {
			var resultingTeams = [];
			if(res.data.data.length === 0) {
				this.props.showPage(1, -1);
				return;
			}
			res.data.data.forEach(team => {
				var team = {
					team_id: team.team_id,
					name: team.name,
					code: team.code,
					logo: team.logo,
					league_id: team.league_id
				}
				var newTeam = new Team(team);
				resultingTeams.push(newTeam);
			});
		console.log(resultingTeams);
		// this.setState({searchedPlayers: resultingPlayers});
		this.props.showPage(5, resultingTeams);
		})
		.catch(err => {
			//Display no results found page
			this.props.showPage(1, -1);
		});
	}

	updateFavourites = (players, teams, leagues) => {
		var url = 'http://localhost:4000/api/users/' + this.props.user.userID;

		players = players || this.props.user.players;
		teams = teams || this.props.user.teams;
		leagues = leagues || this.props.user.leagues;

		axios.put(url, {
			teams: teams,
			players: players,
			leagues: leagues
		})
		.then(res => {
			console.log("Returned User: ", res);
			var userData = res.data.data;
			var user = new User({
				userID: userData.userID,
				name: userData.name,
				picture: userData.picture,
				teams: userData.teams,
				players: userData.players,
				leagues: userData.leagues
			});

		this.props.saveUserState(user);
		});
	}
}