import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { TextField, Button, Paper, Grid, MenuItem } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";

import "./NewScenario.css";
import NewAction from "./NewAction";
import Action from "./Action";

class NewScenario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        title: "",
        level: 1,
        actions: [],
        affectPath: ""
      },
      newAction: {
        effect: 1,
        textOrWAV: "",
        whatToPlay: ""
      }
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  render() {
    return (
      <Paper className="paper">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
          spacing={16}
        >
          <form>
            <TextField
              id="title"
              label="Title"
              fullWidth
              value={this.state.data.title}
              onChange={this.handleFieldChange("title")}
              margin="normal"
            />
            <br />
            <TextField
              id="level"
              label="Level"
              select
              value={this.state.data.level}
              onChange={this.handleFieldChange("level")}
              margin="normal"
            >
              <MenuItem key="1" value="1">
                <StarIcon />
              </MenuItem>
              <MenuItem key="2" value="2">
                <StarIcon />
                <StarIcon />
              </MenuItem>
              <MenuItem key="3" value="3">
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </MenuItem>
            </TextField>
            <Action data={this.state.data.actions} />
            <NewAction addAction={this.handleActionSubmit} />
          </form>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleSubmit}
          >
            Save
          </Button>
        </Grid>
      </Paper>
    );
  }

  handleFieldChange = field => event => {
    let data = { ...this.state.data };
    data[field] = event.target.value;
    this.setState({ data });
  };

  handleSubmit(event) {
    this.state.ref_main.add(this.state.data);
    this.setState(state => ({
      added: !state.added,
      add_new: !state.add_new,
      data: {
        title: "",
        level: 1,
        actions: [],
        affectPath: ""
      }
    }));
    event.preventDefault();
  }

  handleActionSubmit = action => {
    console.log("got here!");
    let actionsList = [...this.state.data.actions];
    actionsList.push(action);
    this.setState({
      data: { ...this.state.data, actions: actionsList }
    });
    console.log(this.state.data);
  };
}

export default NewScenario;
