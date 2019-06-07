import React, {Component} from 'react';
import {Card, Table, Header, Image} from 'semantic-ui-react'
import './styles/LeagueTable.css';
import axios from 'axios';


export default class LeagueTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			logo: "",
			clubs: [],
			matchesPlayed: [],
			won: [],
			draw: [],
			loss: [],
			gf: [],
			ga: [],
			gd: [],
			pts: [],
		}
	}

	componentDidMount(){
		var team = this.props.team;
		var clubs= [];
		var matchesPlayed= [];
		var won= [];
		var draw= [];
		var loss= [];
		var gf=[];
		var ga= [];
		var gd= [];
		var pts= [];
		console.log(team.league_id);
		var league_id = team.league_id;
		var url = "https://api-football-v1.p.rapidapi.com/leagueTable/" + league_id;
		axios.get(url, {
			headers:{
                "X-RapidAPI-Key":"15c0436fecmsh032cdad591507d0p1bf266jsn658dec63d18d",
                "Accept":"application/json"
              }
		}).then(res => {
			var standings = res.data.api.standings[0];
			standings.forEach(team => {
				clubs.push(team.teamName);
				matchesPlayed.push(team.matchsPlayed);
				won.push(team.win);
				draw.push(team.draw);
				loss.push(team.lose);
				gf.push(team.goalsFor);
				ga.push(team.goalsAgainst);
				gd.push(team.goalsDiff);
				pts.push(team.points);

			});

		})
		.then(() => {
			var searchProp = '{"id":"' + this.props.team.league_id + '"}';
			var url = 'http://localhost:4000/api/leagues/?where=' + searchProp;
			axios.get(url)
			.then(res => {
				this.setState({logo: res.data.data[0].logo, clubs:clubs, matchesPlayed:matchesPlayed, won:won, draw:draw, loss:loss, gf:gf, ga:ga, gd:gd, pts:pts})
			})
		})
	}

	createData(){
		var data = [];
    	for(var i = 0; i < this.state.clubs.length; i++){
        	data.push({club: this.state.clubs[i], matchesPlayed: this.state.matchesPlayed[i], won: this.state.won[i], 
        		draw: this.state.draw[i], loss: this.state.loss[i], gf: this.state.gf[i], ga: this.state.ga[i], 
        		gd: this.state.gd[i], pts: this.state.pts[i]});
    	} 
    	return data;
	}

	render() {
		var data = this.createData();
		return (
			<Card className= 'LeagueTable'>

				<Image className = 'LeagueLogo' src = {this.state.logo}/>
				<Table basic='very'>
				    <Table.Header>
				      <Table.Row>
				        <Table.HeaderCell>Club</Table.HeaderCell>
				        <Table.HeaderCell>MP</Table.HeaderCell>
				        <Table.HeaderCell>W</Table.HeaderCell>
				        <Table.HeaderCell>D</Table.HeaderCell>
				        <Table.HeaderCell>L</Table.HeaderCell>
				        <Table.HeaderCell>GF</Table.HeaderCell>
				        <Table.HeaderCell>GA</Table.HeaderCell>
				        <Table.HeaderCell>GD</Table.HeaderCell>
				        <Table.HeaderCell>Pts</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>

				    <Table.Body>
				      	{data.map((item) => {
				      		var highlight = false;
				      		var onTeamClick = (item) => {
				      			// console.log(this.props.showPage);
				      				// this.props.showPage(1, item)
				      		}
				      		if(item.club === this.props.team.name) {
				      			highlight = true;
				      			onTeamClick = (item) => {
				      			}
				      		}
				      		return (
				      		<Table.Row onClick = {onTeamClick.bind(this, item)} active = {highlight} key = {item.club} team = {item}>
					        	<Table.Cell >{item.club}</Table.Cell>
						        <Table.Cell>{item.matchesPlayed}</Table.Cell>
						        <Table.Cell>{item.won}</Table.Cell>
						        <Table.Cell>{item.draw}</Table.Cell>
						        <Table.Cell>{item.loss}</Table.Cell>
						        <Table.Cell>{item.gf}</Table.Cell>
						        <Table.Cell>{item.ga}</Table.Cell>
						        <Table.Cell>{item.gd}</Table.Cell>
						        <Table.Cell>{item.pts}</Table.Cell>
				      		</Table.Row>
				      		);
				      		})
				  		}
				    </Table.Body>
				</Table>
				
			</Card>
			);
	}
}