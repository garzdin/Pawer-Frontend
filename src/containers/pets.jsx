import React from 'react';
import PropTypes from 'prop-types';

import { withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { loadPets } from '../services/parse';

import { mapStateToProps } from '../utils';

import { getUser, getPets, getPetsLoading } from '../selectors';

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2,
  },
  inline: {
    display: 'inline',
  },
  listContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  infoLabel: {
    textAlign: 'center',
    marginBottom: theme.spacing.unit,
  },
});

const selectors = mapStateToProps({
  user: getUser,
  pets: getPets,
  loading: getPetsLoading,
});

class Pets extends React.Component {
  componentWillMount() {
    const {
      dispatch, user, pets, loading,
    } = this.props;

    if (pets.length === 0 && !loading) {
      dispatch(loadPets(user));
    }
  }

  renderPets() {
    const { pets, loading } = this.props;

    if (!loading) {
      return pets.map(pet => (
        <ListItem key={() => pet.get('id')}>
          <ListItemAvatar>
            <Avatar alt={pet.get('name')} src={pet.get('avatar') && pet.get('avatar').url()} />
          </ListItemAvatar>
          <ListItemText
            primary={pet.get('name')}
            secondary={pet.get('breed')}
          />
        </ListItem>
      ));
    }

    return [];
  }

  render() {
    const { classes, pets, loading } = this.props;

    return (
      <Grid container direction="column" className={classes.container}>
        {pets.length === 0 && loading && (
          <Grid item className={classes.infoLabel}>
            <Typography>Loading...</Typography>
          </Grid>
        )}
        {pets.length === 0 && !loading && (
          <Grid item className={classes.infoLabel}>
            <Typography>No pets</Typography>
          </Grid>
        )}
        {pets.length > 0 && (
          <Grid item>
            <List className={classes.listContainer}>
              {this.renderPets()}
            </List>
          </Grid>
        )}
        <Grid container className={classes.buttonContainer}>
          <Grid item xs={6} />
          <Grid item xs={6}>
            <Link to="/account/pets/new/">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onSubmit}
                disabled={loading}
              >
                Add
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Pets.propTypes = {
  classes: PropTypes.shape({
    avatarContainer: PropTypes.string,
    avatar: PropTypes.string,
    fieldsContainer: PropTypes.string,
    buttonContainer: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    className: PropTypes.string,
    id: PropTypes.string,
    _localId: PropTypes.string,
    _objCount: PropTypes.number,
    getEmail: PropTypes.func,
    get: PropTypes.func,
  }),
  pets: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    id: PropTypes.string,
    _localId: PropTypes.string,
    _objCount: PropTypes.number,
    get: PropTypes.func,
  })),
  loading: PropTypes.bool.isRequired,
};

Pets.defaultProps = {
  user: {},
  pets: [],
};

export default withRouter(connect(selectors)(withStyles(styles)(Pets)));
