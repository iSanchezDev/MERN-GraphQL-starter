import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import {login, logout, verifyToken} from '../../actions/auth.actions';

import { withStyles } from '@material-ui/core/styles';
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
    loading: false,
    password: '',
    showPassword: false,
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this.props.isUserLogged()
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };


  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = () => {
    this.setState({loading: true});
    const {email, password} = this.state;
    const data = {email, password};

    // Animation purpose
    setTimeout(() => {
      this.props.loginUser(data);
      this.setState({loading: false});
    }, 1500)
  };

  render() {
    const {loading} = this.state;
    const {classes} = this.props;
    const {isFailure} = this.props.auth;

    return (
      <div>
        <Grid container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.root}>
          <Grid item xs={12} sm={8} md={4} className={classes.paper}>
            <Paper>
              <LinearProgress variant={loading ? 'indeterminate' : 'determinate'}/>
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

                {isFailure &&
                  <Typography component="h2" color="error">
                    Authentication Failed, please try again...
                  </Typography>
                }
              </Paper>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    loginUser: (params) => dispatch(login(params)),
    isUserLogged: (params) => dispatch(verifyToken(params)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
