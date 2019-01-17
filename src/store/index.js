import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
  ),
);

export default createStore(
  rootReducer,
  enhancer,
);
