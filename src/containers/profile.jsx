import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import spacing from '@material-ui/core/styles/spacing';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import { mapStateToProps } from '../utils';

import { updateEmail, updateFirstName, updateLastName } from '../services/parse';

import { getUser, getUserUpdatePending } from '../selectors';

const styles = theme => ({
  avatarContainer: {
    padding: theme.spacing.unit * 2,
  },
  avatar: {
    width: theme.spacing.unit * 8,
    height: theme.spacing.unit * 8,
    margin: 'auto',
  },
  name: {
    textAlign: 'center',
  },
  fieldsContainer: {
    padding: theme.spacing.unit * 2,
  },
  buttonContainer: {
    marginTop: theme.spacing.unit * 2,
  },
});

const selectors = mapStateToProps({
  user: getUser,
  updating: getUserUpdatePending,
});

class Profile extends React.Component {
  constructor(props) {
    super(props);

    const { user } = this.props;

    const email = user.getEmail();
    const firstName = user.get('firstName');
    const lastName = user.get('lastName');

    this.state = {
      email,
      firstName,
      lastName,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  onChange(name, e) {
    this.setState({ [name]: e.target.value });
  }

  async onSubmit(e) {
    const { dispatch, user } = this.props;
    const { email, firstName, lastName } = this.state;

    e.preventDefault();

    const oldEmail = user.getEmail();
    const oldFirstName = user.get('firstName');
    const oldLastName = user.get('lastName');


    if (email !== oldEmail) {
      dispatch(updateEmail(user, email));
    }

    if (oldFirstName !== firstName) {
      dispatch(updateFirstName(user, firstName));
    }

    if (oldLastName !== lastName) {
      dispatch(updateLastName(user, lastName));
    }
  }

  setRef(name, r) {
    this[name] = r;
  }

  render() {
    const { classes, user, updating } = this.props;
    const { email, firstName, lastName } = this.state;

    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} md={3} className={classes.avatarContainer}>
          <Grid container direction="column">
            <Grid item>
              <Avatar alt="" src="" className={classes.avatar} />
            </Grid>
            <Grid item zeroMinWidth>
              <Typography component="h3" variant="subtitle1" className={classes.name} noWrap>
                {`${user.get('firstName')} ${user.get('lastName')}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={9} className={classes.fieldsContainer}>
          <form onSubmit={e => e.preventDefault()}>
            <Grid container direction="column">
              <FormControl margin="dense" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input ref={r => this.setRef('email', r)} onChange={e => this.onChange('email', e)} id="email" name="email" autoComplete="email" value={email} />
              </FormControl>
              <Grid container spacing={spacing.unit}>
                <Grid item md={6} xs={12}>
                  <FormControl margin="dense" required fullWidth>
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <Input ref={r => this.setRef('firstName', r)} onChange={e => this.onChange('firstName', e)} id="firstName" name="firstName" autoComplete="firstName" value={firstName} />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl margin="dense" required fullWidth>
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <Input ref={r => this.setRef('lastName', r)} onChange={e => this.onChange('lastName', e)} id="lastName" name="lastName" autoComplete="lastName" value={lastName} />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container className={classes.buttonContainer}>
                <Grid item xs={6} />
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.onSubmit}
                    disabled={updating}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.shape({
    avatarContainer: PropTypes.string,
    avatar: PropTypes.string,
    name: PropTypes.string,
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
  updating: PropTypes.bool.isRequired,
};

Profile.defaultProps = {
  user: {},
};

export default withRouter(connect(selectors)(withStyles(styles)(Profile)));