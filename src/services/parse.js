import Parse from 'parse';

import {
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  signInRequest,
  signInSuccess,
  signInFailure,
  signOutRequest,
  signOutSuccess,
  updateRequest,
  updateSuccess,
  updateFailure,
} from '../actions';

Parse.serverURL = 'http://localhost:1337/parse';
Parse.initialize('CVbIS8GKIo95f5wMwluF6DbjxvjFKL465QwCsJOl', '6PZBT19DLKB7Z1QP5YVKQ1HJX0RTND3GS3ZOCO27');

export const currentUser = Parse.User.current();

export function signUp(email, password, options) {
  return async (dispatch) => {
    dispatch(signUpRequest());

    const {
      firstName,
      lastName,
      address,
      city,
      postalCode,
      country,
    } = options;

    const user = new Parse.User();

    user.set('username', email);
    user.set('password', password);
    user.set('email', email);
    user.set('firstName', firstName);
    user.set('lastName', lastName);
    user.set('address', address);
    user.set('city', city);
    user.set('postalCode', postalCode);
    user.set('country', country);

    try {
      await user.signUp();

      dispatch(signUpSuccess(user));
    } catch (error) {
      dispatch(signUpFailure(error));
    }
  };
}

export function signIn(username, password) {
  return async (dispatch) => {
    try {
      dispatch(signInRequest());

      const user = await Parse.User.logIn(username, password);

      dispatch(signInSuccess(user));
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
}

export function signOut() {
  return async (dispatch) => {
    dispatch(signOutRequest());

    await Parse.User.logOut();

    dispatch(signOutSuccess());
  };
}

export function update(user, fields) {
  return async (dispatch) => {
    dispatch(updateRequest());

    Object.keys(fields).forEach(field => user.set(field, fields[field]));

    try {
      await user.save();

      dispatch(updateSuccess(user));
    } catch (error) {
      dispatch(updateFailure(error));
    }
  };
}

export default Parse;
