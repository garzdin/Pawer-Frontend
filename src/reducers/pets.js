import {
  PETS_LOAD_REQUEST,
  PETS_LOAD_SUCCESS,
  PETS_LOAD_FAILURE,
  PET_CREATE_REQUEST,
  PET_CREATE_SUCCESS,
  PET_CREATE_FAILURE,
  PET_UPDATE_REQUEST,
  PET_UPDATE_SUCCESS,
  PET_UPDATE_FAILURE,
  PET_DELETE_REQUEST,
  PET_DELETE_SUCCESS,
  PET_DELETE_FAILURE,
} from '../actions/types';

const initialState = {
  pets: [],
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PETS_LOAD_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case PETS_LOAD_SUCCESS: {
      const { pets } = action.payload;

      return {
        ...state,
        loading: false,
        pets,
      };
    }
    case PETS_LOAD_FAILURE: {
      const { error } = action.payload;

      return {
        ...state,
        error,
      };
    }
    case PET_CREATE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case PET_CREATE_SUCCESS: {
      const { pet } = action.payload;

      return {
        ...state,
        loading: false,
        pets: {
          ...state.pets,
          pet,
        },
      };
    }
    case PET_CREATE_FAILURE: {
      const { error } = action.payload;

      return {
        ...state,
        loading: false,
        error,
      };
    }
    case PET_UPDATE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case PET_UPDATE_SUCCESS: {
      const { pets } = state;
      const { pet } = action.payload;

      const index = pets.indexOf(pet);

      return {
        ...state,
        loading: false,
        pets: {
          ...state.pets,
          [index]: pet,
        },
      };
    }
    case PET_UPDATE_FAILURE: {
      const { error } = action.payload;

      return {
        ...state,
        loading: false,
        error,
      };
    }
    case PET_DELETE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case PET_DELETE_SUCCESS: {
      const { pets } = state;
      const { pet: petToDelete } = action.payload;

      return {
        ...state,
        loading: false,
        pets: pets.filter(pet => pet !== petToDelete),
      };
    }
    case PET_DELETE_FAILURE: {
      const { error } = action.payload;

      return {
        ...state,
        loading: false,
        error,
      };
    }
    default:
      return state;
  }
}
