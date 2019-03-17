import React, {Component} from 'react';
import { Row, Col, Input, Icon, Button, Divider, message } from 'antd';

import history from '../../history';
import  { db, api } from '../../App';
import "./signup.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {username:'', pass:'', email: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }
  handleSignup() {
    if(this.state.username=='' || this.state.pass=='') {
      message.error('Username and Password should not be blank');
      return;
    }
    console.log(this.state.pass);
    db.signUp(this.state.username, this.state.email, this.state.pass, 'default').then(res => {
      if (res.status === 200) {
        api.setToken(res.data.token);
        history.push('/home');
        return;
      }
      else {
        message.error('User with same credentials already exists !!');
      }
      // Request failed
    }).catch(ex => {
      message.error('You are not connected with the Server !!');
    });
  }
  redirectLogin () {
    history.push('/');
  }
  render() {
    return (
      <Row className="login-wrapper">
        <Col style={{display:"flex", alignItems:"center", height:"100%"}} lg={10}>
          <div className="login-form-wrapper" >
            <div className="login-title">Whatsapp</div>
            <div className="login-subtitle">Spaceuptech LLP</div>
            <Row type="flex" justify="center">
              <Col className="login-form" lg={12}>
                <Input className="login-input" name="username" placeholder="Username" value={this.state.username}
                  onChange={this.handleChange} ref={node => this.userNameInput = node}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                />
                <Input className="login-input" name="email" placeholder="Email Address" value={this.state.email}
                  onChange={this.handleChange} ref={node => this.userNameInput = node}
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                />
                <Input className="login-input" name="email" placeholder="Password" value={this.state.pass}
                  onChange={this.handleChange} ref={node => this.userNameInput = node} type="password"
                  name="pass" prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                />
                <Button className="login-btn" type="primary" onClick={this.handleSignup}>SIGN UP</Button>
                <Divider className="login-divider" dashed={true}>Already a member ?</Divider>
                <Button className="login-btn" type="primary" onClick={this.redirectLogin}>LOGIN</Button>
              </Col>
            </Row>
          </div>
        </Col>
        <Col className="login-bg-wrapper" span={14}></Col>
      </Row>
    );
  }
}

export default Signup;