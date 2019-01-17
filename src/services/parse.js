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
  updateEmailRequest,
  updateEmailSuccess,
  updateEmailFailure,
  updateFirstNameRequest,
  updateFirstNameSuccess,
  updateFirstNameFailure,
  updateLastNameRequest,
  updateLastNameSuccess,
  updateLastNameFailure,
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

export function updateEmail(user, email) {
  return async (dispatch) => {
    dispatch(updateEmailRequest());

    const result = user.setEmail(email);

    if (result) {
      try {
        await user.save();

        dispatch(updateEmailSuccess(user));
      } catch (error) {
        dispatch(updateEmailFailure(error));
      }
    } else {
      dispatch(updateEmailFailure({ message: 'Couldn\'t update email.' }));
    }
  };
}

export function updateFirstName(user, firstName) {
  return async (dispatch) => {
    dispatch(updateFirstNameRequest());

    const result = user.set('firstName', firstName);

    if (result) {
      try {
        await user.save();

        dispatch(updateFirstNameSuccess(user));
      } catch (error) {
        dispatch(updateFirstNameFailure(error));
      }
    } else {
      dispatch(updateFirstNameFailure({ message: 'Couldn\'t update first name.' }));
    }
  };
}

export function updateLastName(user, lastName) {
  return async (dispatch) => {
    dispatch(updateLastNameRequest());

    const result = user.set('lastName', lastName);

    if (result) {
      try {
        await user.save();

        dispatch(updateLastNameSuccess(user));
      } catch (error) {
        dispatch(updateLastNameFailure(error));
      }
    } else {
      dispatch(updateLastNameFailure({ message: 'Couldn\'t update last name.' }));
    }
  };
}

export default Parse;
