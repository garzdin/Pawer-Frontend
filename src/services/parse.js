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
} from '../actions';

Parse.serverURL = 'http://localhost:1337/parse';
Parse.initialize('CVbIS8GKIo95f5wMwluF6DbjxvjFKL465QwCsJOl', '6PZBT19DLKB7Z1QP5YVKQ1HJX0RTND3GS3ZOCO27');

export const currentUser = Parse.User.current();

export function signUp(email, password) {
  return async (dispatch) => {
    dispatch(signUpRequest());

    const user = new Parse.User();
    user.set('username', email);
    user.set('password', password);
    user.set('email', email);

    try {
      await user.signUp();

      dispatch(signUpSuccess(user));
    } catch (error) {
      dispatch(signUpFailure(error));
    }
  }
};

export function signIn(username, password) {
  return async (dispatch) => {
    try {
      dispatch(signInRequest());

      const user = await Parse.User.logIn(username, password);

      dispatch(signInSuccess(user));
    } catch (error) {
      dispatch(signInFailure(error));
    }
  }
};

export function signOut() {
  return async (dispatch) => {
    dispatch(signOutRequest());

    await Parse.User.logOut();

    dispatch(signOutSuccess());
  }
}

export function updateEmail(email) {
  return async (dispatch) => {
    dispatch(updateEmailRequest());

    const result = currentUser.setEmail(email);

    if (result) {
      try {
        await currentUser.save();

        dispatch(updateEmailSuccess(currentUser));
      } catch (error) {
        dispatch(updateEmailFailure(error));
      }
    } else {
      dispatch(updateEmailFailure({ message: 'Couldn\'t update email.' }));
    }
  }
}

export default Parse;
