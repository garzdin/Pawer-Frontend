export const getUser = store => store.auth.user;
export const getSignUpPending = store => store.auth.signUp.pending;
export const getSignUpError = store => store.auth.signUp.error;
export const getSignInPending = store => store.auth.signIn.pending;
export const getSignInError = store => store.auth.signIn.error;
export const getSignOutPending = store => store.auth.signOut.pending;
