import React, {Component} from 'react';
import {Button, Image, Card, Header, Icon} from 'semantic-ui-react'
import './styles/SearchItem.css';
import TopScorers from './TopScorers';
export default class PlayerSearchItem extends Component {
	constructor(props) {
		super(props);
		this.starPlayer = this.starPlayer.bind(this);
		this.state = {
			iconName: "star outline",
			isFavourite: false
		}
	}

	render() {
		
		var player = this.props.Player;
		return (
			<Card className = "PlayerSearchCard">
				<Card.Content id = "CardContent">
					<Image circular size = "tiny" src = {this.props.Player.image}/>
					<Header as='h2' className = "PlayerSearchName" content = {this.props.Player.name} textAlign = 'center'/>
					{ this.props.user !== null ? <Icon name= {this.state.iconName} color = "yellow" id = "Star" size = "large" onClick = {this.starPlayer}/> : null}

				</Card.Content>
			</Card>
			);
	}

	starPlayer(e) {
		e.stopPropagation();
		var players = this.props.user.players;
		var iconName = "star outline"
		var favourite = false;
		if(!this.state.isFavourite) {
			// Add it to favourites
			players.push(this.props.Player.id);
			iconName = "star"
			favourite = true;
		}
		else {
			var index = players.indexOf(this.props.Player.id);
			if(index !== -1) {
				players.splice(index, 1);
			}
		}
		this.props.updateFavourites(players, null, null);
		this.setState({iconName: iconName, isFavourite: favourite});

	}

	componentDidMount() {
		if(this.props.user !== null) {
			if(this.props.user.players.indexOf(this.props.Player.id) !== -1) {
				// Team is users favourite
				this.setState({iconName : "star", isFavourite : true});
			}
		}
	}
}