import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Home from './container/Home';
import CommentsContainer from './container/CommentsContainer';
import { Grid } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Grid>
      {/*<Home />*/}
      <Route exact path="/" component={Home}/>
      <Route exact path="/comments/:id" component={CommentsContainer}/>
    </Grid>
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
