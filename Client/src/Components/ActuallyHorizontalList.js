import React, {Component} from 'react';
import { Image, Header, List, Card, Segment } from 'semantic-ui-react';
import HorizontalListItem from './HorizontalListItem';
import './styles/HorizontalList.css';

export default class ActuallyHorizontalList extends Component{

  constructor(props){
    super(props);
  }

  render(){
    var header = "Popular " + this.props.itemType;
    return(
      <div className = "PlayerListView" style = {{width:"100%"}}>
        <Card style = {{disply: "flex", overflow: "auto", width : "100%", justifyContent: "center", flexWrap: "nowrap"}}>
              <Card.Content>
                <Card.Header>{this.props.itemType}</Card.Header>
                  <Card.Description>
                    <Segment style= {{whiteSpace: "nowrap",display: "flex", minWidth: "0", flexDirection: "column", flexWrap: "nowrap", overflowX: "auto", maxWidth: "100%"}}>
                    <List className = "ListContainer" horizontal >
                        {this.props.items.map((item) => <HorizontalListItem item = {item} onClickItem = {this.props.onClickItem}/>)}
                    </List>
                    </Segment>
                  </Card.Description>
            </Card.Content>
          </Card>
      </div>
      );
  }
}
 
