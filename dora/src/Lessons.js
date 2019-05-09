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

import "./Lessons.css";
import Lesson from "./partials/Lesson";

class Lessons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lessons: [],
      scenarios: [],
      ref_main: firebase.firestore().collection("sole_jr_comp_app_lessons"),
      ref_secondary: firebase.firestore().collection("Scenarios"),
      add_new: true,
      added: false,
      data: {
        title: "",
        category: "",
        badge: "",
        goals: "",
        scenarios: [],
        affectPath: ""
      }
    };

    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmitGoal = this.handleSubmitGoal.bind(this);
    this.getAllLessons();
    this.getAllScenarios();
  }

  getAllLessons() {
    let currentComponent = this;
    this.state.ref_main.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        currentComponent.setState(state => ({
          lessons: [...state.lessons, doc]
        }));
      });
    });
  }

  getAllScenarios() {
    let currentComponent = this;
    this.state.ref_secondary.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        currentComponent.setState(state => ({
          scenarios: [...state.scenarios, doc]
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
        category: "",
        badge: "",
        goals: "",
        scenarios: [],
        affectPath: ""
      }
    }));
    event.preventDefault();
  }

  handleSubmitGoal = () => {
    this.setState({
      goals: this.state.goals.concat("goals")
    });
  };

  handleFieldChange = field => event => {
    let data = { ...this.state.data };
    data[field] = event.target.value;
    this.setState({ data });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ added: false });
  };

  handleChange = event => {
    this.setState({
      data: { ...this.state.data, scenarios: event.target.value }
    });
  };

  render() {
    return (
      <div className="main">
        <h3>Lessons</h3>
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
                    label="Insert lesson title"
                    fullWidth
                    value={this.state.data.title}
                    onChange={this.handleFieldChange("title")}
                    margin="normal"
                  />
                  <br />
                  <TextField
                    id="category"
                    label="Insert lesson category"
                    fullWidth
                    value={this.state.data.category}
                    onChange={this.handleFieldChange("category")}
                    margin="normal"
                  />
                  <br />
                  <TextField
                    id="goals"
                    label="Insert lesson goals"
                    fullWidth
                    value={this.state.data.goals}
                    onChange={this.handleFieldChange("goals")}
                    margin="normal"
                  />
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={this.handleSubmitGoal}
                  >
                    Add Goal
                  </Button>
                  <br />
                  <br />
                  <label>Insert lesson badge: </label>{" "}
                  <input
                    type="file"
                    accept={("image/jpeg", "image/png", "video/mp4")}
                  />
                  <br />
                  <FormControl fullWidth>
                    <InputLabel htmlFor="select-multiple-chip">
                      Select Scenarios for this lesson:
                    </InputLabel>
                    <Select
                      multiple
                      value={this.state.data.scenarios}
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
                      {this.state.scenarios.map(doc => (
                        <MenuItem key={doc.id} value={doc.data().name}>
                          {doc.data().name}
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
            {this.state.add_new ? "Add New Lesson" : "Close"}
          </Button>
          <Lesson data={this.state.lessons} />
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
          message={<span id="message-id">Lesson Added Successfully!</span>}
          lesson={[
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

export default Lessons;
