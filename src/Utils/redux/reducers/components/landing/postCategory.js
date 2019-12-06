const initialState = {
  stateArray: {},
  isPending: false,
  isRejected: false,
  isFulfilled: false
}

const postCategory = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_CATEGORY_PENDING':
      return {
        ...state,
        isPending: true
      }
    case 'POST_CATEGORY_REJECTED':
      return {
        ...state,
        isRejected: true
      }
    case 'POST_CATEGORY':
      return {
        ...state,
        isFulfilled: true,
        stateArray: action.payload
      }
    default:
      return state
  }
}

export default postCategory
