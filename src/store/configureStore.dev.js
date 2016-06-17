// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import { createStore, compose,applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    // Add other middleware on this line...
    autoRehydrate(),
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }
  persistStore(store, undefined, () => {
    console.log('rehydration complete')
  });
  return store;
}
