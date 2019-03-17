import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Row, Col, Input, Icon, Button, Divider, message } from 'antd';
import { db, api} from '../../App';

import history from '../../history'
import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {username:'', pass:''}
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }
  handleLogin() {
    if(this.state.username=='' || this.state.pass=='') {
      message.error('Username and Password should not be blank');
      return;
    }
    db.signIn(this.state.username, this.state.pass).then(res => {
      if (res.status === 200) {
        api.setToken(res.data.token);
        this.props.setUser(res.data.user.email);
        history.push('/home');
        return;
      }
      else {
        message.error('Invalid login credentials !!');
      }
      // Request failed
    }).catch(ex => {
      message.error('You are not connected with the Server !!');
    });
  }
  redirectSignup () {
    history.push('/signup');
  }
  render() {
    return (
      <Row className="login-wrapper">
        <Col style={{display:"flex", alignItems:"center", height:"100%"}} lg={10}>
          <div className="login-form-wrapper" >
            <div className="login-title">Whatsapp Clone</div>
            <div className="login-subtitle">Spaceuptech LLP</div>
            <Row type="flex" justify="center">
              <Col className="login-form" lg={12}>
                <Input className="login-input" name="username" placeholder="Username" 
                  value={this.state.username} onChange={this.handleChange} ref={node => this.userNameInput = node}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                />
                <Input className="login-input" name="email" placeholder="Password" value={this.state.pass}
                  onChange={this.handleChange} ref={node => this.userNameInput = node} type="password"
                  name="pass" prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                />
                <Button className="login-btn" type="primary" onClick={this.handleLogin}>LOGIN</Button>
                <Divider className="login-divider" dashed={true}>New to Whatsapp ?</Divider>
                <Button className="login-btn" type="primary" onClick={this.redirectSignup}>SIGN UP</Button>
              </Col>
            </Row>
          </div>
        </Col>
        <Col className="login-bg-wrapper" span={14}></Col>
      </Row>
    );
  }
}

export default Login;