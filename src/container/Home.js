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
      newsItemCount: 10
    }
  }

  componentWillMount() {
    // axios.get("https://hacker-news.firebaseio.com/v0/topstories.json")
    // .then = (response) => {
    //   console.log(response);
    // }
    // .catch = (response) => {

    // }

    this.getLatestNews()
  }
  handleSelectNewsItem(newsId, ev) {
    ev.preventDefault()
    this.setState({
      selectedNews: newsId,
      buttonClick: 'selectedNews'
    })
  }

  renderCommentsContainer() {
    if (this.state.selectedNews !== '') {
      return (<CommentsContainer NewsId={this.state.selectedNews}></CommentsContainer>);
    } else {
      return (<div></div>);
    }
  }
  getLatestNews() {
    var _this = this;
    axios({
      method: 'get',
      url: 'https://hacker-news.firebaseio.com/v0/topstories.json',
      responseType: 'json'
    })
      .then(function (response) {
        console.log(response.data);
        _this.setState({ topStories: response.data })
      });
  }
  refresh = () => {
    this.getLatestNews()
    this.setState({
      buttonClick: 'refreshNews',
      newsItemCount: 10
    })
  }
  handleNextTenLoad = (event) => {
    event.preventDefault()
    console.log("handle next 10")
    this.setState((prevState) => ({ newsItemCount: prevState.newsItemCount + 10 }))
  }
  //.bind(this, items)
  render() {
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col sm={6} md={3}>
              <h2>News</h2>
              <Glyphicon glyph="refresh" onClick={this.refresh} />
              {this.state.newsItemCount}
              {this.state.topStories.slice(0, this.state.newsItemCount).map((items, i) => (
                <NewsItem NewsId={items} key={items} buttonClick={this.state.buttonClick} selectNewsItem={(evnt) => this.handleSelectNewsItem(items, evnt)}></NewsItem>
              ))}
              <a href="" onClick={this.handleNextTenLoad}>Load Next 10</a>
            </Col>
            <Col sm={6} md={9}>
              <h2>Comments</h2>
              {/*{this.renderCommentsContainer()}*/}
              {/* {this.state.selectedNews} */}
              <CommentsContainer NewsId={this.state.selectedNews}></CommentsContainer>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default Home;
