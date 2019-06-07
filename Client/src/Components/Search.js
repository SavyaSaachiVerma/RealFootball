import React, {Component} from 'react';
import {Input, Button} from 'semantic-ui-react';
import './styles/Search.css'

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
		this.searchText = '';
	}
	render() {
		return (
			<div className = 'SearchContainer'>
				<Input className = 'Search' action = {<Button icon='search' onClick={this.onClick} />} placeholder = 'Search...' onChange = {this.onChange} onKeyPress={event => {
                																																				if (event.key === 'Enter') {
                  																																							this.props.onClick(this.searchText);
                																																				}
              	}}/>
			</div>
			);
	}

	onChange(e, d) {
		this.searchText = e.target.value;
	}

	onClick(e, d) {
		this.props.onClick(this.searchText);
	}
}
