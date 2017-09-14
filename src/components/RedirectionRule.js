const builder = require('xmlbuilder');

const RedirectionRule = (rule) => {

  let r = {
    Condition: {
      KeyPrefixEquals: rule.from
    },
    Redirect: {
      Protocol: rule.protocol,
      HostName: rule.url,
      ReplaceKeyWith: rule.to,
      HttpRedirectCode: rule.permanent === true ? 301 : 302
    }
  }
  var xml = builder.begin().ele(r).end({ pretty: true });
  return {
    string: xml,
    object: r
  }
}

export default RedirectionRule;
