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
      ref_secondary: firebase.firestore().collection("Scenarios"),

      add_new: false,
      added: false,
      selected_lesson: null
    };

    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLessonSelected = this.handleLessonSelected.bind(this);
    this.getAllLessons();
  }

  getAllLessons() {
    let currentComponent = this;
    this.state.ref_main.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        currentComponent.setState(state => ({
          lessons: [...state.lessons, doc]
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

  handleSubmit = new_scenario => {
    this.setState(state => ({
      added: !state.added,
      add_new: !state.add_new,
      scenarios: [...state.scenarios, new_scenario]
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

  // getAllScenarios() {
  //   let currentComponent = this;
  //   this.state.ref_secondary.get().then(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //       currentComponent.setState(state => ({
  //         scenarios: [...state.scenarios, doc]
  //       }));
  //     });
  //   });
  // }

  // handleSubmit(event) {
  //   this.state.ref_main.add(this.state.data);
  //   this.setState(state => ({
  //     added: !state.added,
  //     add_new: !state.add_new,
  //     data: {
  //       title: "",
  //       category: "",
  //       badge: "",
  //       goals: "",
  //       scenarios: [],
  //       affectPath: ""
  //     }
  //   }));
  //   event.preventDefault();
  // }

  // handleSubmitGoal = () => {
  //   this.setState({
  //     goals: this.state.goals.concat("goals")
  //   });
  // };

  // handleFieldChange = field => event => {
  //   let data = { ...this.state.data };
  //   data[field] = event.target.value;
  //   this.setState({ data });
  // };

  // handleChange = event => {
  //   this.setState({
  //     data: { ...this.state.data, scenarios: event.target.value }
  //   });
  // };

  //   render() {
  //     return (
  //       <div className="main">
  //         <h3>Lessons</h3>
  //         <Grid
  //           container
  //           direction="column"
  //           justify="space-around"
  //           alignItems="stretch"
  //         >
  //           {!this.state.add_new ? (
  //             <Paper className="paper">
  //               <Grid
  //                 container
  //                 direction="column"
  //                 justify="center"
  //                 alignItems="flex-start"
  //                 spacing={16}
  //               >
  //                 <form>
  //                   <TextField
  //                     id="title"
  //                     label="Insert lesson title"
  //                     fullWidth
  //                     value={this.state.data.title}
  //                     onChange={this.handleFieldChange("title")}
  //                     margin="normal"
  //                   />
  //                   <br />
  //                   <TextField
  //                     id="category"
  //                     label="Insert lesson category"
  //                     fullWidth
  //                     value={this.state.data.category}
  //                     onChange={this.handleFieldChange("category")}
  //                     margin="normal"
  //                   />
  //                   <br />
  //                   <TextField
  //                     id="goals"
  //                     label="Insert lesson goals"
  //                     fullWidth
  //                     value={this.state.data.goals}
  //                     onChange={this.handleFieldChange("goals")}
  //                     margin="normal"
  //                   />
  //                   <Button
  //                     color="secondary"
  //                     variant="contained"
  //                     onClick={this.handleSubmitGoal}
  //                   >
  //                     Add Goal
  //                   </Button>
  //                   <br />
  //                   <br />
  //                   <label>Insert lesson badge: </label>{" "}
  //                   <input
  //                     type="file"
  //                     accept={("image/jpeg", "image/png", "video/mp4")}
  //                   />
  //                   <br />
  //                   <FormControl fullWidth>
  //                     <InputLabel htmlFor="select-multiple-chip">
  //                       Select Scenarios for this lesson:
  //                     </InputLabel>
  //                     <Select
  //                       multiple
  //                       value={this.state.data.scenarios}
  //                       onChange={this.handleChange}
  //                       input={<Input id="select-multiple-chip" />}
  //                       renderValue={selected => (
  //                         <div>
  //                           {selected.map(value => (
  //                             <Chip key={value} label={value} />
  //                           ))}
  //                         </div>
  //                       )}
  //                     >
  //                       {this.state.scenarios.map(doc => (
  //                         <MenuItem key={doc.id} value={doc.data().name}>
  //                           {doc.data().name}
  //                         </MenuItem>
  //                       ))}
  //                     </Select>
  //                   </FormControl>
  //                 </form>
  //                 <Button
  //                   variant="contained"
  //                   color="secondary"
  //                   onClick={this.handleSubmit}
  //                 >
  //                   Save
  //                 </Button>
  //               </Grid>
  //             </Paper>
  //           ) : null}
  //           <Button
  //             variant="contained"
  //             className="add-new-btn"
  //             color="secondary"
  //             onClick={this.handleToggleClick}
  //           >
  //             {this.state.add_new ? "Add New Lesson" : "Close"}
  //           </Button>
  //           <Lesson data={this.state.lessons} />
  //         </Grid>
  //         <Snackbar
  //           anchorOrigin={{
  //             vertical: "bottom",
  //             horizontal: "right"
  //           }}
  //           open={this.state.added}
  //           color="secondary"
  //           autoHideDuration={6000}
  //           onClose={this.handleClose}
  //           message={<span id="message-id">Lesson Added Successfully!</span>}
  //           lesson={[
  //             <IconButton
  //               key="close"
  //               aria-label="Close"
  //               color="inherit"
  //               onClick={this.handleClose}
  //             >
  //               <CloseIcon />
  //             </IconButton>
  //           ]}
  //         />
  //       </div>
  //     );
  //   }
  // }

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
                  button
                  selected={this.state.selectedIndex === 0}
                  onClick={event => this.handleLessonSelected(doc)}
                >
                  <ListItemIcon>
                    <ChildCareIcon />
                  </ListItemIcon>
                  <ListItemText primary={doc.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item className="content">
            <div>
              {this.state.selected_lesson == null && !this.state.add_new ? (
                "No Lesson Selected"
              ) : !this.state.add_new ? (
                <Lesson data={this.state.selected_lesson} />
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
}

export default Lessons;
