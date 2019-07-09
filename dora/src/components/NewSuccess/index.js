import React, { Component } from "react";
import { withFirebase } from "../Firebase";

import {
  TextField,
  MenuItem,
  Grid,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  Input
} from "@material-ui/core";

class NewSuccess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        action: {
          effect: "Smile",
          textOrWav: "",
          whatToPlay: ""
        },
        nextScenarioID: ""
      },
      scenarios: []
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentDidMount() {
    this.props.firebase.scenarios().then(scenarios => {
      this.setState({
        scenarios: scenarios
      });
    });
  }

  render() {
    return (
      <Paper className="new-success" elevation={this.props.elevation}>
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
                value={this.state.data.action.textOrWav}
                onChange={this.handleFieldChange("textOrWav", true)}
                onBlur={this.handleSubmit}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="effect"
                className="action-label"
                multiline
                fullWidth
                label="What to Show"
                value={this.state.data.action.whatToPlay}
                onChange={this.handleFieldChange("whatToPlay", true)}
                onBlur={this.handleSubmit}
              />
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="next-scenario">Next Scenario</InputLabel>
                  <Select
                    value={this.state.data.nextScenarioID}
                    onChange={this.handleFieldChange("nextScenarioID")}
                    onBlur={this.handleSubmit}
                    input={<Input id="next-scenario" />}
                  >
                    {this.state.scenarios.map(doc => (
                      <MenuItem key={doc.key} value={doc.value.name}>
                        {doc.value.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
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
                  value={this.state.data.action.effect}
                  onChange={this.handleFieldChange("effect", true)}
                  onBlur={this.handleSubmit}
                >
                  <MenuItem key="1" value="Smile">
                    😊 - Happy Face
                  </MenuItem>
                  <MenuItem key="2" value="sadFace">
                    ☹️ - Sad Face
                  </MenuItem>
                  <MenuItem key="3" value="funnyFace">
                    😂- Funny Face
                  </MenuItem>
                </TextField>
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
      data["action"][field] = event.target.value;
    } else {
      data[field] = event.target.value;
    }
    this.setState({ data });
  };

  handleSubmit = event => {
    this.props.addSuccess(this.state.data);
    event.preventDefault();
  };
}

export default withFirebase(NewSuccess);
