import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAILURE,
  USER_SIGNOUT_REQUEST,
  USER_SIGNOUT_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
} from './types';

export const signUpRequest = () => ({
  type: USER_SIGNUP_REQUEST,
});

export const signUpSuccess = user => ({
  type: USER_SIGNUP_SUCCESS,
  payload: {
    user,
  },
});

export const signUpFailure = error => ({
  type: USER_SIGNUP_FAILURE,
  payload: {
    error,
  },
});

export const signInRequest = () => ({
  type: USER_SIGNIN_REQUEST,
});

export const signInSuccess = user => ({
  type: USER_SIGNIN_SUCCESS,
  payload: {
    user,
  },
});

export const signInFailure = error => ({
  type: USER_SIGNIN_FAILURE,
  payload: {
    error,
  },
});

export const signOutRequest = () => ({
  type: USER_SIGNOUT_REQUEST,
});

export const signOutSuccess = () => ({
  type: USER_SIGNOUT_SUCCESS,
});

export const updateRequest = () => ({
  type: USER_UPDATE_REQUEST,
});

export const updateSuccess = user => ({
  type: USER_UPDATE_SUCCESS,
  payload: {
    user,
  },
});

export const updateFailure = error => ({
  type: USER_UPDATE_FAILURE,
  payload: {
    error,
  },
});
