import React, {Component} from 'react';
import {Card, Header, Image, Icon} from 'semantic-ui-react'
import './styles/PlayerDetails.css';

export default class PlayerDetails extends Component {
	constructor(props) {
		super(props);
		console.log("PlayerToShow: ", this.props.playerToShow);
		this.starPlayer = this.starPlayer.bind(this);
		this.state = {
			iconName: "star outline",
			isFavourite: false
		}
	}

	render() {
		if(this.props.playerToShow != null) {
			if(this.props.playerToShow != -1) {
				var dob = "Date of Birth: " + this.props.playerToShow.dateOfBirth;
				var nationality = "Nationality: " + this.props.playerToShow.nationality;
				var position = "Position: " + this.props.playerToShow.position;
				var shirtNumber = "Shirt Number: " + this.props.playerToShow.shirtNumber;
				var image = this.props.playerToShow.image;
				var name = this.props.playerToShow.name;
				var club = "Club: " + this.props.playerToShow.club;

				return (
					<Card className = "CardBackground">
						<Image className = 'PlayerImage' size = 'small' src = {image} />
						<div className = "PlayerText">
							<Header as='h2' className = 'Text' id = "PlayerName" content= {name}/>
							<div className = "PlayerDetails">
								<Header as='h5' className = 'Text' content = {dob}/>
								<Header as='h5' className = 'Text' content = {nationality}/>
								<Header as='h5' className = 'Text' content = {position}/>
								<Header as='h5' className = 'Text' content = {shirtNumber}/>
								<Header as='h5' className = 'Text' content = {club}/>
							</div>
						</div>
						{ this.props.user !== null ? <Icon name= {this.state.iconName} color = "yellow" id = "Star" size = "large" onClick = {this.starPlayer}/> : null}

					</Card>
					);
			}
			else {
				//No Results Found
				return (
					<Header as = 'h1' content = "No Results Found"/>
					);
			}	
			
		}
		else {
			return (
			<div/>)
		}
	}

	starPlayer(e) {
		e.stopPropagation();
		var players = this.props.user.players;
		var iconName = "star outline"
		var favourite = false;
		if(!this.state.isFavourite) {
			// Add it to favourites
			players.push(this.props.playerToShow._id);
			iconName = "star"
			favourite = true;
		}
		else {
			var index = players.indexOf(this.props.playerToShow._id);
			if(index !== -1) {
				players.splice(index, 1);
			}
		}
		this.props.updateFavourites(players, null, null);
		this.setState({iconName: iconName, isFavourite: favourite});
	}

	componentDidMount() {
		if(this.props.user !== null && this.props.playerToShow !== undefined) {
			if(this.props.user.players.indexOf(this.props.playerToShow._id) !== -1) {
				// Team is users favourite
				this.setState({iconName : "star", isFavourite : true});
			}
		}
	}
}