import React, { Component } from "react";

import { withFirebase } from "../Firebase";
import Lesson from "../Lesson";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Fab
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ChildCareIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";
import { NewLessonForm } from "../NewLesson";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 0
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    color: theme.color
  },
  toolbar: theme.mixins.toolbar,
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

class LessonsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      lessons: [],
      selectedLesson: undefined,
      createNew: false,
      edit: false
    };

    this.handleLessonSelected = this.handleLessonSelected.bind(this);
    this.handleLessonDelete = this.handleLessonDelete.bind(this);
    this.handleNewLesson = this.handleNewLesson.bind(this);
    this.handleAddLesson = this.handleAddLesson.bind(this);
    this.handleLessonEdit = this.handleLessonEdit.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.lessons().then(allLessons => {
      this.setState({
        lessons: allLessons,
        loading: false,
        selectedLesson: undefined
      });
    });
  }

  handleLessonSelected = lesson => {
    if (
      this.state.selectedLesson &&
      this.state.selectedLesson.key === lesson.key
    ) {
      return;
    }
    this.setState(state => ({
      selectedLesson: lesson,
      edit: false,
      createNew: false
    }));
  };

  handleLessonDelete = () => {
    this.props.firebase.removeLesson(this.state.selectedLesson.key).then(() => {
      let lessons = this.state.lessons;
      let palcement = 0;

      while (palcement !== lessons.length) {
        if (lessons[palcement].key === this.state.selectedLesson.key) {
          break;
        } else {
          palcement++;
        }
      }

      lessons.splice(palcement, 1);
      this.setState(state => ({
        selectedLesson: undefined,
        lessons: lessons
      }));
    });
  };

  handleLessonEdit = () => {
    this.setState(state => ({
      createNew: false,
      edit: true
    }));
  };

  handleNewLesson = () => {
    this.setState(state => ({
      createNew: true,
      selectedLesson: undefined,
      edit: false
    }));
  };

  handleCloseDialog = (key, value) => {
    this.handleAddLesson(key, value);
    this.setState(state => ({
      createNew: false,
      edit: false
    }));
  };

  handleAddLesson = (key, value) => {
    // Check if the id was already added to the list of lessons
    let isNew = true,
      location = -1,
      index = 0;

    while (isNew && index < this.state.lessons.length) {
      if (this.state.lessons[index].key === key) {
        isNew = false;
        location = index;
      }
      index++;
    }

    if (isNew) {
      this.setState(state => ({
        lessons: [...state.lessons, { key: key, value: value }]
      }));
    } else {
      let updatedLessons = this.state.lessons;
      updatedLessons[location].value = value;

      this.setState(state => ({ lessons: updatedLessons }));
    }
  };

  render() {
    const { lessons, loading, selectedLesson, createNew, edit } = this.state;

    return (
      <div>
        {loading ? (
          <div>Loading ...</div>
        ) : (
          <LessonsList
            lessons={lessons}
            selectLesson={this.handleLessonSelected}
            selectedLesson={selectedLesson}
            deleteLesson={this.handleLessonDelete}
            editLesson={this.handleLessonEdit}
            newLesson={this.handleNewLesson}
            addLesson={this.handleAddLesson}
            createNew={createNew}
            edit={edit}
            close={this.handleCloseDialog}
          />
        )}
      </div>
    );
  }
}

const LessonsList = ({
  lessons,
  selectLesson,
  selectedLesson,
  deleteLesson,
  editLesson,
  newLesson,
  addLesson,
  createNew,
  edit,
  close
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {lessons.map(lesson => (
            <ListItem
              button
              onClick={event => selectLesson(lesson)}
              key={lesson.key}
            >
              <ListItemIcon>
                <ChildCareIcon />
              </ListItemIcon>
              <ListItemText primary={lesson.value.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        {selectedLesson !== undefined && !createNew && !edit ? (
          <Lesson
            lesson={selectedLesson}
            deleteLesson={deleteLesson}
            editLesson={editLesson}
          />
        ) : createNew || edit ? (
          <NewLessonForm
            addNewLesson={addLesson}
            edit={edit}
            data={selectedLesson}
            closeLesson={close}
          />
        ) : (
          <Typography>No Lesson Selected</Typography>
        )}
        <Fab
          color="secondary"
          aria-label="Edit"
          className={classes.fab}
          onClick={newLesson}
        >
          <AddIcon />
        </Fab>
      </main>
    </div>
  );
};

export default withFirebase(LessonsPage);
