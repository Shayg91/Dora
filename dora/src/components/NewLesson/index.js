import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { makeStyles } from "@material-ui/core/styles";
import ReactEditableList from "react-editable-list";

import {
  MenuItem,
  Grid,
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  Select,
  FormControl,
  InputLabel,
  Input,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";

import IconButton from "@material-ui/core/List";
import DeleteIcon from "@material-ui/icons/Close";

import { INITIAL_STATE_LESSON } from "../../constants/initializers";

import "./style.css";

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
  goals: {
    paddingTop: theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  menu: {
    width: 200
  }
}));

const NewLessonPage = () => (
  <div>
    <NewLessonForm />
  </div>
);

class NewLessonBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: { ...INITIAL_STATE_LESSON },
      scenarios: [],
      key: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleGoalChanged = this.handleGoalChanged.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.edit) {
      this.setState({ data: this.props.data.value, key: this.props.data.key });
      console.log(this.props.data.value);
    } else {
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

  handleGoalChanged = list => {
    this.setState({
      data: { ...this.state.data, goals: list }
    });
  };

  handleFieldChange = field => event => {
    let data = { ...this.state.data };
    data[field] = event.target.value;
    this.setState({ data });
  };

  handleChange = place => event => {
    let data = this.state.data;

    data.scenariosInLesson[place] = event.target.value;

    this.setState(state => ({
      data: data
    }));
  };

  closeDialog = event => {
    const { data, key } = this.state;
    this.props.closeLesson(key, data);

    event.preventDefault();
  };

  onSubmit = event => {
    const { data, key } = this.state;

    const currentContext = this;
    this.props.firebase.db
      .collection("sole_jr_comp_app_lessons")
      .doc(key)
      .set(data)
      .then(docRef => {
        console.log(currentContext);
        currentContext.props.addNewLesson(key, data);
        console.log("Updated Lesson: " + docRef.id);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { data, scenarios } = this.state;

    return (
      <NewLessonView
        data={data}
        scenarios={scenarios}
        closeDialog={this.closeDialog}
        handleGoalChanged={this.handleGoalChanged}
        handleFieldChange={this.handleFieldChange}
        handleScenarioChanged={this.handleChange}
        submit={this.onSubmit}
      />
    );
  }
}

const NewLessonView = ({
  data,
  scenarios,
  handleGoalChanged,
  closeDialog,
  handleFieldChange,
  handleScenarioChanged,
  submit
}) => {
  const classes = useStyles();
  let scenario1 = data.scenariosInLesson[0] ? data.scenariosInLesson[0] : null,
    scenario2 = data.scenariosInLesson[1] ? data.scenariosInLesson[1] : null,
    scenario3 = data.scenariosInLesson[2] ? data.scenariosInLesson[2] : null,
    scenario4 = data.scenariosInLesson[3] ? data.scenariosInLesson[3] : null,
    scenario5 = data.scenariosInLesson[4] ? data.scenariosInLesson[4] : null;

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
            <Grid container>
              <Grid item sm={12}>
                <TextField
                  id="title"
                  label="Lesson Title"
                  fullWidth
                  value={data.title}
                  onChange={handleFieldChange("title")}
                  onBlur={submit}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item sm={12}>
                <TextField
                  id="category"
                  label="Category"
                  fullWidth
                  value={data.category}
                  onChange={handleFieldChange("category")}
                  onBlur={submit}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item sm={12} className={classes.goals}>
                <Typography variant="subtitle1" gutterBottom>
                  Lesson Goals:
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Press the ADD Button to add a new Goal to this Lesson
                </Typography>
                <ReactEditableList
                  list={data.goals}
                  onListUpdated={handleGoalChanged}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item sm={12} className={classes.goals}>
                <Typography variant="subtitle1" gutterBottom>
                  Scenarios in Lesson:
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  You can choose up to 5 Starting Scenarios. The scenarios will
                  be played out one after another - with nested scenarios played
                  first.
                </Typography>
                <TextField
                  id="scenario-select"
                  select
                  label="First Scenario"
                  className={classes.textField}
                  value={scenario1}
                  onChange={handleScenarioChanged(0)}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  margin="normal"
                >
                  {scenarios.map(option => (
                    <MenuItem key={option.key} value={option.value.name}>
                      {option.value.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="scenario-select"
                  select
                  label="Second Scenario"
                  className={classes.textField}
                  value={scenario2}
                  onChange={handleScenarioChanged(1)}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  margin="normal"
                >
                  {scenarios.map(option => (
                    <MenuItem key={option.key} value={option.value.name}>
                      {option.value.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="scenario-select"
                  select
                  label="Third Scenario"
                  className={classes.textField}
                  value={scenario3}
                  onChange={handleScenarioChanged(2)}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  margin="normal"
                >
                  {scenarios.map(option => (
                    <MenuItem key={option.key} value={option.value.name}>
                      {option.value.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="scenario-select"
                  select
                  label="Fourth Scenario"
                  className={classes.textField}
                  value={scenario4}
                  onChange={handleScenarioChanged(3)}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  margin="normal"
                >
                  {scenarios.map(option => (
                    <MenuItem key={option.key} value={option.value.name}>
                      {option.value.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="scenario-select"
                  select
                  label="Fifth Scenario"
                  className={classes.textField}
                  value={scenario5}
                  onChange={handleScenarioChanged(4)}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  margin="normal"
                >
                  {scenarios.map(option => (
                    <MenuItem key={option.key} value={option.value.name}>
                      {option.value.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            direction="column"
            justify="flex-end"
            alignItems="flex-end"
            className={classes.container}
          >
            <Grid item>
              <Button color="secondary" variant="text" onClick={closeDialog}>
                Finish
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const NewLessonForm = withFirebase(NewLessonBase);

export default NewLessonPage;

export { NewLessonForm };
