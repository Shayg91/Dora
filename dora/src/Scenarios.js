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
      ref_main: firebase.firestore().collection("Scenarios"),
      add_new: false,
      added: false,
      editMode: false,
      selected_scenario: null
    };

    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleScenarioSelected = this.handleScenarioSelected.bind(this);
    this.handleScenarioEdit = this.handleScenarioEdit.bind(this);
    this.handleScenarioDelete = this.handleScenarioDelete.bind(this);
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
                  key={doc.key}
                  button
                  selected={this.state.selectedIndex === 0}
                  onClick={event => this.handleScenarioSelected(doc)}
                >
                  <ListItemIcon>
                    <ChildCareIcon />
                  </ListItemIcon>
                  <ListItemText primary={doc.value.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item className="content">
            <div>
              {// If no scenario was selected and not currently creating a new scenario and not in edit Mode
              this.state.selected_scenario == null &&
              !this.state.add_new &&
              !this.state.editMode ? (
                "No Scenario Selected"
              ) : // If not creating a new scenario and not in edit mode
              !this.state.add_new && !this.state.editMode ? (
                <Scenario
                  data={this.state.selected_scenario}
                  handleEdit={this.handleScenarioEdit}
                  onDelete={this.handleScenarioDelete}
                />
              ) : this.state.editMode ? (
                // Editing Scenario
                <NewScenario
                  addScenario={this.handleUpdate}
                  editMode={true}
                  data={this.state.selected_scenario}
                />
              ) : (
                // Creating a new scenario
                <NewScenario addScenario={this.handleSubmit} editMode={false} />
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
      console.log(doc);
    } else {
      this.setState(state => ({
        selected_scenario: doc
      }));

      console.log(doc);
    }
  }

  getAllScenarios() {
    let currentComponent = this;
    this.state.ref_main.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        currentComponent.setState(state => ({
          scenarios: [...state.scenarios, { key: doc.id, value: doc.data() }]
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

  handleSubmit = (key, new_scenario) => {
    this.setState(state => ({
      added: !state.added,
      add_new: !state.add_new,
      scenarios: [...state.scenarios, { key: key, value: new_scenario }]
    }));
    console.log("updated");
  };

  handleScenarioEdit = () => {
    this.setState(state => ({
      editMode: true
    }));
  };

  handleUpdate = data => {
    let position;
    let updated_scenarios = this.state.scenarios;
    for (let i = 0; i < this.state.scenarios.length; i++) {
      if (this.state.scenarios[i].key === this.state.selected_scenario.key) {
        position = i;
        break;
      }
    }

    updated_scenarios[position].value = data;

    this.setState(state => ({
      scenarios: updated_scenarios,
      editMode: false
    }));
  };

  handleScenarioDelete = () => {
    let scenarios = this.state.scenarios;
    let palcement = 0;

    while (palcement !== scenarios.length) {
      if (scenarios[palcement].key === this.state.selected_scenario.key) {
        break;
      } else {
        palcement++;
      }
    }

    scenarios.splice(palcement, 1);

    this.setState(state => ({
      selected_scenario: null,
      scenarios: scenarios
    }));
  };
}

export default Scenarios;
