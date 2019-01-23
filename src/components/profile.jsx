import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import spacing from '@material-ui/core/styles/spacing';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  avatarContainer: {
    padding: theme.spacing.unit * 2,
    alignSelf: 'center',
  },
  avatarUploadField: {
    display: 'none',
  },
  avatar: {
    width: theme.spacing.unit * 12,
    height: theme.spacing.unit * 12,
    '&:hover': {
      backgroundColor: 'black',
    },
    '&:hover img': {
      opacity: 0.6,
    },
  },
  fieldsContainer: {
    padding: theme.spacing.unit * 2,
  },
  sectionHeader: {
    marginTop: theme.spacing.unit * 2,
  },
  buttonContainer: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarPreview: null,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  onChange(name, e) {
    const file = e.target.files && e.target.files.length > 0 && e.target.files[0];

    if (file) {
      this.setState({ avatarPreview: URL.createObjectURL(file), [name]: file });
    } else {
      this.setState({ [name]: e.target.value });
    }
  }

  async onSubmit(e) {
    const { user, updateUser } = this.props;
    const { avatarPreview } = this.state;

    e.preventDefault();

    const oldEmail = user.getEmail && user.getEmail();
    const oldFirstName = user.get && user.get('firstName');
    const oldLastName = user.get && user.get('lastName');
    const oldAddress = user.get && user.get('address');
    const oldCity = user.get && user.get('city');
    const oldPostalCode = user.get && user.get('postalCode');
    const oldCountry = user.get && user.get('country');

    const email = this.email.value;
    const firstName = this.firstName.value;
    const lastName = this.lastName.value;
    const address = this.address.value;
    const city = this.city.value;
    const postalCode = this.postalCode.value;
    const country = this.country.value;
    const password = this.password.value;
    const repeatPassword = this.repeatPassword.value;
    const avatar = this.avatar.files.length > 0 ? this.avatar.files[0] : null;

    const fields = {};

    if (email !== oldEmail) {
      fields.email = email;
    }

    if (oldFirstName !== firstName) {
      fields.firstName = firstName;
    }

    if (oldLastName !== lastName) {
      fields.lastName = lastName;
    }

    if (oldAddress !== address) {
      fields.address = address;
    }

    if (oldCity !== city) {
      fields.city = city;
    }

    if (oldPostalCode !== postalCode) {
      fields.postalCode = postalCode;
    }

    if (oldCountry !== country) {
      fields.country = country;
    }

    if (password && password === repeatPassword) {
      fields.password = password;
    }

    if (avatarPreview) {
      fields.avatar = avatar;
    }

    if (fields) {
      updateUser(user, fields);
    }
  }

  setRef(name, r) {
    this[name] = r;
  }

  render() {
    const { classes, user, updatingUser } = this.props;
    const { avatarPreview } = this.state;

    const email = user.getEmail && user.getEmail();
    const firstName = user.get && user.get('firstName');
    const lastName = user.get && user.get('lastName');
    const address = user.get && user.get('address');
    const city = user.get && user.get('city');
    const postalCode = user.get && user.get('postalCode');
    const country = user.get && user.get('country');
    const avatar = user.get && user.get('avatar') && user.get('avatar').url && user.get('avatar').url();

    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} md={3} className={classes.avatarContainer}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Input className={classes.avatarUploadField} inputRef={r => this.setRef('avatar', r)} onChange={e => this.onChange('avatar', e)} id="avatar" name="avatar" accept="image/*" type="file" />
              <InputLabel htmlFor="avatar">
                <Tooltip title="Change" aria-label="Change" placement="top">
                  <Avatar alt={`${firstName} ${lastName}`} src={avatarPreview || avatar} className={classes.avatar} />
                </Tooltip>
              </InputLabel>
            </Grid>
            <Grid item zeroMinWidth>
              <Typography component="h3" variant="subtitle1" noWrap>
                {`${firstName} ${lastName}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={9} className={classes.fieldsContainer}>
          <form onSubmit={e => e.preventDefault()}>
            <Typography>Account Information</Typography>
            <Grid container direction="column">
              <FormControl margin="dense" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input key={email} inputRef={r => this.setRef('email', r)} id="email" name="email" autoComplete="email" defaultValue={email || ''} disabled />
              </FormControl>
              <Typography className={classes.sectionHeader}>Personal Information</Typography>
              <Grid container spacing={spacing.unit}>
                <Grid item md={6} xs={12}>
                  <FormControl margin="dense" required fullWidth>
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <Input key={firstName} inputRef={r => this.setRef('firstName', r)} id="firstName" name="firstName" autoComplete="firstName" defaultValue={firstName || ''} />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl margin="dense" required fullWidth>
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <Input key={lastName} inputRef={r => this.setRef('lastName', r)} id="lastName" name="lastName" autoComplete="lastName" defaultValue={lastName || ''} />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={spacing.unit}>
                <Grid item md={6} xs={12}>
                  <FormControl margin="dense" required fullWidth>
                    <InputLabel htmlFor="address">Address</InputLabel>
                    <Input key={address} inputRef={r => this.setRef('address', r)} id="address" name="address" autoComplete="address" defaultValue={address || ''} />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl margin="dense" required fullWidth>
                    <InputLabel htmlFor="city">City</InputLabel>
                    <Input key={city} inputRef={r => this.setRef('city', r)} id="city" name="city" autoComplete="city" defaultValue={city || ''} />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={spacing.unit}>
                <Grid item md={6} xs={12}>
                  <FormControl margin="dense" required fullWidth>
                    <InputLabel htmlFor="postalCode">Postal Code</InputLabel>
                    <Input key={postalCode} inputRef={r => this.setRef('postalCode', r)} id="postalCode" name="postalCode" autoComplete="postalCode" defaultValue={postalCode || ''} />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl margin="dense" required fullWidth>
                    <InputLabel htmlFor="country">Country</InputLabel>
                    <Input key={country} inputRef={r => this.setRef('country', r)} id="country" name="country" autoComplete="country" defaultValue={country || ''} />
                  </FormControl>
                </Grid>
              </Grid>
              <Typography className={classes.sectionHeader}>Password Management</Typography>
              <Grid container spacing={spacing.unit}>
                <Grid item md={6} xs={12}>
                  <FormControl margin="dense" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input inputRef={r => this.setRef('password', r)} id="password" name="password" type="password" placeholder="•••••••••••••••••" />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl margin="dense" required fullWidth>
                    <InputLabel htmlFor="repeatPassword">Repeat Password</InputLabel>
                    <Input inputRef={r => this.setRef('repeatPassword', r)} id="repeatPassword" name="repeatPassword" type="password" placeholder="•••••••••••••••••" />
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
                    disabled={updatingUser}
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
  updateUser: PropTypes.func.isRequired,
  updatingUser: PropTypes.bool.isRequired,
};

Profile.defaultProps = {
  user: {},
};

export default withStyles(styles)(Profile);
