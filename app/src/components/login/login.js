import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {loginUser} from '../../services/auth.service';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  root: {
    top: '25vh',
    position: 'absolute'
  },
  paper: {
    ...theme.mixins.gutters(),
    height: 502,
    padding: theme.spacing.unit * 2,
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
  input: {
    display: 'flex',
    flexWrap: 'wrap',
  }
});

class Login extends Component {

  state = {
    password: '',
    showPassword: false,
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };


  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = () => {

    const {email, password} = this.state;
    const data = {email, password};

    loginUser(data).then(res => {
      console.log(res)
    })
  };

  render() {
    const {classes} = this.props;

    return (
      <Grid container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.root}>
        <Grid item xs={12} sm={8} md={4} className={classes.paper}>
          <Paper>
            <LinearProgress variant="determinate" value={100}/>
            <Paper className={classes.paper} elevation={1}>
              <Typography variant="headline" className={classes.margin}>
                Login
              </Typography>
              <Typography variant="subheading" className={classes.margin} style={{color: '#6f6f6f'}}>
                 React App
              </Typography>

              <Grid>
                <Grid xs={12}>
                  <div style={{marginRight: 14}}>
                    <TextField
                      id="email"
                      fullWidth
                      style={{marginTop: 20}}
                      variant="outlined"
                      label="Email"
                      value={this.state.weight}
                      onChange={this.handleChange('email')}
                      helperText="Email account access"
                      InputProps={{
                        endAdornment:
                          <InputAdornment position="end">
                            <IconButton aria-label="Toggle password visibility">
                              <AccountCircle/>
                            </IconButton>
                          </InputAdornment>,
                      }}
                    />
                    <TextField
                      id="outlined-adornment-password"
                      fullWidth
                      style={{marginTop: 20}}
                      variant="outlined"
                      type={this.state.showPassword ? 'text' : 'password'}
                      label="Password"
                      value={this.state.password}
                      onChange={this.handleChange('password')}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Toggle password visibility"
                              onClick={this.handleClickShowPassword}
                            >
                              {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start">
                <Grid item>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                      alert("Password recovery isn't implemented yet!");
                    }}>
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>

              <Grid container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{height: 150, marginLeft: 0}}
                    className={classes.margin}>
                <Grid item xs={4}>
                  <Button color="primary" className={classes.button}>
                    Sign up
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color="secondary" onClick={() => this.handleSubmit()}>
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
