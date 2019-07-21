import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { withFirebase } from "../Firebase";

import {
  INITIAL_STATE_ACTION,
  INITIAL_STATE_SCENARIO
} from "../../constants/initializers";

import {
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  Typography
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";

import NewAction from "../NewAction";
import NewSuccess from "../NewSuccess";
import NewAnswer from "../NewAnswer";
import NewFailure from "../NewFailure";

class NewScenario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: "",
      data: { ...INITIAL_STATE_SCENARIO },
      allActions: [{ key: 0, value: INITIAL_STATE_ACTION }],
      scenarios: []
    };

    if (props.edit) {
      let i = 0;
      let actions = [];

      this.props.data.value.actions.forEach(x => {
        actions.push({ key: i, value: x });
        i++;
      });

      this.state = {
        key: props.data.key,
        data: props.data.value,
        allActions: actions
      };
    }

    console.log(this.props);

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleNewAction = this.handleNewAction.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.edit) {
      const new_key = this.props.firebase.db
        .collection("sole_jr_comp_app_lessons")
        .doc();
      this.setState({ key: new_key.id });
    }

    this.props.firebase.scenarios().then(allScenarios => {
      this.setState({
        scenarios: allScenarios
      });
    });
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
                onBlur={this.onSubmit}
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
                onBlur={this.onSubmit}
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
                {this.state.allActions.map(x => (
                  <NewAction
                    actionNum={x.key}
                    addAction={this.handleActionSubmit}
                    data={x.value}
                  />
                ))}
                <Button
                  onClick={this.handleNewAction}
                  color="secondary"
                  variant="text"
                >
                  Add New Action
                </Button>
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
                <NewAnswer
                  addAnswer={this.handleAnswerSubmit}
                  data={this.state.data.waitFor}
                />
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
              <NewSuccess
                addSuccess={this.handleSuccessSubmit}
                data={this.state.data.onSuccess}
              />
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
              <NewFailure
                addFailure={this.handleFailureSubmit}
                data={this.state.data.onfailure}
              />
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
                onClick={this.closeDialog}
              >
                Close
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

  closeDialog = event => {
    const { data, key } = this.state;
    this.props.closeScenario(key, data);

    event.preventDefault();
  };

  onSubmit = event => {
    const { data, key } = this.state;

    const currentContext = this;
    this.props.firebase.db
      .collection("Scenarios")
      .doc(key)
      .set(data)
      .then(docRef => {
        console.log(currentContext);
        currentContext.props.addNewScenario(key, data);
        console.log("Updated Scenario: " + docRef.id);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  handleActionSubmit = (key, action) => {
    let actionsList = [...this.state.data.actions];
    if (actionsList.length <= key) {
      actionsList.push(action);
    } else {
      actionsList[key] = action;
    }
    this.setState(
      {
        data: { ...this.state.data, actions: actionsList }
      },
      event => this.onSubmit(event)
    );
  };

  handleNewAction = () => {
    let actions = this.state.allActions;
    actions.push({
      key: actions.length,
      value: { effect: "Smile", textOrWav: "", whatToPlay: "" }
    });

    this.setState({ allActions: actions });
  };

  handleAnswerSubmit = answer => {
    this.setState(
      {
        data: { ...this.state.data, waitFor: answer }
      },
      event => this.onSubmit(event)
    );
    console.log("updated");
  };

  handleSuccessSubmit = success => {
    this.setState(
      {
        data: { ...this.state.data, onSuccess: success }
      },
      event => this.onSubmit(event)
    );
    console.log("updated");
  };

  handleFailureSubmit = failure => {
    this.setState(
      {
        data: { ...this.state.data, onfailure: failure }
      },
      event => this.onSubmit(event)
    );
    console.log("updated");
  };
}

export default withFirebase(NewScenario);
