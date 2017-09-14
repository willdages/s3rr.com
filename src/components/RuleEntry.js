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
    toInput: 'https://'
  }

  static defaultProps = {
    onAddRule: () => {}
  }

  constructor (props) {
    super(props);
    this.state = {
      rule: this.blankRule,
      errorMessage: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.rule.url) {
      this.setState({
        errorMessage: 'Please include the full domain, including http/https and www subdomain if applicable. For example: https://s3rr.com/destination'
      });
      return false;
    }
    this.props.onAddRule(this.state.rule);
    this.setState({
      rule: {
        ...this.blankRule,
        toInput: this.state.rule.protocol === 'https' ? 'https://' : 'http://'
      }
    });
    this.fromInput.focus();
  }

  handleToChange = (e) => {
    let url = e.target.value;
    let parsed = parse(url);
    if (parsed.hostname === 'localhost' && e.target.value.indexOf('localhost') === -1) {
      parsed.hostname = '';
    }
    if (/^(\/h|\/ht|\/htt|\/http|\/https|\/https:|\/http:|\/https:\/|\/http:\/)/.test(parsed.pathname) && parsed.pathname.length <= 8) {
      parsed.pathname = '';
    }
    this.setState({
      rule: {
        ...this.state.rule,
        protocol: parsed.protocol.replace(/:/g, ''),
        url: parsed.hostname,
        to: parsed.pathname + parsed.query,
        toInput: url
      }

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
                value={this.state.rule.from}
                className={classes.textField}
                helperText="The path inside your S3 bucket"
                margin="normal"
                fullWidth
                required
                inputRef={(el) => {this.fromInput = el}}
                onChange={(e) => {this.setState({ rule: { ...this.state.rule, from: e.target.value } })}}
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
                helperText={this.state.errorMessage.length ? this.state.errorMessage : "Include the entire domain" }
                error={this.state.errorMessage.length > 0}
                margin="normal"
                fullWidth
                required
                value={this.state.rule.toInput}
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
