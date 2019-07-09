import React, { Component } from "react";

import {
  Typography,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";

var imgStyle = {
  height: "300px"
  // paddingTop: "25%" // 16:9
};

class Scenario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  render() {
    return (
      <Card onDoubleClick={alert("Hey")}>
        <CardHeader
          /* action={
            <IconButton onClick={this.handleClick}>
              <MoreVertIcon />
            </IconButton>
          } */
          title={this.props.scenario.value.name}
          subheader={"Level: " + this.props.scenario.value.level}
        />
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
          <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
        </Menu>
        <CardMedia
          style={imgStyle}
          image={this.props.scenario.value.actions[0].whatToPlay}
        />
        <CardContent>
          <Typography variant="h6">
            Actions and Questions:{" "}
            {this.props.scenario.value.actions.map(x => (
              <Typography variant="body1">{x.textOrWav}</Typography>
            ))}
          </Typography>
          {this.props.scenario.value.waitFor.typeOfInput !== "mulChoice" ? (
            <Typography variant="h6">
              Answer:{" "}
              <Typography variant="body1">
                {this.props.scenario.value.waitFor.expectedAnswer.input}
              </Typography>
            </Typography>
          ) : (
            <div>
              <Typography variant="h6">
                Correct Answer:
                <Typography variant="body1">
                  {
                    this.props.scenario.value.waitFor.expectedAnswer.input.split(
                      ","
                    )[0]
                  }
                </Typography>
              </Typography>
              <Typography variant="h6">
                Incorrect Answers:
                <Typography variant="body1">
                  {
                    this.props.scenario.value.waitFor.expectedAnswer.input.split(
                      ","
                    )[1]
                  }
                </Typography>
                <Typography variant="body1">
                  {
                    this.props.scenario.value.waitFor.expectedAnswer.input.split(
                      ","
                    )[2]
                  }
                </Typography>
                <Typography variant="body1">
                  {
                    this.props.scenario.value.waitFor.expectedAnswer.input.split(
                      ","
                    )[3]
                  }
                </Typography>
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  /* How this function should work:
  - Check if any lesson containes the scenario as a starting scenario. 
    If connected - show message.
  - Check if any scenario uses the scenario as next scenario.
    If connected - show message.
  - If nothing is connected - delete scenario.   
  */

  handleDelete = () => {
    // let scenariosNameToDelete = this.props.scenario.value.name;
    // let scenarioIsConnectedToLesson = false;
    // let scenarioIsConnectedToScenarioSuccess = false;
    // let scenarioIsConnectedToScenarioFailiure = false;
    // let promise1 = firebase
    //   .firestore()
    //   .collection("sole_jr_comp_app_lessons")
    //   .where("scenariosInLesson", "array-contains", scenariosNameToDelete)
    //   .get()
    //   .then(doc => {
    //     console.log(doc.docs.length && doc.docs[0].exists);
    //     if (doc.docs.length && doc.docs[0].exists) {
    //       scenarioIsConnectedToLesson = true;
    //     }
    //   });
    // let promise2 = firebase
    //   .firestore()
    //   .collection("Scenarios")
    //   .where("onSuccsess.nextScenarioID", "==", scenariosNameToDelete)
    //   .get()
    //   .then(doc => {
    //     console.log(doc.docs.length && doc.docs[0].exists);
    //     if (doc.docs.length && doc.docs[0].exists) {
    //       scenarioIsConnectedToScenarioSuccess = true;
    //     }
    //   });
    // let promise3 = firebase
    //   .firestore()
    //   .collection("Scenarios")
    //   .where("onfailure.nextScenarioID", "==", scenariosNameToDelete)
    //   .get()
    //   .then(doc => {
    //     console.log(doc.docs.length && doc.docs[0].exists);
    //     if (doc.docs.length && doc.docs[0].exists) {
    //       scenarioIsConnectedToScenarioFailiure = true;
    //     }
    //   });
    // Promise.all([promise1, promise2, promise3]).then(e => {
    //   console.log(
    //     "scenarioIsConnectedToScenarioSuccess",
    //     scenarioIsConnectedToScenarioSuccess
    //   );
    //   console.log(
    //     "scenarioIsConnectedToScenarioFailiure",
    //     scenarioIsConnectedToScenarioFailiure
    //   );
    //   console.log("scenarioIsConnectedToLesson", scenarioIsConnectedToLesson);
    //   if (
    //     !scenarioIsConnectedToScenarioSuccess &&
    //     !scenarioIsConnectedToScenarioFailiure &&
    //     !scenarioIsConnectedToLesson
    //   ) {
    //     let that = this;
    //     firebase
    //       .firestore()
    //       .collection("Scenarios")
    //       .doc(this.props.scenario.key)
    //       .delete()
    //       .then(function() {
    //         console.log("Document successfully deleted!");
    //         that.props.onDelete();
    //       })
    //       .catch(function(error) {
    //         console.error("Error removing document: ", error);
    //       });
    //   }
    // });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleEdit = () => {
    this.props.handleEdit();
  };
}

export default Scenario;
