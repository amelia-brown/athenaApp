const initialState = {
  currentUser: {
    firstName: '',
    lastName: '',
    username: '',
    roles: ['guest'],
    email: '',
    phoneNumber: '',
    bio: '',
    pictureUrl: '../../images/profilePicture.png',
    dateSignedUp: '',
    dateLastLogin: '',
    dateProfileLastUpdated: ''
  },
  hidden:true,
  pictureEditHidden:true,
};


const userReducer = function(state = initialState, action) {
  switch(action.type) {
    case 'SET_CURRENT_USER_REJECTED':
      console.log('rejected')
      return {
        ...state,
        status: 'rejected'
      };
    case 'SET_CURRENT_USER_FULFILLED':
      return {
        ...state,
        currentUser: action.payload[0],
        status: 'fulfilled'
      };
    case 'TOGGLE_PICTURE_EDIT':
      return {
        ...state,
        pictureEditHidden: !state.pictureEditHidden
      }
    case 'TOGGLE_PROFILE_MODAL':
      return {
        ...state,
        hidden: !state.hidden,
      }
    case 'SET_CURRENT_USER_PENDING':
      console.log('pending')
      return {
        ...state,
        status: 'pending'
      };
    case 'RESET_CURRENT_USER':
      return Object.assign({}, state, initialState);
    default:
      return state
  }
};

export default userReducer;
