import React, {Component} from 'react';
import {Card, Table, Header, Image} from 'semantic-ui-react'
import './styles/TopScorers.css';

export default class TopScorers extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card className= 'TopScorers'>
				<Card.Content className='head' >
      				<Card.Header >Top Scorers</Card.Header>
    			</Card.Content>
				
				<Table basic='very'>
				    <Table.Header>
				      <Table.Row>
				        <Table.HeaderCell>Player</Table.HeaderCell>
				        <Table.HeaderCell>Goals</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>

				    <Table.Body>
				      <Table.Row>
				        <Table.Cell>1. Mohammed Salah</Table.Cell>
				        <Table.Cell>25</Table.Cell>
				      </Table.Row>
				      <Table.Row>
				        <Table.Cell>2. Sergio Aguero</Table.Cell>
				        <Table.Cell>23</Table.Cell>
				      </Table.Row>
				      <Table.Row>
				        <Table.Cell>3. Eden Hazard</Table.Cell>
				        <Table.Cell>19</Table.Cell>
				      </Table.Row>
				    </Table.Body>
				</Table>
				
			</Card>
			);
	}
}