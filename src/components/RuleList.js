import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import RuleListItem from './RuleListItem';
import List from 'material-ui/List';

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

  constructor (props) {
    super(props);
    this.state = {
      copied: false
    }
  }

  render() {
    const { classes } = this.props;
    // if (!this.props.rules.length) {
    //   return <div className={classes.root}></div>;
    // }
    return (
      <div className={classes.root}>
        <List subheader={<h5>Rules</h5>}>
          {this.props.rules.length ? this.props.rules.map(rule => <RuleListItem rule={rule} key={rule.from} {...this.props} />) : null}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(RuleList);
