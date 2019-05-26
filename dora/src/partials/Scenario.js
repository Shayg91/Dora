import React, { Component } from "react";
import firebase from "../scripts/Dora";
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
          {this.props.data.waitFor.typeOfInput != "mulChoice" ? (
            <Typography component="p">
              Answer: {this.props.data.waitFor.expectedAnswer.input}
            </Typography>
          ) : (
            <Typography component="p">
              Correct Answer:
              {this.props.data.waitFor.expectedAnswer.input.split(",")[0]}
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  /* How this function should work:
  - Get the ID of the scenario that we whant to delete
  - Check if any lesson containes the scenario as a starting scenario. 
    If connected - show message.
  - Check if any scenario uses the scenario as next scenario.
    If connected - show message.
  - If nothing is connected - delete scenario.   
  */
  handleDelete = event => {
    let scenarioToDelete = this.props.data.name;

    let continuingScenario = [];
    console.log("deleted");
  };

  isConnectedToLessons = name => {
    let lessonsWithScenario = [];
    firebase
      .firestore()
      .collection("sole_jr_comp_app_lessons")
      .where("scenariosInLesson", "array-contains", name)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          lessonsWithScenario = [...lessonsWithScenario, doc];
        });

        if (lessonsWithScenario.length > 0) {
          return false;
        }

        return true;
      });
  };

  isConnectedToScenarios = name => {
    let connectedScenarios = [];
    firebase
      .firestore()
      .collection("Scenarios")
      .where("onfailure/nextScenarioID", "==", name)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          connectedScenarios = [...connectedScenarios, doc];
        });

        if (connectedScenarios.length > 0) {
          return false;
        }

        return true;
      });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
}

export default Scenario;
