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
} from './types';

export const loadPetsRequest = () => ({
  type: PETS_LOAD_REQUEST,
});

export const loadPetsSuccess = pets => ({
  type: PETS_LOAD_SUCCESS,
  payload: {
    pets,
  },
});

export const loadPetsFailure = error => ({
  type: PETS_LOAD_FAILURE,
  payload: {
    error,
  },
});

export const createPetRequest = () => ({
  type: PET_CREATE_REQUEST,
});

export const createPetSuccess = pet => ({
  type: PET_CREATE_SUCCESS,
  payload: {
    pet,
  },
});

export const createPetFailure = error => ({
  type: PET_CREATE_FAILURE,
  payload: {
    error,
  },
});

export const updatePetRequest = id => ({
  type: PET_UPDATE_REQUEST,
  payload: {
    id,
  },
});

export const updatePetSuccess = pet => ({
  type: PET_UPDATE_SUCCESS,
  payload: {
    pet,
  },
});

export const updatePetFailure = error => ({
  type: PET_UPDATE_FAILURE,
  payload: {
    error,
  },
});

export const deletePetRequest = id => ({
  type: PET_DELETE_REQUEST,
  payload: {
    id,
  },
});

export const deletePetSuccess = id => ({
  type: PET_DELETE_SUCCESS,
  payload: {
    id,
  },
});

export const deletePetFailure = error => ({
  type: PET_DELETE_FAILURE,
  payload: {
    error,
  },
});

export default {
  loadPetsRequest,
  loadPetsSuccess,
  loadPetsFailure,
  createPetRequest,
  createPetSuccess,
  createPetFailure,
  updatePetRequest,
  updatePetSuccess,
  updatePetFailure,
  deletePetRequest,
  deletePetSuccess,
  deletePetFailure,
};
