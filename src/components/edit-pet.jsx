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

class EditPet extends React.Component {
  constructor(props) {
    super(props);

    const { pet } = props;

    const name = pet.get && pet.get('name');
    const breed = pet.get && pet.get('breed');
    const info = pet.get && pet.get('info');
    const avatar = pet.get && pet.get('avatar') && pet.get('avatar').url();

    this.state = {
      name,
      breed,
      info,
      avatar,
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
    const { updatePet, user, pet } = this.props;
    const {
      name,
      breed,
      info,
      avatar,
      avatarPreview,
    } = this.state;

    e.preventDefault();

    const changes = {};

    const { id } = pet;

    if (name) {
      changes.name = name;
    }

    if (breed) {
      changes.breed = breed;
    }

    if (info) {
      changes.info = info;
    }

    if (avatarPreview) {
      changes.avatar = avatar;
    }

    if (user) {
      changes.owner = user;
    }

    if (id && changes) {
      updatePet(id, changes);
    }
  }

  setRef(name, r) {
    this[name] = r;
  }

  render() {
    const { classes, petsLoading } = this.props;
    const {
      name,
      breed,
      info,
      avatar,
      avatarPreview,
    } = this.state;

    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} md={3} className={classes.avatarContainer}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Input className={classes.avatarUploadField} ref={r => this.setRef('avatar', r)} onChange={e => this.onChange('avatar', e)} id="avatar" name="avatar" accept="image/*" type="file" />
              <InputLabel htmlFor="avatar">
                <Tooltip title={avatar ? 'Change' : 'Add'} aria-label={avatar ? 'Change' : 'Add'} placement="top">
                  <Avatar alt={`${name}`} src={avatarPreview || avatar} className={classes.avatar} />
                </Tooltip>
              </InputLabel>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={9} className={classes.fieldsContainer}>
          <form onSubmit={e => e.preventDefault()}>
            <Typography>Pet Profile</Typography>
            <Grid container direction="column">
              <Grid container spacing={spacing.unit}>
                <Grid item md={6} xs={12}>
                  <FormControl margin="dense" required fullWidth>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input ref={r => this.setRef('name', r)} onChange={e => this.onChange('name', e)} id="name" name="name" autoComplete="name" value={name} />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl margin="dense" required fullWidth>
                    <InputLabel htmlFor="breed">Breed</InputLabel>
                    <Input ref={r => this.setRef('breed', r)} onChange={e => this.onChange('breed', e)} id="breed" name="breed" autoComplete="breed" value={breed} />
                  </FormControl>
                </Grid>
              </Grid>
              <Typography className={classes.sectionHeader}>Pet Information</Typography>
              <FormControl margin="dense" required fullWidth>
                <InputLabel htmlFor="info">Info</InputLabel>
                <Input ref={r => this.setRef('info', r)} onChange={e => this.onChange('info', e)} id="info" name="info" autoComplete="info" value={info} />
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
                    disabled={petsLoading}
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

EditPet.propTypes = {
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
  pet: PropTypes.shape({
    className: PropTypes.string,
    id: PropTypes.string,
    _localId: PropTypes.string,
    _objCount: PropTypes.number,
    get: PropTypes.func,
  }),
  updatePet: PropTypes.func.isRequired,
  petsLoading: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

EditPet.defaultProps = {
  user: {},
  match: {},
  pet: {},
};

export default withStyles(styles)(EditPet);
