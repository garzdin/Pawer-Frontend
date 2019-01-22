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
} from '../actions';

Parse.serverURL = 'http://localhost:1337/parse';
Parse.initialize('CVbIS8GKIo95f5wMwluF6DbjxvjFKL465QwCsJOl', '6PZBT19DLKB7Z1QP5YVKQ1HJX0RTND3GS3ZOCO27');

const Pet = Parse.Object.extend('Pet', {
  className: 'Pet',
});

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

export function updateAvatar(user, file) {
  return async (dispatch) => {
    dispatch(updateRequest());

    const username = user.get('username');

    const image = new Parse.File(username, file);

    try {
      image.save();

      user.set('avatar', image);

      user.save();

      dispatch(updateSuccess(user));
    } catch (error) {
      dispatch(updateFailure(error));
    }
  };
}

export function loadPets(user) {
  return async (dispatch) => {
    dispatch(loadPetsRequest());

    const query = new Parse.Query(Pet);

    query.equalTo('owner', user);

    try {
      const pets = await query.find();

      if (pets) {
        dispatch(loadPetsSuccess(pets));
      } else {
        dispatch(loadPetsFailure({ message: 'This user has no pets.' }));
      }
    } catch (error) {
      dispatch(loadPetsFailure(error));
    }
  };
}

export function createPet(fields) {
  return async (dispatch) => {
    dispatch(createPetRequest());

    const { name } = fields;

    const pet = new Pet();

    Object.keys(fields).forEach((field) => {
      if (field === 'avatar') {
        const image = new Parse.File(name, fields[field]);

        try {
          image.save();

          pet.set('avatar', image);
        } catch (error) {
          dispatch(createPetFailure(error));
        }
      } else {
        pet.set(field, fields[field]);
      }
    });

    try {
      await pet.save();

      dispatch(createPetSuccess(pet));
    } catch (error) {
      dispatch(createPetFailure(error));
    }
  };
}

export function updatePet(id, fields) {
  return async (dispatch) => {
    dispatch(updatePetRequest(id));

    const query = new Parse.Query(Pet);

    try {
      const pet = await query.get(id);

      if (pet) {
        const { name } = fields;

        Object.keys(fields).forEach((field) => {
          if (field === 'avatar') {
            const image = new Parse.File(name, fields[field]);

            try {
              image.save();

              pet.set('avatar', image);
            } catch (error) {
              dispatch(createPetFailure(error));
            }
          } else {
            pet.set(field, fields[field]);
          }
        });

        await pet.save();

        dispatch(updatePetSuccess(pet));
      } else {
        dispatch(updatePetFailure({ message: 'No pet with that id was found.' }));
      }
    } catch (error) {
      dispatch(updatePetFailure(error));
    }
  };
}

export function deletePet(id) {
  return async (dispatch) => {
    dispatch(deletePetRequest(id));

    const query = new Parse.Query(Pet);

    try {
      const pet = await query.get(id);

      if (pet) {
        await pet.destroy();

        dispatch(deletePetSuccess(pet));
      } else {
        dispatch(deletePetFailure({ message: 'No pet with that id was found.' }));
      }
    } catch (error) {
      dispatch(deletePetFailure(error));
    }
  };
}

export default Parse;
