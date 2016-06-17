import React from 'react';
import {IndexRoute, Route,browserHistory} from 'react-router';
import { push as pushState } from 'react-router-redux';

import {
  App,
  Home,
  Login,
  NotFound,
} from './containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      console.log(user);
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/login');
      }
      cb();
    }
    checkAuth();
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route>
      <Route path="login" component={Login}/>
      <Route path="/" onEnter={requireLogin} component={App}>
        { /* Home (main) route */ }
        <IndexRoute component={Home}/>

        { /* Routes requiring login */ }
        <Route>

        </Route>

        { /* Routes */ }


        { /* Catch all route */ }
        <Route path="*" component={NotFound} status={404}/>
      </Route>
    </Route>

  );
};
