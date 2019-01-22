import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2,
  },
  inline: {
    display: 'inline',
  },
  link: {
    textDecoration: 'inherit',
    color: 'inherit',
  },
  listContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  infoLabel: {
    textAlign: 'center',
    marginBottom: theme.spacing.unit,
  },
});

class Pets extends React.Component {
  renderPets() {
    const { classes, pets, petsLoading } = this.props;

    if (!petsLoading) {
      return pets.map(pet => (
        <Link key={() => pet.get('id')} to={`/account/pets/edit/${pet.id}/`} className={classes.link}>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt={pet.get('name')} src={pet.get('avatar') && pet.get('avatar').url()} />
            </ListItemAvatar>
            <ListItemText
              primary={pet.get('name')}
              secondary={pet.get('breed')}
            />
          </ListItem>
        </Link>
      ));
    }

    return [];
  }

  render() {
    const { classes, pets, petsLoading } = this.props;

    return (
      <Grid container direction="column" className={classes.container}>
        {pets.length === 0 && petsLoading && (
          <Grid item className={classes.infoLabel}>
            <Typography>Loading...</Typography>
          </Grid>
        )}
        {pets.length === 0 && !petsLoading && (
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
                disabled={petsLoading}
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
  petsLoading: PropTypes.bool.isRequired,
};

Pets.defaultProps = {
  user: {},
  pets: [],
};

export default withStyles(styles)(Pets);
