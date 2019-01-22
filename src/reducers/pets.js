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
  status: 'idle',
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PETS_LOAD_REQUEST: {
      return {
        ...state,
        status: 'load_request',
      };
    }
    case PETS_LOAD_SUCCESS: {
      const { pets } = action.payload;

      return {
        ...state,
        status: 'load_success',
        pets,
      };
    }
    case PETS_LOAD_FAILURE: {
      const { error } = action.payload;

      return {
        ...state,
        status: 'load_failure',
        error,
      };
    }
    case PET_CREATE_REQUEST: {
      return {
        ...state,
        status: 'create_request',
      };
    }
    case PET_CREATE_SUCCESS: {
      const { pet } = action.payload;

      return {
        ...state,
        status: 'create_success',
        pets: [
          ...state.pets,
          pet,
        ],
      };
    }
    case PET_CREATE_FAILURE: {
      const { error } = action.payload;

      return {
        ...state,
        status: 'create_failure',
        error,
      };
    }
    case PET_UPDATE_REQUEST: {
      return {
        ...state,
        status: 'update_request',
      };
    }
    case PET_UPDATE_SUCCESS: {
      const { pets } = state;
      const { pet } = action.payload;

      const index = pets.findIndex(statePet => statePet.id === pet.id);

      const newPets = pets;
      newPets[index] = pet;

      return {
        ...state,
        status: 'update_success',
        pets: newPets,
      };
    }
    case PET_UPDATE_FAILURE: {
      const { error } = action.payload;

      return {
        ...state,
        status: 'update_failure',
        error,
      };
    }
    case PET_DELETE_REQUEST: {
      return {
        ...state,
        status: 'delete_request',
      };
    }
    case PET_DELETE_SUCCESS: {
      const { pets } = state;
      const { pet: petToDelete } = action.payload;

      return {
        ...state,
        status: 'delete_success',
        pets: pets.filter(pet => pet !== petToDelete),
      };
    }
    case PET_DELETE_FAILURE: {
      const { error } = action.payload;

      return {
        ...state,
        status: 'delete_failure',
        error,
      };
    }
    default:
      return state;
  }
}
