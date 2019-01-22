import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';

import { Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import ProtectedRoute from '../components/protected-route';

import AppBar from './app-bar';

import Main from '../components/main';

import Account from '../components/account';
import Profile from '../components/profile';
import Pets from '../components/pets';
import NewPet from '../components/new-pet';
import EditPet from '../components/edit-pet';

import SignUp from './signup';
import SignIn from './signin';
import SignOut from './signout';

import {
  update as updateMethod,
  updateAvatar as updateAvatarMethod,
  loadPets as loadPetsMethod,
  createPet as createPetMethod,
  updatePet as updatePetMethod,
  deletePet as deletePetMethod,
} from '../services/parse';

import { mapStateToProps, mapDispatchToActions } from '../utils';

import {
  getUser, getUserUpdatePending, getPets, getPetsStatus, getPetById,
} from '../selectors';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.down('xs')]: {
      width: 200,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up('xs')]: {
      width: 250,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up('sm')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up('lg')]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up('xl')]: {
      width: 1400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const selectors = mapStateToProps({
  user: getUser,
  userUpdating: getUserUpdatePending,
  pets: getPets,
  petsStatus: getPetsStatus,
  pet: getPetById,
});

const actions = mapDispatchToActions({
  updateUser: updateMethod,
  updateUserAvatar: updateAvatarMethod,
  loadPets: loadPetsMethod,
  createPet: createPetMethod,
  updatePet: updatePetMethod,
  deletePet: deletePetMethod,
});

class App extends React.Component {
  componentWillMount() {
    const {
      user, pets, loadPets, petsStatus,
    } = this.props;

    if (user && pets.length === 0 && petsStatus === 'idle') {
      loadPets(user);
    }
  }

  componentWillUpdate(nextProps) {
    const {
      user, loadPets, petsStatus,
    } = nextProps;

    if (petsStatus === 'create_success' || petsStatus === 'update_success' || petsStatus === 'delete_success') {
      loadPets(user);
    }
  }

  render() {
    const {
      classes, user, pets, petsStatus, pet, loadPets, updateUser, updateUserAvatar, userUpdating,
      createPet, updatePet, deletePet,
    } = this.props;

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
              path="/account/"
              exact
              user={user}
              render={routeProps => (
                <Account
                  {...routeProps}
                  pets={pets}
                  petsStatus={petsStatus}
                  loadPets={loadPets}
                  activeMenuItem="profile"
                >
                  <Profile
                    {...routeProps}
                    user={user}
                    updateUser={updateUser}
                    updateUserAvatar={updateUserAvatar}
                    updatingUser={userUpdating}
                  />
                </Account>
              )}
            />
            <ProtectedRoute
              path="/account/pets/"
              exact
              user={user}
              render={routeProps => (
                <Account
                  {...routeProps}
                  pets={pets}
                  petsStatus={petsStatus}
                  loadPets={loadPets}
                  activeMenuItem="pets"
                >
                  <Pets
                    {...routeProps}
                    user={user}
                    pets={pets}
                    petsStatus={petsStatus}
                  />
                </Account>
              )}
            />
            <ProtectedRoute
              path="/account/pets/new/"
              exact
              user={user}
              render={routeProps => (
                <Account
                  {...routeProps}
                  pets={pets}
                  petsStatus={petsStatus}
                  loadPets={loadPets}
                  activeMenuItem="pets"
                >
                  <NewPet
                    {...routeProps}
                    user={user}
                    pets={pets}
                    petsStatus={petsStatus}
                    createPet={createPet}
                  />
                </Account>
              )}
            />
            <ProtectedRoute
              path="/account/pets/edit/:id/"
              exact
              user={user}
              render={routeProps => (
                <Account
                  {...routeProps}
                  pets={pets}
                  petsStatus={petsStatus}
                  loadPets={loadPets}
                  activeMenuItem="pets"
                >
                  <EditPet
                    {...routeProps}
                    user={user}
                    pet={pet(routeProps.match.params.id)}
                    petsStatus={petsStatus}
                    updatePet={updatePet}
                    deletePet={deletePet}
                  />
                </Account>
              )
              }
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
  }
}

App.propTypes = {
  classes: PropTypes.shape({
    main: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    className: PropTypes.string,
    id: PropTypes.string,
    _localId: PropTypes.string,
    _objCount: PropTypes.number,
  }),
  userUpdating: PropTypes.bool.isRequired,
  pets: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    id: PropTypes.string,
    _localId: PropTypes.string,
    _objCount: PropTypes.number,
  })).isRequired,
  pet: PropTypes.func.isRequired,
  petsStatus: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateUserAvatar: PropTypes.func.isRequired,
  loadPets: PropTypes.func.isRequired,
  createPet: PropTypes.func.isRequired,
  updatePet: PropTypes.func.isRequired,
  deletePet: PropTypes.func.isRequired,
};

App.defaultProps = {
  user: {},
};

export default withRouter(connect(selectors, actions)(withStyles(styles)(App)));
