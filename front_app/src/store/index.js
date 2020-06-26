import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger'
import * as reducers from 'state/reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';

export const history =  createBrowserHistory({
  /* pass a configuration object here if needed */
});

function configureStore( initialState ) {
  const rootReducer = combineReducers( {
    ...reducers,
    router: connectRouter(history),
  });
  const middleware = [thunkMiddleware, routerMiddleware(history)];
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(logger);
  }
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
}

export default configureStore();
