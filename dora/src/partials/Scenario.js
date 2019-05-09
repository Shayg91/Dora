import React, { Component } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  IconButton,
  Menu,
  MenuItem
} from "../../node_modules/@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import "./Scenario.css";

class Scenario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  render() {
    return (
      <Card>
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon onClick={this.handleClick} />
            </IconButton>
          }
          title={this.props.data.name}
          subheader={this.props.data.level}
        />
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
          <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
        </Menu>
        <CardMedia image={this.props.data.actions[0].whatToPlay} />
        <CardContent>
          <Typography component="p">
            Question: {this.props.data.actions[0].textOrWav}
          </Typography>
          <img src={this.props.data.actions[0].whatToPlay} />
          <Typography component="p">
            Answer: {this.props.data.waitFor.expectedAnswer.input}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleDelete = event => {
    // TODO: create a delete method
    console.log("deleted");
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
}

export default Scenario;
