import React, { Component } from "react";
import { TextField, MenuItem, Grid, Button, Paper } from "@material-ui/core";

import "./NewAction.css";

class NewAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        effect: 1,
        textOrWAV: "",
        whatToPlay: ""
      }
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  render() {
    return (
      <Paper className="new-action">
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
                id="question"
                label="Title"
                fullWidth
                multiline
                label="What to Say"
                value={this.state.data.textOrWAV}
                onChange={this.handleFieldChange("textOrWAV")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="effect"
                className="action-label"
                multiline
                fullWidth
                label="What to Show"
                value={this.state.data.whatToPlay}
                onChange={this.handleFieldChange("whatToPlay")}
              />
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={6}>
                <TextField
                  id="affect"
                  label="What Face to Make"
                  select
                  fullWidth
                  value={this.state.data.effect}
                  onChange={this.handleFieldChange("effect")}
                >
                  <MenuItem key="1" value="happyFace">
                    Happy Face
                  </MenuItem>
                  <MenuItem key="2" value="sadFace">
                    Sad Face
                  </MenuItem>
                  <MenuItem key="3" value="funnyFace">
                    Funny Face
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item>
                <Button
                  onClick={this.handleSubmit}
                  color="secondary"
                  className="save-btn"
                >
                  Save Action
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  handleFieldChange = field => event => {
    let data = { ...this.state.data };
    data[field] = event.target.value;
    this.setState({ data });
  };

  handleSubmit = event => {
    this.props.addAction(this.state.data);
    this.setState(state => ({
      data: {
        effect: 1,
        textOrWAV: "",
        whatToPlay: ""
      }
    }));
    event.preventDefault();
  };
}

export default NewAction;
