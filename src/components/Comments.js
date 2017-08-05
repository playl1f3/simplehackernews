import React, { Component } from 'react';
import axios from 'axios';
import { Glyphicon, Grid, Row, Col } from 'react-bootstrap';

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      NewsDetails: {
        kids: []
      }
    }
  }

  render() {
    return (
        <Grid fluid='true'>
          <Row className="show-grid">
            <Col xs={1} md={1}><Glyphicon glyph="triangle-top" /></Col>
            <Col xs={11} md={11}><b>{this.props.comments.author}</b> {this.props.comments.points}</Col>
          </Row>
          <Row className="show-grid">
            <Col xs={1} md={1}></Col>
            <Col xs={11} md={11}>
              <div dangerouslySetInnerHTML={{ __html: this.props.comments.text }}></div>
              <div>
                {this.props.comments.children.map((comments, i) => (
                  <div>
                    <Comments key={i} comments={comments} />
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Grid>
    )
  }
}

const styles = {
  username: {
    fontweight: 'bold'
  }
}

export default Comments;