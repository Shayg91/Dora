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
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";

import ChildCareIcon from "@material-ui/icons/ChildCare";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import "./Scenarios.css";

import Scenario from "./partials/Scenario";
import NewScenario from "./partials/NewScenario";

class Scenarios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scenarios: [],
      ref_main: firebase.firestore().collection("scenario"),
      add_new: false,
      added: false,
      selected_scenario: null
    };

    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleScenarioSelected = this.handleScenarioSelected.bind(this);
    this.getAllScenarios();
  }

  render() {
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
          spacing={6}
        >
          <Grid item className="sidenav" md={2}>
            <Button
              color="secondary"
              variant="contained"
              className="add-btn"
              onClick={this.handleToggleClick}
            >
              <AddIcon />
              <Typography>Add New Scenario</Typography>
            </Button>
            <List component="nav">
              {this.state.scenarios.map(doc => (
                <ListItem
                  button
                  selected={this.state.selectedIndex === 0}
                  onClick={event => this.handleScenarioSelected(doc)}
                >
                  <ListItemIcon>
                    <ChildCareIcon />
                  </ListItemIcon>
                  <ListItemText primary={doc.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item className="content">
            <div>
              {this.state.selected_scenario == null && !this.state.add_new ? (
                "No Scenario Selected"
              ) : !this.state.add_new ? (
                this.state.selected_scenario.name
              ) : (
                <NewScenario addScenario={this.handleSubmit} />
              )}
            </div>
          </Grid>
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

  handleScenarioSelected(doc) {
    if (this.state.add_new) {
      this.setState(state => ({
        add_new: !state.add_new,
        selected_scenario: doc
      }));
    } else {
      this.setState(state => ({
        selected_scenario: doc
      }));
    }
  }

  getAllScenarios() {
    let currentComponent = this;
    this.state.ref_main.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        currentComponent.setState(state => ({
          scenarios: [...state.scenarios, doc.data()]
        }));
      });
    });
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ added: false });
  };

  handleToggleClick() {
    this.setState(state => ({
      add_new: !state.add_new,
      selected_scenario: null
    }));
  }

  handleSubmit = new_scenario => {
    this.setState(state => ({
      added: !state.added,
      add_new: !state.add_new,
      scenarios: [...state.scenarios, new_scenario]
    }));
    console.log("updated");
  };
}

export default Scenarios;

/* <h3>Scenarios</h3>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="stretch"
        >
          {!this.state.add_new ? <NewScenario /> : null}
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
        /> */
