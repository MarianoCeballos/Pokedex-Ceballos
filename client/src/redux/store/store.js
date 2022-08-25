import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducer/reducer';
import thunk from 'redux-thunk';

const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
  }) ||
    compose);

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
