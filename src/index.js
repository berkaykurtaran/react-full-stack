/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import getRoutes from './routes';
import configureStore from './store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico
 // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={getRoutes(store)} />
  </Provider>, document.getElementById('app')
);
