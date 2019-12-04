const initialState = {
  state: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false,
}

const readAllProjectEngineer = (state = initialState, action) => {
  switch (action.type) {
    case 'READ_ALL_PROJECT_ENGINEER_PENDING':
      return {
        ...state,
        isPending: true
      }
    case 'READ_ALL_PROJECT_ENGINEER_REJECTED':
      return {
        ...state,
        isRejected: true
      }
    case 'READ_ALL_PROJECT_ENGINEER_FULFILLED':
      return {
        ...state,
        isFulfilled: true,
        users: action.payload.data.payload
      }
    default:
      return state
  }
}

export default readAllProjectEngineer
