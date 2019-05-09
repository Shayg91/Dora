import React, { Component } from "react";
import firebase from "../scripts/Dora";
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
  MenuItem
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "../Lessons.css";
import Lesson from "./Lesson";
class NewLessons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ref_main: firebase.firestore().collection("lesson"),
      data: {
        title: "",
        category: "",
        badge: "",
        goals: "",
        scenarios: [],
        affectPath: ""
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmitGoal = this.handleSubmitGoal.bind(this);
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
            <Grid item sm={6}>
              <TextField
                id="title"
                label="Insert lesson title"
                fullWidth
                value={this.state.data.title}
                onChange={this.handleFieldChange("title")}
                margin="normal"
              />
              <TextField
                id="category"
                label="Insert lesson category"
                fullWidth
                value={this.state.data.category}
                onChange={this.handleFieldChange("category")}
                margin="normal"
              />
              <TextField
                id="goals"
                label="Insert lesson goals"
                fullWidth
                value={this.state.data.goals}
                onChange={this.handleFieldChange("goals")}
                margin="normal"
              />
              <Button
                color="secondary"
                variant="contained"
                onClick={this.handleSubmitGoal}
              >
                Add Goal
              </Button>
              <br />
              <label>Insert lesson badge: </label> <br />
              <input
                type="file"
                accept={("image/jpeg", "image/png", "video/mp4")}
              />
              <FormControl fullWidth>
                <InputLabel htmlFor="select-multiple-chip">
                  Select Scenarios for this lesson:
                </InputLabel>
                <Select
                  multiple
                  value={this.state.data.scenarios}
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
                  {this.state.data.scenarios.map(doc => (
                    <MenuItem key={doc.id} value={doc.data().name}>
                      {doc.data().name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
        scenarios: [],
        affectPath: ""
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
}
export default NewLessons;
