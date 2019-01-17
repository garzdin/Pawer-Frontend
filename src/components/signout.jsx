import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { signOut } from '../services/parse';

class SignOut extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(signOut());
  }

  render() {
    const { location } = this.props;

    return (
      <Redirect
        to={{
          pathname: '/signin',
          state: { from: location },
        }}
      />
    );
  }
}

SignOut.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.shape({
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.object,
  }).isRequired,
};

export default withRouter(connect()(withRouter(SignOut)));
