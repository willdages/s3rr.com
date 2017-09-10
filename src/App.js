import React, { Component } from 'react';
import RedirectionRules from './RedirectionRules';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  blankRule = {
    protocol: '',
    url: '',
    code: 302,
    permanent: true,
    from: '',
    to: ''
  }

  constructor (props) {
    super(props);
    this.state = {
      rules: [],
      newRule: this.blankRule
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      rules: [...this.state.rules, this.state.newRule],
      newRule: this.blankRule
    });
    this.refs.from.focus();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>S3 Redirection Rules Generator</h2>
        </div>
        <ul>
          {this.state.rules.map(rule => <li key={rule.from}>{rule.from} --> {rule.to}</li>)}
        </ul>
        <RedirectionRules rules={this.state.rules} inProgressRule={this.state.newRule}/>
        <form onSubmit={this.handleSubmit}>
          <h3>Add Rule</h3>
          <label>
            Redirect from path:
            <input ref="from" required placeholder="/campaign" value={this.state.newRule.from} onChange={(e) => {this.setState({newRule: { ...this.state.newRule, from: e.target.value} })}} />
          </label>
          Redirect to:
          <label>
            Protocol
            <input placeholder="HTTPS" required value={this.state.newRule.protocol} onChange={(e) => {this.setState({newRule: { ...this.state.newRule, protocol: e.target.value} })}} />
          </label>
          <label>
            URL
            <input placeholder="domain.com" required value={this.state.newRule.url} onChange={(e) => {this.setState({newRule: { ...this.state.newRule, url: e.target.value} })}} />
          </label>
          <label>
            Path
            <input placeholder="/?utm_source=tal&utm_medium=podcast&utm_campaign=campaign" required value={this.state.newRule.to} onChange={(e) => {this.setState({newRule: { ...this.state.newRule, to: e.target.value} })}} />
          </label>
          <label>
            PErmanent?
            <input type="checkbox" required checked={this.state.newRule.permanent} onChange={(e) => {this.setState({newRule: { ...this.state.newRule, permanent: e.target.checked }})}} />
          </label>
          <button type="submit">Add This Rule</button>
        </form>
      </div>
    );
  }
}

export default App;
