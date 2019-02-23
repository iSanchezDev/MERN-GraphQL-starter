import React, { Component } from 'react';
import './home.css';
import Login from './../login/login';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import UsersTable from './../tables/users/users';

class Home extends Component {

  render() {

    const {isAuthenticated} = this.props.auth;

    if (!isAuthenticated) return <Login/>;

    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{height: '50vh', marginTop: 50}}
      >
        <Grid item xs={8}>
          <UsersTable/>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};

export default connect(mapStateToProps)(Home);
