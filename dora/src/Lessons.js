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

import ChildCareIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import "./Lessons.css";
import Lesson from "./partials/Lesson";
import NewLesson from "./partials/NewLesson";

class Lessons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lessons: [],
      scenarios: [],
      ref_main: firebase.firestore().collection("sole_jr_comp_app_lessons"),
      add_new: false,
      added: false,
      selected_lesson: null
    };

    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLessonSelected = this.handleLessonSelected.bind(this);
    this.getAllLessons();
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
              <Typography>Add New Lesson</Typography>
            </Button>
            <List component="nav">
              {this.state.lessons.map(doc => (
                <ListItem
                  key={doc.key}
                  button
                  selected={this.state.selectedIndex === 0}
                  onClick={event => this.handleLessonSelected(doc)}
                >
                  <ListItemIcon>
                    <ChildCareIcon />
                  </ListItemIcon>
                  <ListItemText primary={doc.value.title} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item className="content">
            <div>
              {this.state.selected_lesson == null && !this.state.add_new ? (
                "No Lesson Selected"
              ) : !this.state.add_new ? (
                <Lesson
                  data={this.state.selected_lesson}
                  onDelete={this.deleteLesson}
                />
              ) : (
                <NewLesson addLesson={this.handleSubmit} />
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
          message={<span id="message-id">Lesson Added Successfully!</span>}
          lesson={[
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
  getAllLessons() {
    let currentComponent = this;
    this.state.ref_main.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        currentComponent.setState(state => ({
          lessons: [...state.lessons, { key: doc.id, value: doc.data() }]
        }));
      });
    });
  }

  handleLessonSelected(doc) {
    if (this.state.add_new) {
      this.setState(state => ({
        add_new: !state.add_new,
        selected_lesson: doc
      }));
    } else {
      this.setState(state => ({
        selected_lesson: doc
      }));
    }
  }

  handleSubmit = (key, new_scenario) => {
    this.setState(state => ({
      added: !state.added,
      add_new: !state.add_new,
      lessons: [...state.lessons, { key: key, value: new_scenario }]
    }));
    console.log("updated");
  };

  handleToggleClick() {
    this.setState(state => ({
      add_new: !state.add_new
    }));
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ added: false });
  };

  deleteLesson = () => {
    let lessons = this.state.lessons;
    let palcement = 0;

    while (palcement !== lessons.length) {
      if (lessons[palcement].key === this.state.selected_lesson.key) {
        break;
      } else {
        palcement++;
      }
    }

    lessons.splice(palcement, 1);
    this.setState(state => ({
      selected_lesson: null
    }));

    this.setState(state => ({
      lessons: lessons
    }));
    console.log("deleted");
  };
}

export default Lessons;
