import React, { Component } from "react";
import firebase from "../scripts/Dora";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  Typography,
  IconButton,
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
      <Grid container direction="row" justify="center" alignItems="center">
        {this.props.data.map(doc => (
          <Card key={doc.id} item xs={6}>
            <CardHeader
              action={
                <IconButton>
                  <DeleteIcon onClick={this.handleDelete} />
                </IconButton>
              }
            />
            <CardContent>
              <Grid>
                <Grid>
                  <Typography variant="subheader">{doc.textOrWAV}</Typography>
                </Grid>
                <Grid>
                  <Typography variant="subheader">{doc.whatToPlay}</Typography>
                </Grid>
                <Grid>{doc.effect}</Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Grid>
    );
  }

  handleDelete = event => {
    console.log(event.target.value);
    //this.props.deleteAction(event.target.id);
  };
}

export default Action;
