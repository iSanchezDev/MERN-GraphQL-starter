import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {addUser} from '../../actions/users.actions';

class SignUp extends Component {

  state = {
    open: false,
    email: '',
    password: '',
    username: '',
    language: '',
    emailRequired: false,
    passRequired: false,
  };

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    const {email, password, username, language} = this.state;

    if (_.isEmpty(email)) {
      this.setState({emailRequired: true});
    } else if (_.isEmpty(password)) {
      this.setState({passRequired: true});
    } else {
      this.props.signUp({email, password, username, language});
      this.handleClose()
    }
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {

    const {passRequired, emailRequired} = this.state;

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Sign Up
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Sign up</DialogTitle>
          <DialogContent style={{width: 450}}>
            <DialogContentText>
              Enter your new user
            </DialogContentText>
            <TextField autoFocus
                       margin="dense"
                       id="email"
                       label="Email Address"
                       type="email"
                       fullWidth
                       required
                       error={emailRequired}
                       onChange={this.handleChange('email')}
            />
            <TextField margin="dense"
                       id="password"
                       label="Password"
                       type="password"
                       fullWidth
                       required
                       error={passRequired}
                       onChange={this.handleChange('password')}
            />
            <TextField margin="dense"
                       id="username"
                       label="Username"
                       fullWidth
                       onChange={this.handleChange('username')}
            />
            <TextField margin="dense"
                       id="language"
                       label="Language"
                       fullWidth
                       onChange={this.handleChange('language')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Sign up
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    signUp: (params) => dispatch(addUser(params)),
  }
};

export default connect(null, mapDispatchToProps)(SignUp);
