const user = (state = {}, action) => {
  let data = action.data
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        username: action.username
      }

    default:
      console.log('Default called');
      return state;
  }
}

export default user