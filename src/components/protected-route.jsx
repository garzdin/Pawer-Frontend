import React from 'react';

import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, user, render, ...rest }) {
  return (
    <Route {...rest} render={(props) => (
      user ?
        render(props)
      : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location }
          }}
        />
      )
    )} />
  );
}

export default ProtectedRoute;
