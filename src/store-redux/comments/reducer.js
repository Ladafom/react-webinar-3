export const initialState = {
  data: [],
  count:0,
  waiting: false,
  isReply: true
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: [], count:0, waiting: true };

    case 'comments/load-success':
      return { ...state, data: action.payload.data.items, count:action.payload.data.count, waiting: false };

    case 'comments/load-error':
      return { ...state, data: [], count:0, waiting: false };

    case 'comments/add-success':
      return { ...state, data: [...state.data, action.payload.data], count: ++state.count}

    case 'comments/open-reply':
      return {...state, data: action.payload.data, isReply: false}

    case 'comments/close-reply':
      return {...state, data: action.payload.data, isReply: true}

    default:
      return state;
  }
}

export default reducer;