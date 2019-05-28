import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/List";
import ListItemText from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/List";
import IconButton from "@material-ui/core/List";
import DeleteIcon from "@material-ui/icons/Close";

class GoalsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <List>
          {this.props.goals.map((goal, i) => (
            <ListItem key={i}>
              <div>{goal}</div>
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="Delete"
                  onClick={e => {
                    this.props.removeGoal(i);
                  }}
                >
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
