import React, { Component } from "react";
import { withFirebase } from "../Firebase";

import { makeStyles } from "@material-ui/core/styles";

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
    width: 400
  },
  container: { width: 200 }
}));

class NewSuccess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
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
    const { data, scenarios } = this.state;
    return (
      <Success
        data={data}
        scenarios={scenarios}
        handleFieldChange={this.handleFieldChange}
        handleSubmit={this.handleSubmit}
      />
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

const Success = ({ data, scenarios, handleFieldChange, handleSubmit }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
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
              value={data.action.textOrWav}
              onChange={handleFieldChange("textOrWav", true)}
              onBlur={handleSubmit}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="effect"
              className="action-label"
              multiline
              fullWidth
              label="What to Show"
              value={data.action.whatToPlay}
              onChange={handleFieldChange("whatToPlay", true)}
              onBlur={handleSubmit}
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
                  value={data.nextScenarioID}
                  onChange={handleFieldChange("nextScenarioID")}
                  onBlur={handleSubmit}
                  input={<Input id="next-scenario" />}
                >
                  {scenarios.map(doc => (
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
                value={data.action.effect}
                onChange={handleFieldChange("effect", true)}
                onBlur={handleSubmit}
              >
                <MenuItem key="1" value="Smile">
                  <span role="img" aria-label="Happy">
                    😊
                  </span>{" "}
                  - Happy Face
                </MenuItem>
                <MenuItem key="2" value="sadFace">
                  <span role="img" aria-label="Happy">
                    ☹️
                  </span>{" "}
                  - Sad Face
                </MenuItem>
                <MenuItem key="3" value="funnyFace">
                  <span role="img" aria-label="Happy">
                    😂
                  </span>{" "}
                  - Funny Face
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withFirebase(NewSuccess);
