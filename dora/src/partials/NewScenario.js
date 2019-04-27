import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import firebase from "../scripts/Dora";

import {
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  Typography
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";

import "./NewScenario.css";
import NewAction from "./NewAction";
import NewSuccess from "./NewSuccess";
import NewAnswer from "./NewAnswer";
import NewFailure from "./NewFailure";

class NewScenario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ref_main: firebase.firestore().collection("scenario"),
      data: {
        name: "",
        level: 1,
        actions: [],
        waitFor: {
          expectedAnswer: {
            input: "",
            successRating: 0
          },
          typeOfWaiting: 1,
          typeOfInput: ""
        },
        onSuccess: {
          action: {
            effect: 1,
            textOrWAV: "",
            whatToPlay: ""
          },
          nextScenarioID: ""
        },
        onfailure: {
          action: { effect: 1, textOrWAV: "", whatToPlay: "" },
          numOfRetries: 2,
          nextScenarioID: ""
        }
      }
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <Paper className="new-scenario-paper">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
        >
          <Grid
            className="title-block"
            direction="row"
            container
            justify="flex-start"
            alignItems="flex-end"
          >
            <Grid item sm={6}>
              <TextField
                className="title"
                id="name"
                label="Title"
                value={this.state.data.name}
                onChange={this.handleFieldChange("name")}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                className="level"
                id="level"
                label="Level"
                select
                value={this.state.data.level}
                onChange={this.handleFieldChange("level")}
              >
                <MenuItem key="1" value="1">
                  <StarIcon />
                </MenuItem>
                <MenuItem key="2" value="2">
                  <StarIcon />
                  <StarIcon />
                </MenuItem>
                <MenuItem key="3" value="3">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid container direction="row" alignContent="flex-start">
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item className="sub-titles">
                <Typography variant="subtitle2" gutterBottom>
                  Question Info:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <NewAction addAction={this.handleActionSubmit} />
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item className="sub-titles">
                <Typography variant="subtitle2" gutterBottom>
                  Answer Info:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <NewAnswer addAnswer={this.handleAnswerSubmit} />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item className="sub-titles">
              <Typography variant="subtitle2" gutterBottom>
                What should happen when there is a correct answer:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <NewSuccess addSuccess={this.handleSuccessSubmit} />
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item className="sub-titles">
              <Typography variant="subtitle2" gutterBottom>
                What should happen when there is an incorrect answer:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <NewFailure addFailure={this.handleFailureSubmit} />
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-end"
          >
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                onClick={this.handleSubmit}
              >
                Save Scenario
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  handleFieldChange = (field, caseType = 0) => event => {
    let data = { ...this.state.data };
    data[field] = event.target.value;
    if (caseType === 0) {
      data[field] = event.target.value;
    } else if (caseType === 1) {
      data["waitFor"]["expectedAnswer"][field] = event.target.value;
    }
    this.setState({ data });
  };

  handleSubmit(event) {
    this.state.ref_main.add(this.state.data);
    this.setState(state => ({
      added: !state.added,
      add_new: !state.add_new,
      data: {
        name: "",
        level: 1,
        actions: [],
        waitFor: {
          expectedAnswer: {
            input: "",
            successRating: 0
          },
          typeOfWaiting: 1,
          typeOfInput: ""
        },
        onSuccess: {
          action: {
            effect: 1,
            textOrWAV: "",
            whatToPlay: ""
          },
          nextScenarioID: ""
        },
        onfailure: {
          action: { effect: 1, textOrWAV: "", whatToPlay: "" },
          numOfRetries: 2,
          nextScenarioID: ""
        }
      }
    }));
    event.preventDefault();
  }

  handleActionSubmit = action => {
    let actionsList = [...this.state.data.actions];
    actionsList.push(action);
    this.setState({
      data: { ...this.state.data, actions: actionsList }
    });
  };

  handleAnswerSubmit = answer => {
    this.setState({
      data: { ...this.state.data, waitFor: answer }
    });
    console.log("updated");
  };

  handleSuccessSubmit = success => {
    this.setState({
      data: { ...this.state.data, onSuccess: success }
    });
    console.log("updated");
  };

  handleFailureSubmit = failure => {
    this.setState({
      data: { ...this.state.data, onfailure: failure }
    });
    console.log("updated");
  };
}

export default NewScenario;
