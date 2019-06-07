import React,{Component} from 'react'
import { Grid,Header, Segment, Image, Card} from 'semantic-ui-react'
import './styles/Grid.css'
import MatchDetails from './MatchDetails';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';


export default class MatchItem extends Component{

  constructor(props){
    super(props);
    this.state ={
      team1Logo : "",
      team2Logo : "",
      team1Score : "",
      team2Score : "",
      time : "",
      league: "", 

    }
  }

  render(){
    var item = <Grid.Column style={{width:"50%"}} >
        <Card style = {{width:"100%"}}>
          <Card.Content>
            <Card.Header>{this.props.fixture.round}</Card.Header>
            <div style = {{display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end"}}>
              <Card.Header textAlign = "right">{this.props.fixture.statusShort === 'FT' ? 'Full Time' : this.props.fixture.elapsed}</Card.Header>
              <LinearProgress textAlign = "right" style = {{width: '18px', marginBottom: '10px'}}/>
            </div>
            <Card.Description>
              <Segment style= {{display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                <div style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <Image className="TeamImage" src={this.props.homeTeam.logo} onError={i => i.target.src='https://cdn4.iconfinder.com/data/icons/soccer-american-football/100/f-01-512.png'} />
                  <Header as = 'h4' content = {this.props.homeTeam.name} style = {{marginLeft: "5px", marginTop: "-5px"}}/>
                </div>
                <Header >{this.props.fixture.goalsHomeTeam}</Header>
                <Header > - </Header>
                <Header >{this.props.fixture.goalsAwayTeam}</Header>
                <div style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <Image className="TeamImage" src={this.props.awayTeam.logo} onError={i => i.target.src='https://cdn4.iconfinder.com/data/icons/soccer-american-football/100/f-01-512.png'} />
                  <Header as = 'h4' content = {this.props.awayTeam.name} style = {{marginLeft: "5px", marginTop: "-5px"}}/>
                </div>
              </Segment>
            </Card.Description>
          </Card.Content>
        </Card>
      </Grid.Column>
    return(
          <MatchDetails matchItem = {item} fixture = {this.props.fixture} homeTeam = {this.props.homeTeam} awayTeam = {this.props.awayTeam}/>
          );

  }
    
}

