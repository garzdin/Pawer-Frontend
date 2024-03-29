import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';

import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PetsIcon from '@material-ui/icons/Pets';
import SettingsIcon from '@material-ui/icons/Settings';

const config = [
  {
    key: 'profile',
    text: 'Profile',
    path: '/account',
    icon: <AccountCircleIcon />,
  },
  {
    key: 'pets',
    text: 'Pets',
    path: '/account/pets',
    icon: <PetsIcon />,
  },
  {
    key: 'settings',
    text: 'Settings',
    path: '/account/settings',
    icon: <SettingsIcon />,
  },
];

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  container: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  link: {
    textDecoration: 'inherit',
    color: 'inherit',
    cursor: 'auto',
  },
});

class Account extends React.Component {
  renderMenuItems() {
    const { classes, activeMenuItem } = this.props;

    return config.map(({
      key, text, path, icon,
    }) => (
      <Link key={key} to={path} className={classes.link}>
        <MenuItem
          key={key}
          className={classes.menuItem}
          selected={key === activeMenuItem}
        >
          <ListItemIcon className={classes.icon}>
            {icon}
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary={text} />
        </MenuItem>
      </Link>
    ));
  }

  render() {
    const { classes, children } = this.props;

    return (
      <Grid container spacing={24} className={classes.container}>
        <Grid item xs={12} md={3}>
          <Paper>
            <MenuList>
              {this.renderMenuItems()}
            </MenuList>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper>{children}</Paper>
        </Grid>
      </Grid>
    );
  }
}

Account.propTypes = {
  children: PropTypes.node,
  location: PropTypes.shape({
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.object,
  }).isRequired,
  classes: PropTypes.shape({
    menuItem: PropTypes.string,
    container: PropTypes.string,
  }).isRequired,
  activeMenuItem: PropTypes.string,
  user: PropTypes.shape({
    className: PropTypes.string,
    id: PropTypes.string,
    _localId: PropTypes.string,
    _objCount: PropTypes.number,
  }),
};

Account.defaultProps = {
  children: null,
  activeMenuItem: 'profile',
  user: {},
};

export default withStyles(styles)(Account);
