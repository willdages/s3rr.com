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
      selected: {},
      selectedDestructively: false
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
      selected: {},
      selectedDestructively: false
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

  handleHoverDestructive = (rule) => {
    this.setState({
      selected: rule,
      selectedDestructively: true
    });
  }

  handleUnHoverDestructive = () => {
    this.setState({
      selected: {},
      selectedDestructively: false
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
          <Grid container spacing={0} style={{paddingBottom: '2em'}} justify="center">
            <Grid item xs={10} md={4}>
              <RuleList rules={this.state.rules} onHighlight={this.handleHover} onUnHighlight={this.handleUnHover} onUnHighlightDestructively={this.handleUnHoverDestructive} onHighlightDestructively={this.handleHoverDestructive} onRemoveRule={this.handleRemoveRule} />
            </Grid>
            <Grid item xs={10} md={6}>
              <RedirectionRules rules={this.state.rules} selected={this.state.selected} selectedDestructively={this.state.selectedDestructively} />
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
