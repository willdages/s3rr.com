import React, { Component } from 'react';
import RedirectionRule from './RedirectionRule';
import './RedirectionRules.css';
const builder = require('xmlbuilder');
var pd = require('pretty-data').pd;

class RedirectionRules extends Component {

  render() {
    let rules = [];
    for (let rule of this.props.rules) {
      rules.push(RedirectionRule(rule).object)
    }

    let rr = {
      RoutingRules: {
        RoutingRule: rules
      }
    };
    var xml = rules.length ? builder.begin().ele(rr).end({allowEmpty: true, pretty: true}) : '';
    var selection = Object.keys(this.props.selected).length ? '<RoutingRule>' + builder.begin().ele(RedirectionRule(this.props.selected).object).end({allowEmpty: true}) + '</RoutingRule>' : '';
    let xmlSelected = pd.xml(selection);

    return (
      <div style={{textAlign: 'left'}}>
        <h5>{selection.length ? 'Single rule:' : 'Complete Ruleset:'}</h5>
        <pre className="redirectionRules" style={{textAlign: 'left', minHeight: '400px'}}>
          {selection.length ? xmlSelected : xml.length ? xml : null}
        </pre>
      </div>
    );
  }
}

export default RedirectionRules;
