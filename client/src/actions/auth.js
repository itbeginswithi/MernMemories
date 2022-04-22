import {AUTH} from '../constants/actionTypes';
import * as api from '../api';

//If action creators are async then we have to use redux-thunk

export const signin = (formData, navigate) => async (dispatch) =>{
    try {
        //Login the user
        const {data} = await api.signIn(formData);
        dispatch({type: AUTH, data});
        navigate('/')
    } catch (error) {
        console.error(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) =>{
    try {
        //Login the user
        const {data} = await api.signUp(formData);
        dispatch({type: AUTH, data});
        navigate('/')
    } catch (error) {
        console.error(error);
    }
}