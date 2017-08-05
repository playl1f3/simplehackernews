import React, { Component } from 'react';
import axios from 'axios';
import NewsItem from '../components/NewsItem';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import CommentsContainer from './CommentsContainer';

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      topStories: [],
      selectedNews: '',
      buttonClick: '',
      newsItemCount: 10,
      status: 'loading'
    }
  }
  componentWillMount() {
    this.getLatestNews()
  }
  handleSelectNewsItem(newsId, ev) {
    ev.preventDefault()
    this.setState({
      selectedNews: newsId,
      buttonClick: 'selectedNews'
    })
  }
  getLatestNews() {
    var _this = this;
    axios({
      method: 'get',
      url: 'https://hacker-news.firebaseio.com/v0/topstories.json',
      responseType: 'json'
    })
      .then(function (response) {
        _this.setState({
          topStories: response.data,
          newsItemCount: 10,
          status: "done",
          buttonClick: ''
        })
      });
  }
  refresh = (event) => {
    event.preventDefault()
    this.getLatestNews()
    this.setState({
      buttonClick: 'refreshNews',
      newsItemCount: 10,
      status: 'loading'
    })
  }
  handleNextTenLoad = (event) => {
    event.preventDefault()
    this.setState((prevState) => ({
      newsItemCount: prevState.newsItemCount + 10,
      buttonClick: 'nextTen'
    }))
  }
  renderNewsItem() {
    if (this.state.status === 'loading') {
      return (<div>Loading</div>)
    } else {
      return (this.state.topStories.slice(0, this.state.newsItemCount).map((items, i) => (
        <NewsItem NewsId={items} key={items} buttonClick={this.state.buttonClick} selectNewsItem={(evnt) => this.handleSelectNewsItem(items, evnt)}></NewsItem>
      )))
    }
  }
  //.bind(this, items)
  render() {
    return (
      <div>
        <Grid>
          <Row >
            <Col sm={6} md={3}>
              <h2 style={styles.titleStyle}>News</h2>
              <Glyphicon glyph="refresh" style={styles.refresh} onClick={this.refresh} />              
            </Col>
            <Col sm={6} md={9}>
              <h2>Comments</h2>            
            </Col>            
          </Row>
          <Row className="show-grid">
            <Col sm={6} md={3} style={styles.newsColumn}>
              {/* {this.state.newsItemCount} */}
              {this.renderNewsItem()}
              <a href="" onClick={this.handleNextTenLoad}>Load Next 10</a>
            </Col>
            <Col sm={6} md={9} style={styles.commentsColumn}>
              <CommentsContainer NewsId={this.state.selectedNews}></CommentsContainer>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
  const styles = {
    refresh: { cursor: 'hand' },
    titleStyle: {
      color: 'red',
      cursor: 'hand'
    },
    newsColumn: {
      overflow: 'scroll',
      height: '550px'
    },
    commentsColumn: {
      overflow: 'scroll',
      height: '550px'
    }
    
  }

export default Home;
