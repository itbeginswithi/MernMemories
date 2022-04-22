import * as api from '../api';
import * as actions from '../constants/actionTypes';

//action creators: functions that return actions
//dispatch action to trigger reducer

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: actions.START_LOADING})
        const {data} = await api.fetchPost(id);
        console.log(data)
        dispatch({type: actions.FETCH_POST, payload: data})
        dispatch({type: actions.END_LOADING})
    } catch (error) {
        console.log(error)  
    }
}
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type: actions.START_LOADING})
        const {data: {data, currentPage, numberOfPages}} = await api.fetchPosts(page);
        dispatch({type: actions.FETCH_ALL, payload: {data, currentPage, numberOfPages}})
        dispatch({type: actions.END_LOADING})
    } catch (error) {
        console.log(error)  
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: actions.START_LOADING})
        const data = await api.fetchPostsBySearch(searchQuery);
        console.log(data)
        dispatch({type: actions.FETCH_BY_SEARCH, payload: data})
        dispatch({type: actions.END_LOADING})
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({type: actions.START_LOADING})
        const {data} = await api.createPost(post);
        dispatch({type: actions.CREATE, payload: data});
        dispatch({type: actions.END_LOADING})
    } catch (error) {
        console.log(error); 
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post);
        dispatch({type: actions.UPDATE, payload: data});
    } catch (error) {
        console.log(error); 
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({type: actions.DELETE , payload: id});
    } catch (error) {
        console.log(error); 
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);
        await dispatch({type: actions.LIKE_POST, payload: data});
        
    } catch (error) {
        console.log(error); 
    }
}

export const commentPost = (value, id) => async (dispatch) => { 
    try {
        const {data} = await api.addComment(value, id);
        dispatch({type: actions.ADD_COMMENT, payload: data});
        //https://redux.js.org/usage/writing-logic-thunks#returning-values-from-thunks
        return data.comments;
    } catch (error) {
        console.log(error); 
    }
}