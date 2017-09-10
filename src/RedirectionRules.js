import React, { Component } from 'react';
const builder = require('xmlbuilder');

class RedirectionRules extends Component {

  render() {
    let rules = [];
    for (let rule of this.props.rules) {
      rules.push({
        Condition: {
          KeyPrefixEquals: rule.from
        },
        Redirect: {
          Protocol: rule.protocol,
          HostName: rule.url,
          ReplaceKeyWith: rule.to,
          HttpRedirectCode: rule.permanent === true ? 301 : 302
        }
      })
    }
    let nrule = this.props.inProgressRule;
    let ipRule = {
      Condition: {
        KeyPrefixEquals: nrule.from
      },
      Redirect: {
        Protocol: nrule.protocol,
        HostName: nrule.url,
        ReplaceKeyWith: nrule.to,
        HttpRedirectCode: nrule.permanent === true ? 301 : 302
      }
    }

    let rr = {
      RoutingRules: {
        RoutingRule: rules
      }
    };
    var root = builder.create(rr).end({pretty: true});
    let xml = root.substr('<?xml version="1.0"?>'.length+1);
    let ipxml = builder.create(ipRule).end({pretty: true}).substr('<?xml version="1.0"?>'.length+1);
    return (
      <div style={{textAlign: 'left'}}>
        <div>Full block:</div>
        <pre style={{textAlign: 'left'}}>{xml}</pre>
        <hr/>
        <div>In-progress block:</div>
        <pre style={{textAlign: 'left'}}>{ipxml}</pre>
      </div>
    );
  }
}

export default RedirectionRules;
