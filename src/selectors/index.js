export const getUser = store => store.auth.user;
export const getSignUpPending = store => store.auth.signUp.pending;
export const getSignUpError = store => store.auth.signUp.error;
export const getSignInPending = store => store.auth.signIn.pending;
export const getSignInError = store => store.auth.signIn.error;
export const getSignOutPending = store => store.auth.signOut.pending;
export const getUserUpdatePending = store => store.auth.updating.pending;
export const getUserUpdateError = store => store.auth.updating.pending;

export const getPets = store => store.pets.pets;
export const getPetsLoading = store => store.pets.loading;

export const getPetById = store => id => store.pets.pets
  .reduce((acc, v) => (v.id === id ? v : acc), {});
