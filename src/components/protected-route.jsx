import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const {
    component: Component,
    user,
    render,
    location,
    ...rest
  } = props;

  return (
    <Route
      {...rest}
      render={renderProps => (
        user
          ? render(renderProps) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: location },
              }}
            />
          )
      )}
    />
  );
};

ProtectedRoute.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.object,
  }),
  component: PropTypes.node,
  user: PropTypes.shape({
    className: PropTypes.string,
    id: PropTypes.string,
    _localId: PropTypes.string,
    _objCount: PropTypes.number,
  }),
  render: PropTypes.func,
};

ProtectedRoute.defaultProps = {
  location: {},
  component: null,
  user: {},
  render: () => {},
};

export default ProtectedRoute;
