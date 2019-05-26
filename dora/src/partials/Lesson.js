import React, { Component } from "react";
import {
  Typography,
  ButtonBase,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  IconButton
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
  }

  render() {
    return (
      <Card>
        <CardHeader
          scenario={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.data.title}
          subheader={this.props.data.category}
        />
        <CardMedia style={imgStyle} image={this.props.data.badge} />
        <CardContent>
          <Typography component="p">
            Goals:
            <ol>
              {this.props.data.goals.map(listItem => (
                <li>{listItem}</li>
              ))}
            </ol>
          </Typography>
          <Typography component="p">
            Scenarios in Lesson:
            <ol>
              {this.props.data.scenariosInLesson.map(listItem => (
                <li>{listItem}</li>
              ))}
            </ol>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default Lesson;
