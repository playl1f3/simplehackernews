import React, { Component } from 'react';
import axios from 'axios';
import { Panel, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NewsItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      NewsDetails: {
        kids: []
      }
    }
    console.log("hello")
    this.getNewsData("asdf")
  }
  componentWillReceiveProps(nextProps) {
    // console.log("receive props")
    if (nextProps.buttonClick === 'refreshNews') {
      console.log('update news item')
      this.getNewsData("asdf")
    }
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   if(this.props.NewsId !== nextProps){
  //     console.log("should update")
  //     return true
  //   }
  //   else{
  //     return false
  //   }
  // }
  // componentWillUpdate(){
  //   console.log("will update")
  // }
  getNewsData(newsId) {
    console.log("data")
    var _this = this;
    var url = 'https://hacker-news.firebaseio.com/v0/item/' + this.props.NewsId + '.json';
    console.log(url);
    axios({
      method: 'get',
      url: url,
      responseType: 'json'
    })
      .then(function (response) {
        console.log("got data")
        console.log(response.data);
        _this.setState({ NewsDetails: response.data })
      });
  }
  // handleClick(e){
  //   e.preventDefault();
  //   // console.log(this.props.NewsId);
  //   this.props.selectNewsItem;

  // }

  render() {
    const { title, url, descendants, by } = this.state.NewsDetails
    return (
      <Panel key={this.props.key}>
        {/* {this.props.NewsId} */}
        {/* <p><b>{title}{url}</b></p>  */}
        <a href={url}><b>{title}</b></a>
        {/* <p> <Badge value={this.props.newsId} onClick={this.props.selectNewsItem}>{descendants}</Badge></p>  */}
        {/* <p><Link to={`comments/${this.props.NewsId}`}>{descendants} Commments</Link></p>   */}
        <p>{by} <a href='#' onClick={this.props.selectNewsItem}>{descendants} Commments</a></p>
      </Panel>
    );
  }
}

export default NewsItem;