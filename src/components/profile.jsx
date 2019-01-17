import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import { updateEmail } from '../services/parse';

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

class Profile extends React.Component {
  constructor(props) {
    super(props);

    const email = props.user.getEmail();

    this.state = {
      email,
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
    const { email } = this.state;

    e.preventDefault();

    const oldEmail = user.getEmail();

    if (email !== oldEmail) {
      dispatch(updateEmail(user, email));
    }
  }

  setRef(name, r) {
    this[name] = r;
  }

  render() {
    const { classes, user } = this.props;
    const { email } = this.state;

    const username = user.getUsername();

    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} md={3} className={classes.avatarContainer}>
          <Grid container direction="column">
            <Grid item>
              <Avatar alt="" src="" className={classes.avatar} />
            </Grid>
            <Grid item zeroMinWidth>
              <Typography component="h3" variant="subtitle1" className={classes.name} noWrap>
                {username}
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
  }),
};

Profile.defaultProps = {
  user: {},
};

export default withRouter(connect()(withStyles(styles)(Profile)));
