import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PetsIcon from '@material-ui/icons/Pets';
import SettingsIcon from '@material-ui/icons/Settings';

const config = [
  {
    text: 'Profile',
    path: '/account',
    icon: <AccountCircleIcon />,
  },
  {
    text: 'Pets',
    path: '/account/pets',
    icon: <PetsIcon />,
  },
  {
    text: 'Settings',
    path: '/account/settings',
    icon: <SettingsIcon />,
  },
]

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
  container: {
    marginTop: '24px',
  }
});

class Account extends React.Component {
  renderMenuItems() {
    const { classes, location } = this.props;

    return config.map(({ text, path, icon }, index) => {
      return (
        <MenuItem key={index} className={classes.menuItem} selected={Boolean(location.pathname.match(path))}>
          <ListItemIcon className={classes.icon}>
            {icon}
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary={text} />
        </MenuItem>
      );
    })
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
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  user: PropTypes.object,
};

export default withStyles(styles)(Account);
