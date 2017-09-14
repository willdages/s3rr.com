import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import logo from '../images/logo.svg';

import './AppHeader.css';

const AppHeader = () => {

  return (
    <AppBar position="static" color="default" style={{marginBottom: '2em'}}>
      <Toolbar>
        <img src={logo} className="header-logo" alt="logo" />
        <Typography type="title" color="inherit">
          S3 Redirection Rules Generator
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader;
