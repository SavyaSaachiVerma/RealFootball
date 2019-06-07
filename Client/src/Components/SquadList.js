import React, {Component} from 'react';
import {Card, Table, Header, Image} from 'semantic-ui-react'
import './styles/SquadList.css';
import axios from 'axios';



export default class SquadList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playerShirtNumbers: [],
			playerNames: [],
		}
		//this.props.team
		//var searchProp = '{"club": "' + this.props.team.name + '"}'; 
		//axios call -> var url = 'http://localhost:4000/api/players/?where=' + searchProp;
		// player.shirtNumber, player.Name
	}
	componentWillMount(){
		var searchProp = '{"club":"' + this.props.team.name + '"}';
		var url = 'http://localhost:4000/api/players/?where=' + searchProp;
		axios.get(url)
		.then(res => {
			var data = res.data;
			var playerNames = [];
			var playerShirtNumbers = [];
			data.data.forEach(Player => {
				playerNames.push(Player.name);
				playerShirtNumbers.push(Player.shirtNumber);
			});
			this.setState({playerNames : playerNames, playerShirtNumbers: playerShirtNumbers});
		})
	}

	createData(){
		var data = [];
    	for(var i = 0; i < this.state.playerNames.length; i++){
        	data.push({name: this.state.playerNames[i], shirtNumber: this.state.playerShirtNumbers[i]})
    	} 
    	return data;
	}


	render() {
		var data = this.createData();
		return (
			<Card className= 'Squad'>
				<Card.Content className='head' >
      				<Card.Header >Squad</Card.Header>
    			</Card.Content>
				
				<Table basic='very'>
				    <Table.Header>
				      <Table.Row>
				        <Table.HeaderCell>Player</Table.HeaderCell>
				        <Table.HeaderCell>Shirt Number</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>

				    <Table.Body>
				      	{data.map((item) => 
				      		<Table.Row key = {item.shirtNumber}>
				      			<Table.Cell>{item.name}</Table.Cell>
				        		<Table.Cell textAlign = 'center'>{item.shirtNumber}</Table.Cell>
				      		</Table.Row>
				      	)}
				    </Table.Body>
				</Table>
			</Card>
			);
	}
}