import React, { Component } from "react";
import firebase from "../scripts/Dora";
import {
  TextField,
  Button,
  Paper,
  InputLabel,
  Chip,
  Grid,
  FormControl,
  Select,
  Input,
  MenuItem,
  Tooltip
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import FileUploader from "react-firebase-file-uploader";

import "../Lessons.css";

class NewLessons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ref_main: firebase.firestore().collection("sole_jr_comp_app_lessons"),
      scenarios_ref: firebase.firestore().collection("Scenarios"),
      scenarios: [],
      isUploading: false,
      progress: 0,
      data: {
        title: "",
        category: "",
        badge: "",
        goals: "",
        scenariosInLesson: [],
        id: -1
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmitGoal = this.handleSubmitGoal.bind(this);

    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);

    this.getAllScenarios();
  }

  render() {
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
            <Grid item sm={8}>
              <TextField
                id="title"
                label="Lesson Title"
                fullWidth
                value={this.state.data.title}
                onChange={this.handleFieldChange("title")}
              />
            </Grid>
            <Grid item sm={8}>
              <TextField
                id="category"
                label="Category"
                fullWidth
                value={this.state.data.category}
                onChange={this.handleFieldChange("category")}
              />
            </Grid>
            <Grid item sm={8}>
              <TextField
                id="goals"
                label="Lesson Goals"
                fullWidth
                value={this.state.data.goals}
                onChange={this.handleFieldChange("goals")}
              />
              <Button
                color="secondary"
                variant="contained"
                onClick={this.handleSubmitGoal}
              >
                Add Goal
              </Button>
            </Grid>
            <Grid item sm={8}>
              <div>
                <FileUploader
                  hidden
                  id="raised-button-file"
                  accept="image/*"
                  randomizeFilename
                  storageRef={firebase.storage().ref("badges")}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
                />
                <label htmlFor="raised-button-file">
                  <Tooltip title="Add Badge" placement="top">
                    <Button component="span">
                      <AddIcon color="secondary" />
                    </Button>
                  </Tooltip>
                </label>
              </div>
            </Grid>
            <Grid item sm={8}>
              <FormControl fullWidth>
                <InputLabel htmlFor="select-multiple-chip">
                  Select Scenarios for this Lesson:
                </InputLabel>
                <Select
                  multiple
                  value={this.state.data.scenariosInLesson}
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
                onClick={this.handleSubmit}
              >
                Save Lesson
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  handleSubmit(event) {
    this.state.ref_main.add(this.state.data);
    this.props.addLesson(this.state.data);
    this.setState(state => ({
      added: !state.added,
      add_new: !state.add_new,
      data: {
        title: "",
        category: "",
        badge: "",
        goals: "",
        scenariosInLesson: [],
        id: -1
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

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({
      data: { badge: filename },
      progress: 100,
      isUploading: false
    });
    firebase
      .storage()
      .ref("badges")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ data: { badge: url } }));
  };

  getAllScenarios() {
    let currentComponent = this;
    this.state.scenarios_ref.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        currentComponent.setState(state => ({
          scenarios: [...state.scenarios, doc]
        }));
      });
    });
  }
}
export default NewLessons;
