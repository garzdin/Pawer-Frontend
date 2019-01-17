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
} from '../actions/types';

import { currentUser } from '../services/parse';

const initialState = {
  user: currentUser,
  signUp: {
    pending: false,
    error: {},
  },
  signIn: {
    pending: false,
    error: {},
  },
  signOut: {
    pending: false,
  },
  updating: {
    pending: false,
    error: {},
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_SIGNUP_REQUEST: {
      return {
        ...state,
        signUp: {
          ...state.signUp,
          pending: true,
        },
      };
    }
    case USER_SIGNUP_SUCCESS: {
      const { user } = action.payload;

      return {
        ...state,
        user,
        signUp: {
          ...state.signUp,
          pending: false,
        },
      };
    }
    case USER_SIGNUP_FAILURE: {
      const { error } = action.payload;

      return {
        ...state,
        signUp: {
          ...state.signUp,
          pending: false,
          error,
        },
      };
    }
    case USER_SIGNIN_REQUEST: {
      return {
        ...state,
        signIn: {
          ...state.signIn,
          pending: true,
        },
      };
    }
    case USER_SIGNIN_SUCCESS: {
      const { user } = action.payload;

      return {
        ...state,
        user,
        signIn: {
          ...state.signIn,
          pending: false,
        },
      };
    }
    case USER_SIGNIN_FAILURE: {
      const { error } = action.payload;

      return {
        ...state,
        signIn: {
          ...state.signIn,
          pending: false,
          error,
        },
      };
    }
    case USER_SIGNOUT_REQUEST: {
      return {
        ...state,
        signOut: {
          ...state.signOut,
          pending: true,
        },
      };
    }
    case USER_SIGNOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        signOut: {
          ...state.signOut,
          pending: false,
        },
      };
    }
    case USER_UPDATE_EMAIL_REQUEST: {
      return {
        ...state,
        updating: {
          ...state.updating,
          pending: true,
        },
      };
    }
    case USER_UPDATE_EMAIL_SUCCESS: {
      const { user } = action.payload;

      return {
        ...state,
        user,
        updating: {
          ...state.updating,
          pending: false,
        },
      };
    }
    case USER_UPDATE_EMAIL_FAILURE: {
      const { error } = action.payload;

      return {
        ...state,
        updating: {
          ...state.updating,
          pending: false,
          error,
        },
      };
    }
    default:
      return state;
  }
}
