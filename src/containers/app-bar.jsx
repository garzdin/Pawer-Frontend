import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { mapStateToProps, mapDispatchToActions } from '../utils';

import { getUser } from '../selectors';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'inherit',
    color: 'inherit',
    cursor: 'auto',
  },
  name: {
    paddingLeft: theme.spacing.unit,
    fontWeight: 400,
  },
});

const selectors = mapStateToProps({
  user: getUser,
});

const actions = mapDispatchToActions({});

class AppBarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };

    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { classes, user } = this.props;
    const { anchorEl } = this.state;

    const open = Boolean(anchorEl);

    const name = user && `${user.get('firstName')}`;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Pawer
            </Typography>
            {user ? (
              <React.Fragment>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                  <Typography color="inherit" className={classes.name}>{name}</Typography>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/account" className={classes.link}>Account</Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/signout" className={classes.link}>Sign out</Link>
                  </MenuItem>
                </Menu>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Button color="inherit">
                  <Link to="/signin" className={classes.link}>Sign in</Link>
                </Button>
                <Button color="inherit">
                  <Link to="/signup" className={classes.link}>Sign up</Link>
                </Button>
              </React.Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppBarContainer.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    grow: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    className: PropTypes.string,
    id: PropTypes.string,
    _localId: PropTypes.string,
    _objCount: PropTypes.number,
  }),
};

AppBarContainer.defaultProps = {
  user: {},
};

export default withRouter(connect(selectors, actions)(withStyles(styles)(AppBarContainer)));
