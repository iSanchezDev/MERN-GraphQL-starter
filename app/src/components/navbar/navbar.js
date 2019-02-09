import React, { Component } from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';


class Navbar extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            React & Material-UI Application
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
