import React, { Component } from "react";
import { TextField, MenuItem, Grid, Button, Paper } from "@material-ui/core";

import "./NewAnswer.css";

class NewAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        expectedAnswer: {
          input: "",
          successRating: 75
        },
        typeOfWaiting: 1,
        typeOfInput: ""
      }
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  render() {
    return (
      <Paper className="new-answer">
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
            <Grid item xs={12}>
              <TextField
                id="answer"
                fullWidth
                multiline
                label="Answer"
                value={this.state.data.expectedAnswer.input}
                onChange={this.handleFieldChange("input", true)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="typeOfInput"
                label="Type of Input"
                select
                fullWidth
                value={this.state.data.typeOfInput}
                onChange={this.handleFieldChange("typeOfInput")}
              >
                <MenuItem key="1" value="1">
                  Type 1 -
                </MenuItem>
                <MenuItem key="2" value="2">
                  Type 2 -
                </MenuItem>
                <MenuItem key="3" value="3">
                  Type 3 -
                </MenuItem>
                <MenuItem key="4" value="4">
                  Type 4 -
                </MenuItem>
                <MenuItem key="5" value="5">
                  Type 5 -
                </MenuItem>
              </TextField>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={6}>
                <TextField
                  id="successRating"
                  type="number"
                  label="Success Rating"
                  value={this.state.data.expectedAnswer.successRating}
                  onChange={this.handleFieldChange("successRating", true)}
                />
              </Grid>
              <Grid item>
                <Button
                  onClick={this.handleSubmit}
                  color="secondary"
                  className="save-btn"
                >
                  Save Answer
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  handleFieldChange = (field, isNested = false) => event => {
    let data = { ...this.state.data };
    if (isNested) {
      data["expectedAnswer"][field] = event.target.value;
    } else {
      data[field] = event.target.value;
    }
    this.setState({ data });
  };

  handleSubmit = event => {
    this.props.addAnswer(this.state.data);
    this.setState(state => ({
      data: {
        expectedAnswer: {
          input: "",
          successRating: 75
        },
        typeOfWaiting: 1,
        typeOfInput: ""
      }
    }));
    event.preventDefault();
  };
}

export default NewAction;
