import React, { Component } from 'react';
import Comments from '../components/Comments';
import axios from 'axios';

class CommentsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      NewsDetails: {
        children: []
      },
      NewsId: ''
    }
    // this.getData(this.props.NewsId);

  }
  componentWillReceiveProps(nextProps) {
    console.log("update props " + this.props.NewsId + " : " + nextProps.NewsId)    
    if (this.props.NewsId != nextProps.NewsId && nextProps.NewsId !== '') {
      console.log("will update")
      this.getData(nextProps.NewsId)
    }
    else {
      console.log("no update")
    }
  }
  getData(NewsId) {
    var _this = this;
    //https://hn.algolia.com/api/v1/items/14649727
    //var url = 'https://hn.algolia.com/api/v1/items/' + this.props.match.params.id + '.json';
    var url = 'https://hn.algolia.com/api/v1/items/' + NewsId + '.json';
    axios({
      method: 'get',
      url: url,
      responseType: 'json'
    })
      .then(function (response) {
        console.log(response.data);
        _this.setState({ NewsDetails: response.data })
      });
  }
  render() {
    return (
      <div>
        <b>{this.state.NewsDetails.title}</b>
        {this.state.NewsDetails.children.map((comments, i) => (
          <Comments key={comments.id} comments={comments}></Comments>
        ))}
      </div>
    );

  }
}

export default CommentsContainer;