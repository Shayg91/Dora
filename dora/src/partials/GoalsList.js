import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/List";
import ListItemText from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/List";
import IconButton from "@material-ui/core/List";
import DeleteIcon from "@material-ui/icons/Delete";

class GoalsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <List>
          {this.props.goals.map(goal => (
            <ListItem>
              <ListItemText primary={goal} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={this.handleDelete}>
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

export default GoalsList;
