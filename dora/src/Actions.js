import React, { Component } from "react";
import firebase from "./scripts/Dora";
import Grid from "@material-ui/core/Grid";
import {
  TextField,
  Button,
  MenuItem,
  Paper,
  Snackbar,
  IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import "./Actions.css";

import Action from "./partials/Action";

class Actions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actions: [],
      ref: firebase.firestore().collection("action"),
      add_new: true,
      added: false,
      data: {
        level: 1,
        textOrWAV: "",
        affectPath: ""
      }
    };

    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentDidMount() {
    this.getAllActions();
  }

  getAllActions() {
    let currentComponent = this;

    this.state.ref.get().then(function(querySnapshot) {
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
    this.state.ref.add(this.state.data);
    this.setState(state => ({
      added: !state.added,
      add_new: !state.add_new,
      data: {
        level: 1,
        textOrWAV: "",
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

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ added: false });
  };

  render() {
    return (
      <div className="main">
        <h3>Actions</h3>
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
                    id="question"
                    label="Question"
                    fullWidth
                    value={this.state.data.textOrWAV}
                    onChange={this.handleFieldChange("textOrWAV")}
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
                      Level 1
                    </MenuItem>
                    <MenuItem key="2" value="2">
                      Level 2
                    </MenuItem>
                    <MenuItem key="3" value="3">
                      Level 3
                    </MenuItem>
                  </TextField>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleSubmit}
                  >
                    Save
                  </Button>
                </form>
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
          <Action data={this.state.actions} />
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
          message={<span id="message-id">Action Added Succsessfully!</span>}
          action={[
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

export default Actions;
