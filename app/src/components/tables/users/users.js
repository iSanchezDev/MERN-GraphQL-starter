import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import {fetchUsers} from './../../../actions/users.actions';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class UsersTable extends Component {

  componentWillMount() {

    // Animation purposes
    setTimeout(() => {
      this.props.fetchUsers()
    }, 1000)
  }

  render() {
    const {classes, user} = this.props;

    const {users} = user;

    if (users.length === 0) {
      return <CircularProgress className={classes.progress} />
    }

    return (
      <div>
        <h5 style={{textAlign: 'left'}}>A GraphQL Query example</h5>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>First name</TableCell>
                <TableCell>language</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row, index) => (
                <TableRow key={`row_${index}`}>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.language}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

UsersTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchUsers: (params) => dispatch(fetchUsers(params)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UsersTable));
