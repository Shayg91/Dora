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
  CardContent
} from "@material-ui/core";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import StarIcon from "@material-ui/icons/Star";
import "./Scenarios.css";

import Scenario from "./partials/Scenario";
import NewScenario from "./partials/NewScenario";

class Scenarios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scenarios: [],
      ref_main: firebase.firestore().collection("scenario"),
      add_new: true,
      added: false,
      selected_scenario: null
    };

    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.getAllScenarios();
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

  handleToggleClick() {
    this.setState(state => ({
      add_new: !state.add_new
    }));
  }

  handleSubmit(event) {
    this.state.ref_main.add(this.state.data);
    this.setState(state => ({
      added: !state.added,
      add_new: !state.add_new
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
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        spacing={6}
      >
        <Grid item className="sidenav" md={2}>
          <List component="nav">
            {this.state.scenarios.map(doc => (
              <ListItem
                button
                selected={this.state.selectedIndex === 0}
                onClick={event => this.handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <ChildCareIcon />
                </ListItemIcon>
                <ListItemText primary={doc.data().name} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item className="content" md={10}>
          <div>jhjksdhjkhdfkjxdhfkjd</div>
        </Grid>
      </Grid>
    );
  }

  handleScenarioSelected(scenario) {
    this.setState(
      {
        selected_scenario: scenario
      },
      console.log(this.state.selected_scenario)
    );
  }
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
