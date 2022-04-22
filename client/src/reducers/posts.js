//a reducer is a function = to a function that accepts the state and a function
//The state ust always equal a value when within a reducer.
//handles actions
import * as actions from '../constants/actionTypes';

const initialState = {isLoading: true, posts: []}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.START_LOADING:
      return {...state, isLoading: true}
    case actions.END_LOADING:
      return {...state, isLoading: false}
    case actions.FETCH_POST:
      console.log(action.payload)
      return {...state, post: action.payload}
    case actions.FETCH_ALL:
      return {
        ...state, 
        posts: action.payload.data, 
        currentPage: action.payload.currentPage, 
        numberOfPages: action.payload.numberOfPages
      };
    case actions.FETCH_BY_SEARCH:
      return {...state, posts: action.payload};
    case actions.CREATE:
      return {...state, posts: [...state.posts, action.payload]};
    case actions.UPDATE:
      return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
    case actions.DELETE:
      return { ...state, posts: state.posts.filter(post => post._id !== action.payload)};
    case actions.LIKE_POST:
      return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
    case actions.ADD_COMMENT:
      return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
    default:
      return state;
  }
};
