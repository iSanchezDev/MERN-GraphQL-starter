import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Home from './../components/home/home';
import Navbar from './../components/navbar/navbar';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar/>
        <Home/>
      </div>
    );
  }
}

export default connect()(App);
