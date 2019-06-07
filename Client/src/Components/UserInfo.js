import React, {Component} from 'react';
import {Header, Card} from 'semantic-ui-react'
import './styles/HomePage.css';
import LiveScoresHP from './LiveScoresHP';
import MatchItem from './MatchItem';
import ActuallyHorizontalList from './ActuallyHorizontalList';
import HorizontalListItem from '../models/HorizontalListItem';
import axios from 'axios';


export default class UserInfo extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		console.log("USER: ", this.props.user);
		return(
			<Card style = {{display: "flex", overflow: "auto", width : "100%", justifyContent: "center", alignItems: "center", flexWrap: "nowrap"}}>
				<Header as = 'h1' content = {this.props.user.name} style = {{padding: "10px"}} />
				<Header as = 'h3' content = {this.props.user.email} style = {{padding: "10px"}} />
			</Card>
		);
	}
}