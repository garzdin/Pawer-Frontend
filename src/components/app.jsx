import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';

import { Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import ProtectedRoute from './protected-route';

import AppBar from './app-bar';

import Main from './main';

import Account from './account';
import Profile from './profile';

import SignUp from './signup';
import SignIn from './signin';
import SignOut from './signout';

import { mapStateToProps } from '../utils';

import { getUser } from '../selectors';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const selectors = mapStateToProps({
  user: getUser,
});

const App = (props) => {
  const { classes, user } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar />
      <main className={classes.main}>
        <React.Fragment>
          <ProtectedRoute
            path="/"
            exact
            user={user}
            render={routeProps => (
              <Main {...routeProps} />
            )}
          />
          <ProtectedRoute
            path="/account"
            exact
            user={user}
            render={routeProps => (
              <Account {...routeProps}>
                <Profile {...routeProps} />
              </Account>
            )}
          />
          <Route
            path="/signup/"
            render={routeProps => (
              <SignUp {...routeProps} />
            )}
          />
          <Route
            path="/signin/"
            render={routeProps => (
              <SignIn {...routeProps} />
            )}
          />
          <Route
            path="/signout/"
            render={routeProps => (
              <SignOut {...routeProps} />
            )}
          />
        </React.Fragment>
      </main>
    </React.Fragment>
  );
};

App.propTypes = {
  classes: PropTypes.shape({
    main: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    className: PropTypes.string,
    id: PropTypes.string,
    _localId: PropTypes.string,
    _objCount: PropTypes.number,
    firstName: PropTypes.string,
  }),
};

App.defaultProps = {
  user: {},
};

export default withRouter(connect(selectors)(withStyles(styles)(App)));
