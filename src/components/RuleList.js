import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 450,
    background: theme.palette.background.paper,
  },
});

class RuleList extends Component {
  static defaultProps = {
    onRemoveRule: () => {}
  }

  render() {
    const { classes } = this.props;
    if (!this.props.rules.length) {
      return <div className={classes.root}></div>;
    }
    return (
      <div className={classes.root}>
        <List subheader={<ListSubheader>Rules</ListSubheader>}>
          {this.props.rules.map(rule => (
            <ListItem key={rule.from} style={{cursor: 'pointer'}} onMouseLeave={this.props.onUnHighlight.bind(this, rule)} onMouseEnter={this.props.onHighlight.bind(this, rule)}>
              <ListItemText primary={`${rule.from} --> ${rule.to}`} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={event => this.props.onRemoveRule(rule)} onMouseLeave={this.props.onUnHighlightDestructively.bind(this, rule)} onMouseEnter={this.props.onHighlightDestructively.bind(this, rule)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(RuleList);
