import React, { Component } from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import connect from 'react-redux/es/connect/connect';
import {logout} from '../../actions/auth.actions';
import withStyles from '@material-ui/core/es/styles/withStyles';
import * as PropTypes from 'prop-types';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  }
};

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.logout()
  }

  render() {

    const {classes} = this.props;
    const {isAuthenticated} = this.props.auth;

    return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.grow}>
            React + Redux + Material UI + JWT auth + GraphQL (Boilerplate)
          </Typography>
          {isAuthenticated &&
            <Button color="inherit" onClick={this.logout}>Logout</Button>
          }
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    logout: () => dispatch(logout()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar));
