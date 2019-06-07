import React, {Component} from 'react';
import {Card, Image, Header} from 'semantic-ui-react';
import Search from './Search';
import './styles/SignInPage.css';
import logo from './../assets/Logo.png';
import FacebookLogin from 'react-facebook-login';
import User from '../models/User';
import axios from 'axios';

export default class SignInPage extends Component {
	constructor(props) {
		super(props);
		this.clickHeaderButton = this.clickHeaderButton.bind(this);
		this.componentClicked = this.componentClicked.bind(this);
	}

	componentClicked = () => {
		console.log("Clicked");
	}

	responseFacebook = response => {
		if(response.userID !== undefined) {
			// Login successful
			// Check if user exists in database
			console.log("Sign In: ", response);
			axios.get("http://localhost:4000/api/users/" + response.userID)
			.then(res => {
				console.log("From Database: ", res);
				this.userLoggedIn(res.data.data);
			})
			.catch(error => {
				// User doesn't exist
				// Add the user and perform and do the same things as above
				console.log("Error: ", error);
				axios.post("http://localhost:4000/api/users", {
					userID: response.userID,
					name: response.name,
					picture: response.picture.data.url,
					email: response.email
				})
				.then(res_2 => {
					this.userLoggedIn(res_2.data.data)
				})

			})
			// Change "Sign In" to "Favourites"
		}
	}

	render() {
		let fbContent = (<FacebookLogin
			    appId="1271073469728050"
			    autoLoad={true}
			    fields="name,email,picture"
			    onClick={this.componentClicked}
			    callback={this.responseFacebook} 
			    icon="fa-facebook"/>)



		return (
				<div className= 'SignInPage'>
					<Card className= 'SignInCard'>
						<Card.Content>
							<br/><br/>
							{fbContent}
						</Card.Content>
					</Card>
				</div>
			);
	}

	userLoggedIn = userData => {
		var user = new User({
			userID: userData.userID,
			name: userData.name,
			email: userData.email,
			picture: userData.picture,
			teams: userData.teams,
			players: userData.players,
			leagues: userData.leagues
		});

		this.props.saveUserState(user);
	}

	clickHeaderButton(n) {
		this.props.onClick(n, null);
	}
}