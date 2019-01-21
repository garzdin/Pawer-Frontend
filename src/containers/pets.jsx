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
});

const selectors = mapStateToProps({
  user: getUser,
  pets: getPets,
  loading: getPetsLoading,
});

class Profile extends React.Component {
  renderPets() {
    const { pets, loading } = this.props;

    if (!loading) {
      return pets.map(pet => (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={pet.get('name')} src={pet.get('avatar')} />
          </ListItemAvatar>
          <ListItemText
            primary={pet.get('name')}
          />
        </ListItem>
      ));
    }

    return [];
  }

  render() {
    const { classes, pets, loading } = this.props;

    return (
      <Grid container className={classes.container}>
        {pets && (
          <List className={classes.listContainer}>
            {this.renderPets()}
          </List>
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

Profile.propTypes = {
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

Profile.defaultProps = {
  user: {},
  pets: [],
};

export default withRouter(connect(selectors)(withStyles(styles)(Profile)));
