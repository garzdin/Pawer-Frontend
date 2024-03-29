import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';

import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import { Redirect, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { mapStateToProps, mapDispatchToActions } from '../utils';

import { signUp as signUpMethod } from '../services/parse';
import { getUser, getSignUpPending, getSignUpError } from '../selectors';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  buttonContainer: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  tos: {
    paddingTop: theme.spacing.unit,
  },
});

const selectors = mapStateToProps({
  user: getUser,
  pending: getSignUpPending,
  error: getSignUpError,
});

const actions = mapDispatchToActions({
  signUp: signUpMethod,
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.setRef = this.setRef.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.getSteps = this.getSteps.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
  }

  async onSubmit(e) {
    const { signUp } = this.props;

    const email = this.email.value;
    const password = this.password.value;
    const repeatPassword = this.repeatPassword.value;
    const firstName = this.firstName.value;
    const lastName = this.lastName.value;
    const address = this.address.value;
    const city = this.city.value;
    const postalCode = this.postalCode.value;
    const country = this.country.value;
    const tosAccepted = this.tosAccepted.checked;

    e.preventDefault();

    const fields = {};

    if (email) {
      fields.email = email;
    }

    if (password && password === repeatPassword) {
      fields.password = password;
    }

    if (firstName) {
      fields.firstName = firstName;
    }

    if (lastName) {
      fields.lastName = lastName;
    }

    if (address) {
      fields.address = address;
    }

    if (city) {
      fields.city = city;
    }

    if (postalCode) {
      fields.postalCode = postalCode;
    }

    if (country) {
      fields.country = country;
    }

    if (tosAccepted) {
      fields.tosAccepted = tosAccepted;
    }

    if (fields) {
      signUp(fields);
    }
  }

  getSteps() { // eslint-disable-line class-methods-use-this
    return ['Account details', 'Personal details', 'Terms of service'];
  }

  setRef(name, r) {
    this[name] = r;
  }

  getStepContent() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    switch (activeStep) {
      case 0:
        return (
          <React.Fragment>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input ref={r => this.setRef('email', r)} id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input ref={r => this.setRef('password', r)} name="password" type="password" id="password" autoComplete="password" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="repeatPassword">Repeat Password</InputLabel>
              <Input ref={r => this.setRef('repeatPassword', r)} name="repeatPassword" type="password" id="repeatPassword" autoComplete="repeatPassword" />
            </FormControl>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input ref={r => this.setRef('firstName', r)} id="firstName" name="firstName" autoComplete="firstName" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <Input ref={r => this.setRef('lastName', r)} name="lastName" id="lastName" autoComplete="lastName" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="address">Address</InputLabel>
              <Input ref={r => this.setRef('address', r)} name="address" id="address" autoComplete="address" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="city">City</InputLabel>
              <Input ref={r => this.setRef('city', r)} name="city" id="city" autoComplete="city" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="postalCode">Postal Code</InputLabel>
              <Input ref={r => this.setRef('postalCode', r)} name="postalCode" id="postalCode" autoComplete="postalCode" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="country">Country</InputLabel>
              <Input ref={r => this.setRef('country', r)} name="country" id="country" autoComplete="country" />
            </FormControl>
          </React.Fragment>
        );
      case 2:
        return (
          /* eslint-disable max-len */
          <React.Fragment>
            <Typography className={classes.tos}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum varius quam, quis tempor urna. Phasellus tincidunt venenatis ipsum sodales tincidunt. Phasellus egestas lobortis dolor at vehicula. Sed in euismod nulla. Vestibulum semper fringilla mauris, in vehicula lacus euismod non. Fusce non tincidunt odio, nec blandit arcu. Sed vitae ante at velit eleifend imperdiet in at neque. In et auctor libero.</Typography>
            <Typography className={classes.tos}>Cras tempor, risus non porttitor molestie, mauris neque iaculis lacus, sit amet consectetur sem quam nec lacus. Curabitur venenatis eget lectus vitae auctor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec rhoncus ut arcu pellentesque iaculis. Maecenas a quam at massa pulvinar malesuada. Nullam auctor, libero ut semper tincidunt, arcu magna mollis leo, ut sagittis velit turpis id sem. Vivamus accumsan, nunc aliquam maximus tempor, dui massa accumsan orci, vitae</Typography>
            <Typography className={classes.tos}>pellentesque tortor leo ut mi. Ut id augue neque. Fusce justo mauris, scelerisque vitae dui nec, malesuada auctor eros.</Typography>
            <Typography className={classes.tos}>Quisque viverra, diam et cursus tincidunt, ante enim vestibulum lectus, a malesuada velit justo at nisi. Etiam luctus risus ac consectetur venenatis. Quisque at tellus nisi. Sed vel laoreet metus, id maximus nisl. Nulla et iaculis mi. Donec et viverra mi. Integer bibendum convallis egestas. Nullam non ex nisl. Ut dolor est, commodo a vehicula suscipit, feugiat id dolor. Nullam nisl arcu, eleifend et volutpat in, sagittis vitae est. Maecenas ut sapien ultrices, tincidunt erat</Typography>
            <Typography className={classes.tos}>et, hendrerit sem. Nulla hendrerit dignissim libero. Duis mollis ex a diam bibendum, non commodo diam auctor. Proin sit amet nibh pharetra quam condimentum faucibus at eu nibh.</Typography>
            <Typography className={classes.tos}>Quisque ac dui et magna congue bibendum vitae ac libero. Cras scelerisque enim eu urna efficitur, sit amet faucibus tortor lobortis. In sagittis in massa et tincidunt. In ac ultricies neque, at eleifend massa. Phasellus lobortis mattis lorem. Suspendisse ex est, finibus id justo sed, consequat molestie sem. Pellentesque tempor lectus vel risus lacinia, eget accumsan elit faucibus. Nulla vel cursus elit, nec hendrerit urna. Fusce porttitor nisl a dapibus posuere. Nam risus justo,</Typography>
            <Typography className={classes.tos}>pulvinar ut imperdiet nec, finibus vitae turpis.</Typography>
            <Typography className={classes.tos}>Fusce turpis sem, pulvinar accumsan purus at, consequat placerat lorem. Vivamus tincidunt sodales arcu. Morbi ac nunc eu neque faucibus accumsan. Phasellus rutrum in neque in lobortis. Phasellus sed interdum leo, eu pulvinar leo. Sed pulvinar purus id tempus sodales. Donec non consequat mauris. Cras ut felis nec turpis pulvinar cursus ut vel lorem. Nam mollis magna eros, nec aliquet leo pharetra ut.</Typography>
            <FormGroup row>
              <FormControlLabel
                control={(
                  <Checkbox
                    inputRef={r => this.setRef('tosAccepted', r)}
                    value="tosAccepted"
                  />
                )}
                label="I have read and accept the terms of service"
              />
            </FormGroup>
          </React.Fragment>
          /* eslint-disable */
        );
      default:
        return null;
    }
  }

  handleNext() {
    const { activeStep } = this.state;

    this.setState({ activeStep: activeStep + 1 });
  }

  handleBack() {
    const { activeStep } = this.state;

    this.setState({ activeStep: activeStep - 1 });
  }

  render() {
    const {
      classes, location, user, pending, error,
    } = this.props;
    const { activeStep } = this.state;
    const steps = this.getSteps();

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
          <Grid container direction="column">
            <Grid item xs={12}>
              <Stepper activeStep={activeStep}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
            {error.message && (
              <Grid container direction="column">
                <Grid item xs={12}>
                  <p>{error.message}</p>
                </Grid>
              </Grid>
            )}
            <form className={classes.form} onSubmit={e => e.preventDefault()}>
              {this.getStepContent()}
              <Grid container direction="row">
                <Grid item xs={6} className={classes.buttonContainer}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                    fullWidth
                  >
                    Previous
                  </Button>
                </Grid>
                <Grid item xs={6} className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={activeStep === steps.length - 1 ? this.onSubmit : this.handleNext}
                    className={classes.button}
                    disabled={pending}
                    fullWidth
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Paper>
      )
    );
  }
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    paper: PropTypes.string,
    form: PropTypes.string,
    buttonContainer: PropTypes.string,
    button: PropTypes.string,
    instructions: PropTypes.string,
    tos: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.object,
  }).isRequired,
  pending: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  user: PropTypes.object,
};

SignUp.defaultProps = {
  user: {},
};

export default withRouter(connect(selectors, actions)(withStyles(styles)(SignUp)));
