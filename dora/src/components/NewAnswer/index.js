import React, { Component } from "react";
import { TextField, MenuItem, Grid, Paper } from "@material-ui/core";

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
        typeOfInput: "speech"
      },
      mulChoice: {
        correct: "",
        wrong1: "",
        wrong2: "",
        wrong3: ""
      }
    };

    /* if (this.props.editMode) {
      this.state.data = this.props.data;

      if (this.state.data.typeOfInput === "mulChoice") {
        const mulChoiceAnswers = this.state.data.expectedAnswer.input.split(
          ","
        );

        this.state.mulChoice.correct = mulChoiceAnswers[0];
        this.state.mulChoice.wrong1 = mulChoiceAnswers[1];
        this.state.mulChoice.wrong2 = mulChoiceAnswers[2];
        this.state.mulChoice.wrong3 = mulChoiceAnswers[3];
      }
    } */

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
                id="typeOfInput"
                label="Type of Input"
                select
                fullWidth
                value={this.state.data.typeOfInput}
                onChange={this.handleFieldChange("typeOfInput")}
                onBlur={this.handleSubmit}
              >
                <MenuItem key="1" value="inputText">
                  Type 1 - Text
                </MenuItem>
                <MenuItem key="2" value="speech">
                  Type 2 - Speech
                </MenuItem>
                <MenuItem key="3" value="mulChoice">
                  Type 3 - Multipule Choice Answer
                </MenuItem>
              </TextField>
            </Grid>
            {this.state.data.typeOfInput != "mulChoice" ? (
              <Grid item xs={12}>
                <TextField
                  id="answer"
                  fullWidth
                  multiline
                  label="Answer"
                  value={this.state.data.expectedAnswer.input}
                  onChange={this.handleFieldChange("input", true)}
                  onBlur={this.handleSubmit}
                />
              </Grid>
            ) : (
              <Grid item xs={12}>
                <TextField
                  id="answer"
                  fullWidth
                  multiline
                  label="Correct Answer"
                  value={this.state.mulChoice.correct}
                  onChange={this.handleMultiAnswerFieldChange("correct")}
                  onBlur={this.handleSubmit}
                />

                <TextField
                  id="answer"
                  fullWidth
                  multiline
                  label="Wrong Answer 1"
                  value={this.state.mulChoice.wrong1}
                  onChange={this.handleMultiAnswerFieldChange("wrong1")}
                  onBlur={this.handleSubmit}
                />
                <TextField
                  id="answer"
                  fullWidth
                  multiline
                  label="Wrong Answer 2"
                  value={this.state.mulChoice.wrong2}
                  onChange={this.handleMultiAnswerFieldChange("wrong2")}
                  onBlur={this.handleSubmit}
                />
                <TextField
                  id="answer"
                  fullWidth
                  multiline
                  label="Wrong Answer 3"
                  value={this.state.mulChoice.wrong3}
                  onChange={this.handleMultiAnswerFieldChange("wrong3")}
                  onBlur={this.handleSubmit}
                />
              </Grid>
            )}

            {this.state.data.typeOfInput != "mulChoice" ? (
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
                    onBlur={this.handleSubmit}
                  />
                </Grid>
              </Grid>
            ) : null}
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

  handleMultiAnswerFieldChange = field => event => {
    let mulChoice = { ...this.state.mulChoice };
    let data = { ...this.state.data };

    mulChoice[field] = event.target.value;
    data["expectedAnswer"]["input"] = mulChoice.correct.concat(
      ",",
      mulChoice.wrong1,
      ",",
      mulChoice.wrong2,
      ",",
      mulChoice.wrong3
    );

    this.setState({ data, mulChoice });
  };

  handleSubmit = event => {
    this.props.addAnswer(this.state.data);
    event.preventDefault();
  };
}

export default NewAction;
