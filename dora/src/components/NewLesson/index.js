import React, { Component } from "react";
import { withFirebase } from "../Firebase";

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
  TextField
} from "@material-ui/core";

import IconButton from "@material-ui/core/List";
import DeleteIcon from "@material-ui/icons/Close";

const NewLessonPage = () => (
  <div>
    <NewLessonForm />
  </div>
);

const INITIAL_STATE = {
  title: "",
  category: "",
  goals: [],
  scenariosInLesson: []
};

class NewLessonBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: { ...INITIAL_STATE },
      scenarios: [],
      goalToAdd: "",
      key: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmitGoal = this.handleSubmitGoal.bind(this);
    this.removeGoal = this.removeGoal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.edit) {
      this.setState({ data: this.props.data.value, key: this.props.data.key });
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

  handleSubmitGoal = event => {
    let goalsList = [...this.state.data.goals];
    goalsList.push(this.state.goalToAdd);
    this.setState({
      data: { ...this.state.data, goals: goalsList },
      goalToAdd: ""
    });
  };

  handleGoalChanged = field => event => {
    this.setState({ goalToAdd: event.target.value }, this.onSubmit(event));
  };

  handleFieldChange = field => event => {
    let data = { ...this.state.data };
    data[field] = event.target.value;
    this.setState({ data });
  };

  removeGoal = goal_index => {
    console.log("imhere", goal_index);
    let goalsList = this.state.data.goals;

    this.setState({
      data: { ...this.state.data, goals: goalsList.splice(goal_index + 1, 1) }
    });
  };

  handleChange(event) {
    let data = this.state.data;
    data.scenariosInLesson = event.target.value;

    this.setState(state => ({
      data: data
    }));
  }

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
    const { data, goalToAdd, scenarios } = this.state;

    return (
      <Paper className="new-lesson-paper">
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
            <Grid item sm={10}>
              <TextField
                id="title"
                label="Lesson Title"
                fullWidth
                value={data.title}
                onChange={this.handleFieldChange("title")}
                onBlur={this.onSubmit}
              />
            </Grid>
            <Grid item sm={10}>
              <TextField
                id="category"
                label="Category"
                fullWidth
                value={data.category}
                onChange={this.handleFieldChange("category")}
                onBlur={this.onSubmit}
              />
            </Grid>
            <Grid
              direction="row"
              container
              justify="flex-start"
              alignItems="flex-end"
            >
              <Grid item sm={8}>
                <GoalsList goals={data.goals} removeGoal={this.removeGoal} />
              </Grid>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item sm={8}>
                  <TextField
                    id="goals"
                    label="Lesson Goals"
                    fullWidth
                    value={goalToAdd}
                    onChange={this.handleGoalChanged("goalToAdd")}
                    onBlur={this.onSubmit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={this.handleSubmitGoal}
                  >
                    Add Goal
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={8}>
              <FormControl>
                <InputLabel htmlFor="select-multiple">
                  Scenarios in Lesson
                </InputLabel>
                <Select
                  multiple
                  value={data.scenariosInLesson}
                  onChange={this.handleChange}
                  input={<Input id="select-multiple" />}
                >
                  {scenarios.map(doc => (
                    <MenuItem key={doc.key} value={doc.value.name}>
                      {doc.value.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
}

const GoalsList = ({ goals }) => {
  return (
    <div>
      <List>
        {goals.map((goal, i) => (
          <ListItem key={i}>
            <div>{goal}</div>
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Delete"
                /* onClick={e => {
                  removeGoal(i);
                }} */
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const NewLessonForm = withFirebase(NewLessonBase);

export default NewLessonPage;

export { NewLessonForm };
