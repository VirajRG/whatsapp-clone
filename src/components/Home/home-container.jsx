import { connect } from 'react-redux'

import Home from './home';

const mapStateToProps = (state) => {
  return {
    username: state.user.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onClick: () => dispatch({username:'name', type: 'SET_USER' })
  }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)
export default HomeContainer