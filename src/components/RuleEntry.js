import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import arrow from '../images/arrow.svg';
import './RuleEntry.css';
const parse = require('url-parse');


const styles = theme => ({
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class RuleEntry extends Component {
  blankRule = {
    protocol: '',
    url: '',
    code: 302,
    permanent: true,
    from: '',
    to: '',
    toInput: ''
  }

  static defaultProps = {
    onAddRule: () => {}
  }

  constructor (props) {
    super(props);
    this.state = this.blankRule;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAddRule(this.state);
    this.setState(this.blankRule);
    this.fromInput.focus();
  }

  handleToChange = (e) => {
    let url = e.target.value;
    console.log(url)
    let parsed = parse(url);
    if (parsed.hostname === 'localhost' && e.target.value.indexOf('localhost') === -1) {
      parsed.hostname = '';
    }
    if (/^(\/h|\/ht|\/htt|\/http|\/https|\/https:|\/http:|\/https:\/|\/http:\/)/.test(parsed.pathname) && parsed.pathname.length <= 8) {
      console.log(true);
      parsed.pathname = '';
    }
    this.setState({
      ...this.state,
      protocol: parsed.protocol.replace(/:/g, ''),
      url: parsed.hostname,
      to: parsed.pathname + parsed.query,
      toInput: url
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <form onSubmit={this.handleSubmit}>
          <Grid container align="flex-end" justify="center">
            <Grid item xs={12}>
              <h3>Add Rule</h3>
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField
                placeholder="/campaign"
                label="From"
                autoFocus
                value={this.state.from}
                className={classes.textField}
                helperText="The path inside your S3 bucket"
                margin="normal"
                fullWidth
                required
                inputRef={(el) => {this.fromInput = el}}
                onChange={(e) => {this.setState({ ...this.state, from: e.target.value} )}}
              />
            </Grid>
            <Hidden smDown>
              <Grid item xs={12} md={2} >
                <img src={arrow} className="arrow" alt="Right arrow" />
              </Grid>
            </Hidden>
            <Grid item xs={10} md={5}>
              <TextField
                placeholder="https://example.com/special"
                label="To"
                className={classes.textField}
                helperText="Include the entire domain"
                margin="normal"
                fullWidth
                required
                value={this.state.toInput}
                onChange={this.handleToChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button raised color="primary" className={classes.button} type="submit">Add Redirect</Button>
            </Grid>
          </Grid>
        </form>
        {/* <pre>
          {RedirectionRule(this.state.newRule).string}
        </pre> */}
      </Paper>
    );
  }
}

export default withStyles(styles)(RuleEntry);
