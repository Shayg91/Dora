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
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";

var imgStyle = {
  height: "300px"
  // paddingTop: "25%" // 16:9
};

class Scenario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    return (
      <Card onDoubleClick={this.props.editScenario}>
        <CardHeader
          action={
            <IconButton onClick={this.handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.scenario.value.name}
          subheader={"Level: " + this.props.scenario.value.level}
        />
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.props.editScenario}>Edit</MenuItem>
          <MenuItem onClick={this.props.deleteScenario}>Delete</MenuItem>
        </Menu>
        <CardMedia
          style={imgStyle}
          image={
            this.props.scenario.value.actions[0]
              ? this.props.scenario.value.actions[0].whatToPlay
              : null
          }
        />
        <CardContent>
          <Typography variant="h6">
            Actions and Questions:{" "}
            {this.props.scenario.value.actions.map(x => (
              <Typography variant="body1">{x.textOrWav}</Typography>
            ))}
          </Typography>
          {this.props.scenario.value.waitFor.typeOfInput !== "mulChoice" ? (
            <Typography variant="h6">
              Answer:{" "}
              <Typography variant="body1">
                {this.props.scenario.value.waitFor.expectedAnswer.input}
              </Typography>
            </Typography>
          ) : (
            <div>
              <Typography variant="h6">
                Correct Answer:
                <Typography variant="body1">
                  {
                    this.props.scenario.value.waitFor.expectedAnswer.input.split(
                      ","
                    )[0]
                  }
                </Typography>
              </Typography>
              <Typography variant="h6">
                Incorrect Answers:
                <Typography variant="body1">
                  {
                    this.props.scenario.value.waitFor.expectedAnswer.input.split(
                      ","
                    )[1]
                  }
                </Typography>
                <Typography variant="body1">
                  {
                    this.props.scenario.value.waitFor.expectedAnswer.input.split(
                      ","
                    )[2]
                  }
                </Typography>
                <Typography variant="body1">
                  {
                    this.props.scenario.value.waitFor.expectedAnswer.input.split(
                      ","
                    )[3]
                  }
                </Typography>
              </Typography>
            </div>
          )}
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

export default Scenario;
