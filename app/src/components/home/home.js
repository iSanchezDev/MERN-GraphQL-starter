import React, { Component } from 'react';
import './home.css';
import Login from './../login/login';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Home extends Component {
  render() {

    const {isAuthenticated} = this.props.auth;

    if (!isAuthenticated) return <Login/>;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{height: '70vh'}}
      >
        <Grid item xs={12}>
          <Typography component="h2" variant="h1" gutterBottom>
            WELCOME
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Home);
