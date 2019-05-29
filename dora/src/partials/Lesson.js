import React, { Component } from "react";
import firebase from "../scripts/Dora";
import {
  Typography,
  ButtonBase,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  IconButton,
  Menu,
  MenuItem
} from "../../node_modules/@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import "./Lesson.css";

var imgStyle = {
  height: "300px"
  // paddingTop: "25%" // 16:9
};

class Lesson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    return (
      <Card>
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon onClick={this.handleClick} />
            </IconButton>
          }
          title={this.props.data.value.title}
          subheader={this.props.data.category}
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
        <CardContent>
          <Typography component="p">
            Goals:
            <ol>
              {this.props.data.value.goals.map(listItem => (
                <li>{listItem}</li>
              ))}
            </ol>
          </Typography>
          <Typography component="p">
            Scenarios in Lesson:
            <ol>
              {this.props.data.value.scenariosInLesson.map(listItem => (
                <li>{listItem}</li>
              ))}
            </ol>
          </Typography>
        </CardContent>
      </Card>
    );
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleDelete = () => {
    let that = this;
    firebase
      .firestore()
      .collection("sole_jr_comp_app_lessons")
      .doc(this.props.data.key)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
        that.props.onDelete();
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
}

export default Lesson;
