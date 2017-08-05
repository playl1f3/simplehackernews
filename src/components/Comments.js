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
      // <div>
      //   <Glyphicon glyph="menu-right" /> {this.props.comments.author} {this.props.comments.points}
      //   <div
      //     dangerouslySetInnerHTML={{ __html: this.props.comments.text }}></div>
      //   {/*{this.props.commentsid.text}*/}
      //   <div>
      //     {this.props.comments.children.map((comments, i) => (
      //       <div>
      //        {this.props.depth}
      //         <Comments key={i} depth={this.props.depth+1} comments={comments} />
      //       </div>
      //     ))}
      //   </div>
      // </div>
      // <Collapse in={this.state.open}>
        <Grid fluid='true'>
          <Row className="show-grid">
            <Col xs={1} md={1}><Glyphicon glyph="triangle-top" /></Col>
            <Col xs={11} md={11}>{this.props.comments.author} {this.props.comments.points}</Col>
            {/*<Col xs={10}></Col>*/}
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
      // </Collapse>
    )
  }
}

export default Comments;