import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import CopyIcon from 'material-ui-icons/ContentCopy';
import CheckCircle from 'material-ui-icons/CheckCircle';
import RedirectionRule from './RedirectionRule';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 450,
    background: theme.palette.background.paper,
  },
});

class RuleListItem extends Component {
  static defaultProps = {
    onRemoveRule: () => {}
  }

  constructor (props) {
    super(props);
    this.state = {
      copied: false
    }
  }

  handleCopy = () => {
    this.setState({
      copied: true
    });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 1500);
  }

  render() {
    let { rule } = this.props;
    return (
      <ListItem style={{cursor: 'pointer'}} onMouseLeave={this.props.onUnHighlight.bind(this, rule)} onMouseEnter={this.props.onHighlight.bind(this, rule)}>
        <ListItemText primary={`${rule.from} → ${rule.to ? rule.to : rule.toInput}`} />
        <ListItemSecondaryAction>
          <CopyToClipboard onCopy={this.handleCopy} text={RedirectionRule(rule, true).string} onMouseLeave={this.props.onUnHighlight.bind(this, rule)} onMouseEnter={this.props.onHighlight.bind(this, rule)}>
            {this.state.copied ? <CheckCircle color={'green'} /> : <IconButton aria-label="Copy" title="Copy Rule"><CopyIcon /></IconButton>}
          </CopyToClipboard>
          <IconButton aria-label="Delete" onClick={event => this.props.onRemoveRule(rule)} onMouseLeave={this.props.onUnHighlight.bind(this, rule)} onMouseEnter={this.props.onHighlight.bind(this, rule)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default withStyles(styles)(RuleListItem);
