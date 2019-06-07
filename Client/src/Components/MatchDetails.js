import React, {Component} from 'react';
import {Modal, Button, Table, Segment, Header, Image} from 'semantic-ui-react'
import './styles/MatchDetails.css';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

export default class MatchDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			matchStats: {
				"shots": {
					"home": "N/A",
					"away": "N/A"
				},
				"shotsOnTarget": {
					"home": "N/A",
					"away": "N/A"
				},
				"possession": {
					"home": "N/A",
					"away": "N/A"
				},
				"assists": {
					"home": "N/A",
					"away": "N/A"
				},
				"fouls": {
					"home": "N/A",
					"away": "N/A"
				},
				"yellowCards": {
					"home": "N/A",
					"away": "N/A"
				},
				"redCards": {
					"home": "N/A",
					"away": "N/A"
				},
				"corners": {
					"home": "N/A",
					"away": "N/A"
				}

			}
		}
	}

	render() {
		return (
			<Modal trigger={this.props.matchItem} onOpen = {this.getStats}>
			    <Modal.Header>{this.props.fixture.round}</Modal.Header>
			    <Modal.Content>
			    	<Segment vertical>
				    	<div className = 'info' style = {{display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end"}}>
							<Header className= 'infoitem' as = 'h3' style = {{marginRight: "1px"}}>{this.props.fixture.statusShort === 'FT' ? 'Full Time' : this.props.fixture.elapsed}</Header>
							{this.props.fixture.statusShort === 'FT' ? null : <LinearProgress textAlign = "right" style = {{width: '22px', marginTop: '-10px'}}/>}
				    	</div>
				    	<div className = 'score'>
				    		<div style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
						    	<Image wrapped circular size='small' src={this.props.homeTeam.logo} onError={i => i.target.src='https://cdn4.iconfinder.com/data/icons/soccer-american-football/100/f-01-512.png'} />
						    	<Header as = 'h1' content = {this.props.homeTeam.name}/>
						    </div>
						    <Header><h1>{this.props.fixture.goalsHomeTeam}</h1></Header>
						    <Header><h1>-</h1></Header>
						    <Header><h1>{this.props.fixture.goalsAwayTeam}</h1></Header>
						    <div style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
						    	<Image wrapped circular size='small' src={this.props.awayTeam.logo} onError={i => i.target.src='https://cdn4.iconfinder.com/data/icons/soccer-american-football/100/f-01-512.png'} />
						    	<Header as = 'h1' content = {this.props.awayTeam.name}/>
						    </div>
						</div>

					</Segment>
					<Segment vertical className = 'stats'>
						<Table basic='very' >
						    <Table.Header>
						      <Table.Row>
						        <Table.HeaderCell textAlign = 'right'></Table.HeaderCell>
						        <Table.HeaderCell textAlign = 'center'>TEAM STATS</Table.HeaderCell>
						    	<Table.HeaderCell textAlign = 'right'></Table.HeaderCell>

						      </Table.Row>
						    </Table.Header>

						    <Table.Body>
						      <Table.Row>
						        <Table.Cell textAlign = 'center'>{this.state.matchStats.shots.home}</Table.Cell>
						        <Table.Cell textAlign = 'center'>Shots</Table.Cell>
						        <Table.Cell textAlign = 'center'>{this.state.matchStats.shots.away}</Table.Cell>
						      </Table.Row>
						      <Table.Row>
						        <Table.Cell textAlign = 'center'>{this.state.matchStats.shotsOnTarget.home}</Table.Cell>
						        <Table.Cell textAlign = 'center'>Shots on Target</Table.Cell>
						        <Table.Cell textAlign = 'center'>{this.state.matchStats.shotsOnTarget.away}</Table.Cell>
						      </Table.Row>
						      <Table.Row>
						        <Table.Cell textAlign = 'center'>{this.state.matchStats.possession.home}</Table.Cell>
						        <Table.Cell textAlign = 'center'>Possession</Table.Cell>
						        <Table.Cell textAlign = 'center'>{this.state.matchStats.possession.away}</Table.Cell>
						      </Table.Row>
						      <Table.Row>
						        <Table.Cell textAlign = 'center'>{this.state.matchStats.assists.home}</Table.Cell>
						        <Table.Cell textAlign = 'center'>Assists</Table.Cell>
						        <Table.Cell textAlign = 'center'>{this.state.matchStats.assists.away}</Table.Cell>
						      </Table.Row>
						      <Table.Row>
						        <Table.Cell textAlign = 'center'>{this.state.matchStats.fouls.home}</Table.Cell>
						        <Table.Cell textAlign = 'center'>Fouls</Table.Cell>
						        <Table.Cell textAlign = 'center'>{this.state.matchStats.fouls.away}</Table.Cell>
						      </Table.Row>
						      <Table.Row>
						        <Table.Cell textAlign = 'center'>{this.state.matchStats.yellowCards.home}</Table.Cell>
						        <Table.Cell textAlign = 'center'>Yellow Cards</Table.Cell>
						        <Table.Cell textAlign = 'center'>{this.state.matchStats.yellowCards.away}</Table.Cell>
						      </Table.Row>
						      <Table.Row>
						        <Table.Cell textAlign = 'center'>{this.state.matchStats.redCards.home}</Table.Cell>
						        <Table.Cell textAlign = 'center'>Red Cards</Table.Cell>
						        <Table.Cell textAlign = 'center'>{this.state.matchStats.redCards.away}</Table.Cell>
						      </Table.Row>
						      <Table.Row>
						        <Table.Cell textAlign = 'center'>{this.state.matchStats.corners.home}</Table.Cell>
						        <Table.Cell textAlign = 'center'>Corners</Table.Cell>
						        <Table.Cell textAlign = 'center'>{this.state.matchStats.corners.away}</Table.Cell>
						      </Table.Row>
						      
						    </Table.Body>
						</Table>
					</Segment>
			    </Modal.Content>

			</Modal>
			);
	}

	getStats = () => {
			var url = "https://api-football-v1.p.rapidapi.com/statistics/fixture/" + this.props.fixture.fixture_id;
			console.log("URL: ", url);
			axios.get(url, {
					headers: {
						"X-RapidAPI-Key": "15c0436fecmsh032cdad591507d0p1bf266jsn658dec63d18d",
						"Accept": "application/json"
					}
				})
			.then(res => {
				if(res.data.api.results === 0) {
					return;
				}
				var stats = res.data.api.statistics;
				console.log(stats);
				var matchStats = {
				"shots": {
					"home": parseInt(stats["Shots on Goal"].home) + parseInt(stats["Shots off Goal"].home),
					"away": parseInt(stats["Shots on Goal"].away) + parseInt(stats["Shots off Goal"].away)
				},
				"shotsOnTarget": {
					"home": parseInt(stats["Shots on Goal"].home),
					"away": parseInt(stats["Shots on Goal"].away)
				},
				"possession": {
					"home": stats["Ball Possession"].home,
					"away": stats["Ball Possession"].away
				},
				"assists": {
					"home": stats["Assists"].home,
					"away": stats["Assists"].away
				},
				"fouls": {
					"home": stats["Fouls"].home,
					"away": stats["Fouls"].away
				},
				"yellowCards": {
					"home": stats["Yellow Cards"].home,
					"away": stats["Yellow Cards"].away
				},
				"redCards": {
					"home": stats["Red Cards"].home,
					"away": stats["Red Cards"].away
				},
				"corners": {
					"home": stats["Corner Kicks"].home,
					"away": stats["Corner Kicks"].away
				}

			}
			this.setState({matchStats: matchStats});
			})

	}
}