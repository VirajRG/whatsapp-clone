import React, {Component} from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import { API } from 'space-api';

import history from './history'
import Signup from './components/signup/signup';
import HomeContainer from './components/Home/home-container';
import LoginContainer from './components/login/login-container';

export const api = new API('whatsapp-clone', 'http://localhost:8080');
export const db = api.Mongo();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={LoginContainer} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={HomeContainer} />
        </div>
      </Router>
    );
  }
}

export default App;
