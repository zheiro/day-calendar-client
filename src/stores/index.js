import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import reducers from '../reducers';

export const history = createHistory();
const router = routerMiddleware(history);

function reduxStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk, router),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}

export default reduxStore;
