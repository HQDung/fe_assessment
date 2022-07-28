import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';

const enhancers = [
  applyMiddleware(
    thunkMiddleware,
  ),
];

/* eslint-disable no-undef */
const composeEnhancers = compose;
/* eslint-enable no-undef */

const enhancer = composeEnhancers(...enhancers);

export const store = createStore(reducer, {}, enhancer);
