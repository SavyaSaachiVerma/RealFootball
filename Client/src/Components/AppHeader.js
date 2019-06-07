import React, {Component} from 'react';
import {Button, Image} from 'semantic-ui-react';
import Search from './Search';
import './styles/AppHeader.scss';
import logo from './../assets/Logo.png';

export default class AppHeader extends Component {
	constructor(props) {
		super(props);
		this.clickHeaderButton = this.clickHeaderButton.bind(this);
	}

	render() {



		var finalButton = <Button className = "HeaderButton" id = "FinalButton" active= {this.props.pageToShow === 6 ? true : false} inverted content='SIGN IN' onClick = {() => this.props.onClick(6)}/>
;
		if(this.props.user !== null) {
			finalButton = <div className = 'ProfileButton'>
					<Image circular size = 'mini' src = {this.props.user.picture} bordered onClick = {() => this.props.onClick(8)}/>
				</div>
		}
		return (
			<div className = "AppHeader">
				<Button className = "HeaderButton" inverted active= {this.props.pageToShow === 7 ? true : false} content='LEAGUES' onClick = {() => this.props.onClick(7)}/>
				<Button className = "HeaderButton" inverted active= {this.props.pageToShow === 5 || this.props.pageToShow === 1 ? true : false} content='TEAMS' onClick = {() => this.props.onClick(1)}/>
				<Button className = "HeaderButton" inverted active= {this.props.pageToShow === 2 || this.props.pageToShow === 4 ? true : false} content='PLAYERS' onClick = {() => this.props.onClick(2)}/>
				{finalButton}
				<Image className = "logo" src = {logo} onClick = {() => this.props.onClick(10)}/>				
			</div>
			);
	}

	clickHeaderButton(n) {
		this.props.onClick(n, null);
	}
}