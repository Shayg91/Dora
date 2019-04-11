import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { TextField, Button, Paper, Grid, MenuItem } from "@material-ui/core";
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
          spacing={16}
        >
          <Grid
            direction="row"
            container
            justify="flext-start"
            alignItems="flex-end"
            spacing={16}
          >
            <TextField
              id="name"
              label="Title"
              fullWidth
              value={this.state.data.name}
              onChange={this.handleFieldChange("name")}
              margin="normal"
            />
            <TextField
              id="level"
              label="Level"
              select
              value={this.state.data.level}
              onChange={this.handleFieldChange("level")}
              margin="normal"
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
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={16}
          >
            {this.state.data.actions.length !== 1 ? (
              <NewAction addAction={this.handleActionSubmit} />
            ) : (
              <Action data={this.state.data.actions} />
            )}
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

  handleFieldChange = field => event => {
    let data = { ...this.state.data };
    data[field] = event.target.value;
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
}

export default NewScenario;
