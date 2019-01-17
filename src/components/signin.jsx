import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Redirect, withRouter } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';

import Paper from '@material-ui/core/Paper';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import { mapStateToProps } from '../utils';

import { signIn } from '../services/parse';

import { getUser, getSignInPending, getSignInError } from '../selectors';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
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
    this.onSubmit = this.onSubmit.bind(this);
    this.setRef = this.setRef.bind(this);
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

  setRef(name, r) {
    this[name] = r;
  }

  render() {
    const {
      classes,
      location,
      user,
      pending,
      error,
    } = this.props;

    return (
      user ? (
        <Redirect
          to={{
            pathname: '/',
            state: { from: location },
          }}
        />
      ) : (
        <Paper className={classes.paper}>
          {error.message && <p>{error.message}</p>}
          <form className={classes.form} onSubmit={e => e.preventDefault()}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input ref={r => this.setRef('email', r)} onChange={e => this.onChange('email', e)} id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input ref={r => this.setRef('password', r)} onChange={e => this.onChange('password', e)} name="password" type="password" id="password" autoComplete="current-password" />
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
  classes: PropTypes.shape({
    paper: PropTypes.string,
    avatar: PropTypes.string,
    form: PropTypes.string,
    submit: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.shape({
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.object,
  }).isRequired,
  pending: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    className: PropTypes.string,
    id: PropTypes.string,
    _localId: PropTypes.string,
    _objCount: PropTypes.number,
  }),
  error: PropTypes.shape({
    message: PropTypes.string,
    fileName: PropTypes.string,
    lineNumber: PropTypes.string,
  }),
};

SignIn.defaultProps = {
  error: {},
  user: {},
};

export default withRouter(connect(selectors)(withStyles(styles)(SignIn)));
