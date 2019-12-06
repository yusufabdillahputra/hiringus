const initialState = {
  stateArray: {},
  isPending: false,
  isRejected: false,
  isFulfilled: false,
}

const postPhotoModal = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_STATE_PHOTO_MODAL_PENDING':
      return {
        ...state,
        isPending: true
      }
    case 'POST_STATE_PHOTO_MODAL_REJECTED':
      return {
        ...state,
        isRejected: true
      }
    case 'POST_STATE_PHOTO_MODAL':
      return {
        ...state,
        isFulfilled: true,
        stateArray: action.payload
      }
    default:
      return state
  }
}

export default postPhotoModal
