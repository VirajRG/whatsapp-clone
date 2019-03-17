import { connect } from 'react-redux'

import Login from './login';

const mapStateToProps = (state) => {
  return {
    username: state.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (username) => {
      dispatch({username, type: 'SET_USER' })
    }
  }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)
export default LoginContainer