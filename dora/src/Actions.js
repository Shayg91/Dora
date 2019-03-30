import React, { Component } from "react";
import firebase from "./scripts/Dora";
import Grid from "@material-ui/core/Grid";
import {
  TextField,
  Button,
  MenuItem,
  Paper,
  Snackbar,
  IconButton,
  Tooltip
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import StarIcon from "@material-ui/icons/Star";
import ThreeSixtyIcon from "@material-ui/icons/ThreeSixty";
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
      questionInput: true,
      data: {
        level: 1,
        textOrWAV: "",
        affectPath: ""
      }
    };

    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.changeQuestionInput = this.changeQuestionInput.bind(this);
    this.addPicture = this.addPicture.bind(this);
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

  changeQuestionInput() {
    this.setState(state => ({
      questionInput: !state.questionInput
    }));
  }

  addPicture() {}

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
                direction="row"
                justify="flext-start"
                alignItems="center"
                spacing={16}
              >
                <form className="new-action-modal">
                  <Grid
                    direction="row"
                    container
                    justify="flext-start"
                    alignItems="flex-end"
                    spacing={16}
                  >
                    {this.state.questionInput ? (
                      <TextField
                        id="question"
                        className="question"
                        multiline
                        label="Question"
                        value={this.state.data.textOrWAV}
                        onChange={this.handleFieldChange("textOrWAV")}
                        margin="normal"
                      />
                    ) : (
                      <TextField
                        id="question"
                        className="question"
                        multiline
                        label="Other"
                        value={this.state.data.textOrWAV}
                        onChange={this.handleFieldChange("textOrWAV")}
                        margin="normal"
                      />
                    )}
                    {this.state.questionInput ? (
                      <div>
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="raised-button-file"
                          type="file"
                          onChange={this.handleFieldChange("affectPath")}
                        />
                        <label htmlFor="raised-button-file">
                          <Tooltip title="Add Picture" placement="top">
                            <Button component="span">
                              <AddIcon color="secondary" />
                            </Button>
                          </Tooltip>
                        </label>
                      </div>
                    ) : null}

                    <Tooltip title="Change Input Type" placement="top">
                      <Button onClick={this.changeQuestionInput}>
                        <ThreeSixtyIcon color="secondary" />
                      </Button>
                    </Tooltip>
                  </Grid>
                  <Grid
                    direction="row"
                    container
                    justify="flext-start"
                    alignItems="center"
                    spacing={16}
                  >
                    <TextField
                      id="level"
                      label="Level"
                      select
                      value={this.state.data.level}
                      onChange={this.handleFieldChange("level")}
                      margin="normal"
                    >
                      <MenuItem key="1" value="1">
                        <StarIcon color="secondary" />
                      </MenuItem>
                      <MenuItem key="2" value="2">
                        <StarIcon color="secondary" />
                        <StarIcon color="secondary" />
                      </MenuItem>
                      <MenuItem key="3" value="3">
                        <StarIcon color="secondary" />
                        <StarIcon color="secondary" />
                        <StarIcon color="secondary" />
                      </MenuItem>
                    </TextField>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.handleSubmit}
                    >
                      Save
                    </Button>
                  </Grid>
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
            {this.state.add_new ? "Add New Action" : "Close"}
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
          message={<span id="message-id">Action Added Successfully!</span>}
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
