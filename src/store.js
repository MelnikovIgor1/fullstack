import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from './reducers';
import thunk from 'redux-thunk';

export function initStore() {
  const store = {};

  return createStore(
    reducers,
    store,
    composeWithDevTools(applyMiddleware(thunk))
  );
}
