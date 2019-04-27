import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography, Button } from "../../node_modules/@material-ui/core";

import "./Answer.css";

class Answer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Paper className="answer">
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
                <Typography variant="subtitle1">
                  {this.props.answer.expectedAnswer.input}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  {this.props.answer.expectedAnswer.successRating}
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={6}>
                  {this.props.answer.typeOfInput}
                </Grid>
                <Grid item>
                  <Button
                    onClick={this.handleDelete}
                    color="secondary"
                    className="save-btn"
                  >
                    Delete Answer
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }

  handleDelete = event => {
    this.props.deleteAnswer();
  };
}

export default Answer;
