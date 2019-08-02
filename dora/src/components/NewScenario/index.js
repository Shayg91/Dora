import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";

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
  Typography,
  Select
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";

import NewAction from "../NewAction";
import NewSuccess from "../NewSuccess";
import NewAnswer from "../NewAnswer";

import TextAnalyzer from "../TextAnalyzer";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  container: {
    width: "50%"
  },
  title: {
    padding: theme.spacing(2)
  },
  level: {
    padding: theme.spacing(2)
  },
  innerCard: {
    padding: theme.spacing(2)
  }
}));

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
    const { key, data, allActions } = this.state;
    return (
      <NewScenarioBase
        data={data}
        actions={allActions}
        handleFieldChange={this.handleFieldChange}
        submit={this.onSubmit}
        submitAction={this.handleActionSubmit}
        handleNewAction={this.handleNewAction}
        handleAnswerSubmit={this.handleAnswerSubmit}
        handleSuccessSubmit={this.handleSuccessSubmit}
        handleFailureSubmit={this.handleFailureSubmit}
        finish={this.closeDialog}
        edit={this.props.edit}
      />
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
  };

  handleSuccessSubmit = success => {
    this.setState(
      {
        data: { ...this.state.data, onSuccess: success }
      },
      event => this.onSubmit(event)
    );
  };

  handleFailureSubmit = failure => {
    this.setState(
      {
        data: { ...this.state.data, onfailure: failure }
      },
      event => this.onSubmit(event)
    );
  };
}

const NewScenarioBase = ({
  data,
  actions,
  handleFieldChange,
  submit,
  submitAction,
  handleNewAction,
  handleAnswerSubmit,
  handleSuccessSubmit,
  handleFailureSubmit,
  finish,
  edit
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="flex-start"
            className={classes.container}
          >
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item style={{ display: "flex", margin: 20 }}>
                <TextField
                  id="name"
                  label="Title"
                  value={data.name}
                  onChange={handleFieldChange("name")}
                  onBlur={submit}
                  style={{ flex: 1, width: 360 }}
                />
                <Select
                  id="level"
                  label="Level"
                  value={data.level}
                  onChange={handleFieldChange("level")}
                  onBlur={submit}
                  style={{ alignSelf: "flex-end", marginLeft: 20, width: 150 }}
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
                </Select>
              </Grid>
            </Grid>

            <Grid
              container
              direction="column"
              justify="space-evenly"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant="subtitle1" gutterBottom>
                  Question Info:
                </Typography>
              </Grid>

              <Grid container direction="row">
                <Grid item className={classes.innerCard}>
                  {actions.map(x => (
                    <NewAction
                      actionNum={x.key}
                      addAction={submitAction}
                      data={x.value}
                    />
                  ))}
                </Grid>
              </Grid>

              <Grid item>
                <Button
                  onClick={handleNewAction}
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
              justify="space-evenly"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant="subtitle1" gutterBottom>
                  Answer Info:
                </Typography>
              </Grid>
              <Grid item className={classes.innerCard}>
                <NewAnswer addAnswer={handleAnswerSubmit} data={data.waitFor} />
              </Grid>
            </Grid>

            <Grid
              container
              direction="column"
              justify="space-evenly"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant="subtitle1" gutterBottom>
                  What Should happen if the student answers correctly?:
                </Typography>
              </Grid>
              <Grid item className={classes.innerCard}>
                <NewSuccess
                  addSuccess={handleSuccessSubmit}
                  data={data.onSuccess}
                />
              </Grid>
            </Grid>

            <Grid
              container
              direction="column"
              justify="space-evenly"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant="subtitle1" gutterBottom>
                  What Should happen if the student answers incorrectly?:
                </Typography>
              </Grid>
              <Grid item className={classes.innerCard}>
                <NewSuccess
                  addSuccess={handleFailureSubmit}
                  data={data.onfailure}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.container}
          >
            <Grid
              container
              direction="column"
              justify="flex-end"
              alignItems="flex-end"
            >
              <Grid item>
                <Button onClick={finish} color="secondary" variant="text">
                  Finish
                </Button>
              </Grid>
            </Grid>

            <Grid item>
              {edit ? (
                <Typography variant="h6">
                  Text To Scenario Feature is currently not available in Edit
                  Mode
                </Typography>
              ) : (
                <TextAnalyzer scenarioData={data} />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default withFirebase(NewScenario);
