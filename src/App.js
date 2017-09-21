import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';

import AppHeader from './components/AppHeader';
import RuleEntry from './components/RuleEntry';
import RedirectionRules from './components/RedirectionRules';
import RuleList from './components/RuleList';

import './App.css';

const theme = createMuiTheme();
const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
    justify: 'center',
    align: 'flex-start',
    direction: 'row'
  }
});

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      rules: [],
      selected: {}
    }
  }

  handleAddRule = (rule) => {
    this.setState({
      rules: [...this.state.rules, rule]
    });
  }

  handleRemoveRule = (rule) => {
    const { rules } = this.state;
    const currentIndex = rules.indexOf(rule);
    const newRules = [...rules];

    if (currentIndex === -1) {
      return;
    }
    newRules.splice(currentIndex, 1);
    this.setState({
      rules: newRules,
      selected: {}
    });
  }

  handleHover = (rule) => {
    this.setState({
      selected: rule
    });
  }

  handleUnHover = () => {
    this.setState({
      selected: {}
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container spacing={0} className="App" align="flex-start" justify="center">
          <AppHeader />
          <Grid container spacing={0} style={{paddingBottom: '2em'}} justify="center">
            <Grid item xs={10} md={6}>
              <RuleEntry onAddRule={this.handleAddRule} />
            </Grid>
          </Grid>
          <Grid container spacing={0} style={{paddingBottom: '2em', marginBottom: '6em'}} justify="center">
            <Grid item xs={10} md={4}>
              <RuleList rules={this.state.rules} onHighlight={this.handleHover} onUnHighlight={this.handleUnHover} onRemoveRule={this.handleRemoveRule} />
            </Grid>
            <Grid item xs={10} md={6}>
              <RedirectionRules rules={this.state.rules} selected={this.state.selected} />
            </Grid>
          </Grid>
          <Grid container spacing={0} style={{padding: '4em 2em', backgroundColor: 'darkGrey', color: 'white'}} justify="center">
            <Grid item xs={12}>
              <footer>
                <p>Built with love by <a href="https://twitter.com/willdages">Will Dages</a>.</p>
                <p>All code is open source with the MIT license: <a href="https://github.com/willdages/s3rr.com/">Github</a>.</p>
              </footer>
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
