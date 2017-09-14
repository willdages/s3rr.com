import React, { Component } from 'react';
import RedirectionRule from './RedirectionRule';
import './RedirectionRules.css';
const builder = require('xmlbuilder');
var pd = require('pretty-data').pd;

class RedirectionRules extends Component {

  render() {
    if (!this.props.rules.length) {
      return <div></div>;
    }
    let rules = [];
    for (let rule of this.props.rules) {
      rules.push(RedirectionRule(rule).object)
    }

    let rr = {
      RoutingRules: {
        RoutingRule: rules
      }
    };

    var xml = builder.begin().ele(rr).end({allowEmpty: true});
    var selection = Object.keys(this.props.selected).length ? '<RoutingRule>' + builder.begin().ele(RedirectionRule(this.props.selected).object).end({allowEmpty: true}) + '</RoutingRule>' : '';
    let xmlBefore = pd.xml(xml.substr(0, xml.indexOf(selection)));
    let xmlSelected = pd.xml(selection);
    let xmlAfter = pd.xml(xml.substr(xml.indexOf(selection) + selection.length));

    return (
      <div style={{textAlign: 'left'}}>
        <div>Complete rule:</div>
        <pre className="redirectionRules" style={{textAlign: 'left'}}>
          {xmlBefore.length ? <span>{xmlBefore}<br/></span> : null}
          {xmlSelected.length ? <mark className={this.props.selectedDestructively ? 'danger' : ''}>{xmlSelected}<br/></mark> : null}
          {xmlAfter.length ? xmlAfter : null}
        </pre>
      </div>
    );
  }
}

export default RedirectionRules;
