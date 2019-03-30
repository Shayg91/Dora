import React, { Component } from "react";
import firebase from "./scripts/Dora";
import {
    TextField,
    Button,
    Paper,
    Snackbar,
    IconButton,
    InputLabel,
    Chip,
    Grid,
    FormControl,
    Select,
    Input,
    MenuItem
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import StarIcon from "@material-ui/icons/Star";
import "./Scenarios.css";

import Scenario from "./partials/Scenario";

class Scenarios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scenarios: [],
      actions: [],
      ref_main: firebase.firestore().collection("scenario"),
      ref_secondary: firebase.firestore().collection("action"),
      add_new: true,
      added: false,
      data: {
        title: "",
        level: 1,
        actions: [],
        affectPath: ""
      }
    };

    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.getAllScenarios();
    this.getAllActions();
  }

  getAllScenarios() {
    let currentComponent = this;
    this.state.ref_main.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        currentComponent.setState(state => ({
          scenarios: [...state.scenarios, doc]
        }));
      });
    });
  }

  getAllActions() {
    let currentComponent = this;
    this.state.ref_secondary.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        currentComponent.setState(state => ({
          actions: [...state.actions, doc]
        }));
      });
    });
  }

  handleToggleClick() {
    this.setState(state => ({
      add_new: !state.add_new
    }));
  }

  handleSubmit(event) {
    this.state.ref_main.add(this.state.data);
    this.setState(state => ({
      added: !state.added,
      add_new: !state.add_new,
      data: {
        title: "",
        level: 1,
        actions: "",
        affectPath: ""
      }
    }));
    event.preventDefault();
  }

  handleFieldChange = field => event => {
      let data = { ...this.state.data };
      data[field] = event.target.value;
      this.setState({ data });
  };

  handleChange = event => {
      this.setState({
          data: { ...this.state.data, actions: event.target.value }
        });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ added: false });
  };

  handleChangeMultiple = event => {
      const { options } = event.target;
      const value = [];
      for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
              value.push(options[i].value);
          }
      }
      this.setState({
          data: { ...this.state.data, scenarios: value }
      });
  };


    render() {
    return (
      <div className="main">
        <h3>Scenarios</h3>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="stretch"
        >
          {!this.state.add_new ? (
            <Paper className="paper">
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
                spacing={16}
              >
                <form>
                  <TextField
                    id="title"
                    label="Title"
                    fullWidth
                    value={this.state.data.title}
                    onChange={this.handleFieldChange("title")}
                    margin="normal"
                  />
                  <br />
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
                <FormControl fullWidth>
                    <InputLabel htmlFor="select-multiple-chip">
                        Select actions for this scenario:
                    </InputLabel>
                    <Select
                        multiple
                        value={this.state.data.actions}
                        onChange={this.handleChange}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={selected => (
                            <div>
                                {selected.map(value => (
                                    <Chip key={value} label={value} />
                                ))}
                            </div>
                        )}
                    >
                        {this.state.actions.map(doc => (
                            <MenuItem key={doc.id} value={doc.data().textOrWAV}>
                                {doc.data().textOrWAV}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </form>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.handleSubmit}
                >
                  Save
                </Button>
              </Grid>
            </Paper>
          ) : null}
          <Button
            variant="contained"
            className="add-new-btn"
            color="secondary"
            onClick={this.handleToggleClick}
          >
            {this.state.add_new ? "Add New Scenario" : "Close"}
          </Button>
          <Scenario data={this.state.scenarios} />
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={this.state.added}
          color="secondary"
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={<span id="message-id">Scenario Added Successfully!</span>}
          scenario={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

export default Scenarios;
