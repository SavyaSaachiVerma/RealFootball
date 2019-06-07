import React, {Component} from 'react';
import MatchItem from './MatchItem';
import { Grid, Segment, Image, Card, Header, List } from 'semantic-ui-react'
import axios from 'axios';

export default class PlayerList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			matches: [],
			teamLogo: {}
		}
	}

	render(){
		var matchData = <Header as = 'h3'>No Matches going on right now</Header>
		if(this.state.matches.length > 0) {
			matchData = <Grid columns={2} divided style={{width:"100%"}}>
      		<Grid.Row style={{width:"100%"}}>
      			{this.state.matches.map((item) => <MatchItem homeTeam = {this.state.teamLogo[item.homeTeam_id]} awayTeam = {this.state.teamLogo[item.awayTeam_id]} fixture = {item} time= {item.time}/> )}
      		</Grid.Row>
  			</Grid>	
		}
		return (
				<Card style = {{display: "flex", width : "100%", alignItems: "center", flexWrap: "nowrap"}}>
					<Header as = 'h1' style = {{marginTop: "10px", marginBottom: "10px"}}>Live Matches</Header>
					{matchData}
				</Card>
				);
	}

	componentDidMount() {
		this.updateLiveMatches();
		setInterval(this.updateLiveMatches, 60000);

	}

	updateLiveMatches = () => {
		axios.get("https://api-football-v1.p.rapidapi.com/fixtures/live", {
			headers: {
				"X-RapidAPI-Key": "15c0436fecmsh032cdad591507d0p1bf266jsn658dec63d18d",
				"Accept": "application/json"
			}
		})
		.then(res => {
			var matches = [];
			var teamIDs = [];
			// var match = {"fixture_id": "78028",
			// 	        "event_timestamp": "1534187700",
			// 	        "event_date": "2018-08-13T19:15:00+00:00",
			// 	        "league_id": "11",
			// 	        "round": "Primeira Liga - 1",
			// 	        "homeTeam_id": "49",
			// 	        "awayTeam_id": "41",
			// 	        "homeTeam": "Portimonense",
			// 	        "awayTeam": "Boavista",
			// 	        "status": "Match Finished",
			// 	        "statusShort": "FT",
			// 	        "goalsHomeTeam": "2",
			// 	        "goalsAwayTeam": "0",
			// 	        "halftime_score": "0 - 0",
			// 	        "final_score": "2 - 0",
			// 	        "penalty": null,
			// 	        "elapsed": "94",
			// 	        "firstHalfStart": "1534187760",
			// 	        "secondHalfStart": "1534191480"
			// 		};
			// teamIDs.push("49");
			// teamIDs.push("41");
			// matches.push(match);
			// console.log("Live Matches: ", res.data.api.fixtures);
			Object.entries(res.data.api.fixtures).forEach(([key, value]) => {
			   //use value for data
			   matches.push(value);
			   if(this.state.teamLogo[value.homeTeam_id] === undefined) {
			   		teamIDs.push(value.homeTeam_id);
			   }
			   if(this.state.teamLogo[value.awayTeam_id] === undefined) {
			   		teamIDs.push(value.awayTeam_id);
			   }
			   
			});
			this.getTeamData(teamIDs, matches);
		})
		.catch(error => {
			console.log("Error: ", error);
		})
	}

	getTeamData = (teamIDs, matches) => {
		var promises = [];
		teamIDs.forEach(team => {
			var url = 'https://api-football-v1.p.rapidapi.com/teams/team/' + team;
			promises.push(axios.get(url, {
				headers: {
					"X-RapidAPI-Key": "15c0436fecmsh032cdad591507d0p1bf266jsn658dec63d18d",
					"Accept": "application/json"
				}
			}))
		})

		if(promises.length === 0) {
			this.setState({matches: matches});
			return;
		}
		axios.all(promises)
		.then(teamResults => {
			var teamLogo = {}
			teamResults.map(team => {
				// console.log("TEAM: ", team.data.api.teams);
				Object.entries(team.data.api.teams).forEach(([key, value]) => {
					team = value
				})
				teamLogo[team.team_id] = team;
				// console.log("Team Data: ", team);
			})
			// console.log("TEAM LOGO: ", teamLogo);
			teamLogo = Object.assign({}, teamLogo, this.state.teamLogo);
			this.setState({matches: matches, teamLogo: teamLogo});
		}) 
	}
}
