import React, { Component } from "react";

import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";

class Lesson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };

    this.handleEdit = this.handleEdit.bind(this);
  }

  render() {
    return (
      <Card>
        <CardHeader
          action={
            <IconButton onClick={this.handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.lesson.value.title}
          subheader={this.props.lesson.category}
        />
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
          <MenuItem onClick={this.props.deleteLesson}>Delete</MenuItem>
        </Menu>
        <CardContent>
          <Typography component="p">
            Goals:
            <ol>
              {this.props.lesson.value.goals.map(listItem => (
                <li>{listItem}</li>
              ))}
            </ol>
          </Typography>
          <Typography component="p">
            Scenarios in Lesson:
            <ol>
              {this.props.lesson.value.scenariosInLesson.map(listItem => (
                <li>{listItem}</li>
              ))}
            </ol>
          </Typography>
        </CardContent>
      </Card>
    );
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleEdit = () => {
    this.props.handleEdit();
  };
}

export default Lesson;
