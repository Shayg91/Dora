import React, { Component } from "react";
import {
  TextField,
  Button,
  Paper,
  InputLabel,
  Chip,
  Grid,
  FormControl,
  Select,
  Input,
    Card,
  CardContent,
  MenuItem
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import "./NewScenario.css";
import NewAction from "./NewAction";
import Action from "./Action";

class NewScenario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        level: 1,
        actions: [],
        affectPath: ""
      },
      newAction: {
        effect: 1,
        textOrWAV: "",
        whatToPlay: ""
      },
      waitFor: {
        typeOfInput: 1,
        expectedAnswer: "",
        successRating: 75,
        typeOfWaiting: ""
      },
      onSuccess: {
        actions: [],
        nextScenarioId: 1
      },
      onFailure : {
        actions: [],
        nextScenarioId: 1,
        numberOfRetries: -2
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
          spacing={20}
        >
          <form>
            <TextField
              id="name"
              label="Title"
              fullWidth
              value={this.state.data.name}
              onChange={this.handleFieldChange("name")}
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
          <br/>
            <lable style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>Insert an action:</lable>
            <Action data={this.state.data.actions} />
            <NewAction addAction={this.handleActionSubmit} />
          <br/>
          <Grid spacing={12}>
            <lable style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>What to wait for:</lable>
            <Card>
              <CardContent>
                <TextField
                    select
                    fullWidth
                    id="typeOfInput"
                    label="Select the type of input to wait for"
                    onChange={this.handleFieldChange("typeOfInput")}
                >
                  <MenuItem key="1" value="speech">
                    speech
                  </MenuItem>
                  <MenuItem key="2" value="input Text">
                    input Text
                  </MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    id="Expected Answer"
                    label="Insert the Expected Answer"
                    onChange={this.handleFieldChange("expectedAnswer")}
                />
                <TextField
                    fullWidth
                    id="successRating"
                    label="Insert the success rating"
                    onChange={this.handleFieldChange("successRating")}
                />
              </CardContent>
            </Card>
          </Grid>
          <br/>
          <Grid spacing={12}>
            <lable style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>On Success:</lable>
            <Card>
              <CardContent>
                <FormControl fullWidth>
                  <InputLabel htmlFor="select-chip">
                    Select action for success:
                  </InputLabel>
                  <Select
                      value={this.state.data.actions}
                      onChange={this.handleChange}
                      input={<Input id="select-chip" />}
                      renderValue={selected => (
                          <div>
                            {selected.map(value => (
                                <Chip key={value} label={value} />
                            ))}
                          </div>
                      )}
                  >
                    {this.state.data.actions.map(doc => (
                        <MenuItem key={doc.id} value={doc.data().textOrWAV}>
                          {doc.data().textOrWAV}
                        </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                    fullWidth
                    id="scenarioId"
                    label="Insert the next scenario Id in case of success"
                    onChange={this.handleFieldChange("nextScenarioId")}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid spacing={12}>
            <br/>
            <lable style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>On Failure:</lable>
            <Card>
              <CardContent>
                <FormControl fullWidth>
                  <InputLabel htmlFor="select-chip">
                    Select action for failure:
                  </InputLabel>
                  <Select
                      value={this.state.data.actions}
                      onChange={this.handleChange}
                      input={<Input id="select-chip" />}
                      renderValue={selected => (
                          <div>
                            {selected.map(value => (
                                <Chip key={value} label={value} />
                            ))}
                          </div>
                      )}
                  >
                    {this.state.data.actions.map(doc => (
                        <MenuItem key={doc.id} value={doc.data().textOrWAV}>
                          {doc.data().textOrWAV}
                        </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                    fullWidth
                    id="secenarioId"
                    label="Insert the next scenario Id in case of failure"
                    onChange={this.handleFieldChange("nextScenarioId")}
                />
                <TextField
                    fullWidth
                    id="numOfRetries"
                    label="Insert number of retries"
                    onChange={this.handleFieldChange("numberOfRetries")}
                />
              </CardContent>
            </Card>
          </Grid>
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
        name: "",
        level: 1,
        actions: [],
        affectPath: ""
      },
        newAction: {
          effect: 1,
          textOrWAV: "",
          whatToPlay: ""
        },
        waitFor: {
          typeOfInput: "",
          expectedAnswer: "",
          successRating: "",
          typeOfWaiting: ""
        },
        onSuccess: {
          actions: [],
          nextScenarioId: 1
        },
        onFailure : {
          actions: [],
          nextScenarioId: 1,
          numberOfRetries: -2
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
