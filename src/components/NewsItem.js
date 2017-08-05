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
    this.getNewsData()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.buttonClick === 'refreshNews') {
      this.getNewsData()
    }
  }
  getNewsData() {
    var _this = this;
    var url = 'https://hacker-news.firebaseio.com/v0/item/' + this.props.NewsId + '.json';
    axios({
      method: 'get',
      url: url,
      responseType: 'json'
    })
      .then(function (response) {
        _this.setState({ NewsDetails: response.data })
      });
  }
  render() {
    const { title, url, descendants, by } = this.state.NewsDetails
    return (
      <Panel key={this.props.key}>
        <a href={url}><b>{title}</b></a>
        {/* <p> <Badge value={this.props.newsId} onClick={this.props.selectNewsItem}>{descendants}</Badge></p>  */}
        {/* <p><Link to={`comments/${this.props.NewsId}`}>{descendants} Commments</Link></p>   */}
        <p>{by} <a href='#' onClick={this.props.selectNewsItem}>{descendants} Commments</a></p>
      </Panel>
    );
  }
}

export default NewsItem;