import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

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
import Action from "./Action";

class NewScenario extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item className="sub-titles">
              <Typography variant="subtitle2" gutterBottom>
                Action Data:
              </Typography>
            </Grid>
            <Grid item xs={6} margin="normal">
              {this.state.data.actions.length !== 1 ? (
                <NewAction addAction={this.handleActionSubmit} />
              ) : (
                <Action
                  data={this.state.data.actions}
                  deleteAction={this.handleActionDelete}
                />
              )}
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={16}
          >
            <Grid item>
              <Typography noWrap>What should we wait for?</Typography>
              <TextField
                id="answer"
                label="Answer"
                fullWidth
                value={this.state.data.waitFor.expectedAnswer.input}
                onChange={this.handleFieldChange("input", 1)}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleSubmit}
            >
              Save
            </Button>
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
        affectPath: ""
      }
    }));
    event.preventDefault();
  }

  handleActionSubmit = action => {
    console.log("got here!");
    let actionsList = [...this.state.data.actions];
    actionsList.push(action);
    this.setState({
      data: { ...this.state.data, actions: actionsList }
    });
    console.log(this.state.data);
  };

  handleActionDelete = () => {
    console.log("deleting...");
    this.setState({
      data: { ...this.state.data, actions: [] }
    });
  };
}

export default NewScenario;
