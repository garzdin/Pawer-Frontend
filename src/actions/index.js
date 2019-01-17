import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAILURE,
  USER_SIGNOUT_REQUEST,
  USER_SIGNOUT_SUCCESS,
  USER_UPDATE_EMAIL_REQUEST,
  USER_UPDATE_EMAIL_SUCCESS,
  USER_UPDATE_EMAIL_FAILURE,
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

export const updateEmailRequest = () => ({
  type: USER_UPDATE_EMAIL_REQUEST,
});

export const updateEmailSuccess = user => ({
  type: USER_UPDATE_EMAIL_SUCCESS,
  payload: {
    user,
  },
});

export const updateEmailFailure = error => ({
  type: USER_UPDATE_EMAIL_FAILURE,
  payload: {
    error,
  },
});
