const initialState = {
  users: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false,
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USERS_PENDING':
      return {
        ...state,
        isPending: true
      }
    case 'GET_USERS_REJECTED':
      return {
        ...state,
        isRejected: true
      }
    case 'GET_USERS_FULFILLED':
      return {
        ...state,
        isFulfilled: true,
        users: action.payload.data.payload
      }
    default:
      return state
  }
}

export default users