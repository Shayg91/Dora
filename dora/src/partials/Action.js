import React, { Component } from "react";
import firebase from "../scripts/Dora";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography, Button } from "../../node_modules/@material-ui/core";

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
          <Paper className="action">
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                direction="row"
                container
                justify="flex-start"
                alignItems="flex-end"
              >
                <Grid item xs={12} nowrap>
                  <Typography variant="subtitle1">{doc.textOrWAV}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">{doc.whatToPlay}</Typography>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    {doc.effect}
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={this.handleDelete}
                      color="secondary"
                      className="save-btn"
                    >
                      Delete Action
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Grid>
    );
  }

  handleDelete = event => {
    this.props.deleteAction();
  };
}

export default Action;
