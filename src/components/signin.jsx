import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { Redirect, withRouter } from "react-router-dom";

import { connect } from "react-redux";

import { mapStateToProps } from '../utils';

import { signIn } from '../services/parse';
import { getUser, getSignInPending, getSignInError } from '../selectors';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const selectors = mapStateToProps({
  user: getUser,
  pending: getSignInPending,
  error: getSignInError,
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
    };

    this.onChange = this.onChange.bind(this);
    this.setRef = this.setRef.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setRef(name, r) {
    this[name] = r;
  }

  onChange(name, e) {
    this.setState({ [name]: e.target.value });
  }

  async onSubmit(e) {
    const { dispatch } = this.props;
    const { email, password } = this.state;

    e.preventDefault();

    if (email && password) {
      dispatch(signIn(email, password));
    }
  }

  render() {
    const { classes, location, user, pending, error } = this.props;

    return (
      user ? (
        <Redirect
          to={{
            pathname: '/',
            state: { from: location }
          }}
        />
      ) : (
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <p>{error.message}</p>
          <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input ref={(r) => this.setRef('email', r)} onChange={(e) => this.onChange('email', e)} id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input ref={(r) => this.setRef('password', r)} onChange={(e) => this.onChange('password', e)} name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onSubmit}
              disabled={pending}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      )
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
};

export default withRouter(connect(selectors)(withStyles(styles)(SignIn)));
