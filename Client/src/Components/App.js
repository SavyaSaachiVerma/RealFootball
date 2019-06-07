import React, { Component } from 'react';
import './styles/App.css';
import AppHeader from './AppHeader';
import MainLayout from './MainLayout';
import AppFooter from './AppFooter'
// import TeamInfo from './TeamInfo';
// import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  constructor() {
  	super();
  	this.state = {
  		pageToShow: 10,
  		dataToShow: null, 
      user: null
  	}
  	this.showPage = this.showPage.bind(this);
  }

  render() {
    return (
      <div className="Container">
        <AppHeader onClick = {this.showPage} user = {this.state.user} pageToShow = {this.state.pageToShow}/>
           <MainLayout showPage = {this.showPage} pageToShow = {this.state.pageToShow} dataToShow = {this.state.dataToShow} saveUserState = {this.saveUserState} user = {this.state.user}/> 
        <AppFooter/>
      </div>
    );
  }

  showPage(n, data) {
    console.log("Showing Page ", n);
  	this.setState({pageToShow: n, dataToShow: data});
            // <MainLayout showPage = {this.showPage} pageToShow = {this.state.pageToShow} dataToShow = {this.state.dataToShow}/> 

  }

  saveUserState = (user) => {
    console.log("Save User Called");
    this.setState({user: user, pageToShow: 8});
  }

}

export default App;
