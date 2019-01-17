import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';

import { Route, withRouter } from "react-router-dom";

import { connect } from "react-redux";

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

class App extends React.Component {
  render() {
    const { classes } = this.props;
    const { user } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar user={user} />
        <main className={classes.main}>
          <React.Fragment>
            <ProtectedRoute path="/" exact user={user} render={(props) => (
              <Main {...props} user={user} />
            )} />
            <ProtectedRoute path="/account" exact user={user} render={(props) => (
              <Account {...props} user={user}>
                <Profile {...props} user={user} />
              </Account>
            )} />
            <Route path="/signup/" render={(props) => (
              <SignUp {...props} user={user} />
            )} />
            <Route path="/signin/" render={(props) => (
              <SignIn {...props} user={user} />
            )} />
            <Route path="/signout/" render={(props) => (
              <SignOut {...props} user={user} />
            )} />
          </React.Fragment>
        </main>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
};

export default withRouter(connect(selectors)(withStyles(styles)(App)));
