import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Button  } from '@material-ui/core';
import './App.css';

class App extends Component 
{
  render() {
    return (
      <div>
        <Typography variant="h3" color="textPrimary">Welcome to Duel Masters</Typography>
        <Button color="primary" onClick={() => this.props.awsSignOut()}>Sign Out</Button>
      </div>
    );
  }
}

export default App;
