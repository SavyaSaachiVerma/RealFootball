import React, {Component} from 'react';
import { Image, Header, List } from 'semantic-ui-react'
import './styles/HorizontalList.css'

export default class HorizontalListItem extends Component{

  constructor(props){
    super(props);

    this.state = {
      img : "",
      header : "",
      content : "",
    }
  }

  render(){
    return(
        <List.Item className = "ListItem" data = {this.props.item.data} onClick = {this.props.onClickItem}>
          <Image className = "ListImage" src = {this.props.item.img}  />
          <List.Content className = "ListContent">
            <List.Header className = "ListHeader">{this.props.item.header}</List.Header>
            <div>
              <Header as='h5' className = 'Text'>{this.props.item.content}</Header>
            </div>
          </List.Content>
        </List.Item>
      );
  }
}
 
