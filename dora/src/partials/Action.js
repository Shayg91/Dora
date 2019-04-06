import React, { Component } from "react";
import firebase from "../scripts/Dora";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  Typography,
  ButtonBase,
  Card,
  CardContent,
  CardHeader
} from "../../node_modules/@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import "./Action.css";

class Action extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storage: firebase
        .storage()
        .ref()
        .child("images")
    };
  }

  render() {
    return (
      <div>
        {this.props.data.map(doc => (
          <Card>
            <CardHeader
              title={
                <Typography variant="title" gutterBottom>
                  {doc.textOrWAV}
                </Typography>
              }
            />
            <CardContent>
              <Grid>
                <Grid>
                  <Typography variant="subheader">{doc.whatToPlay}</Typography>
                </Grid>
                <Grid>for face</Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}

export default Action;
