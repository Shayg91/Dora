import React, { Component } from "react";
import { TextField, MenuItem, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

class NewAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      mulChoice: {
        correct: "",
        wrong1: "",
        wrong2: "",
        wrong3: ""
      }
    };

    if (props.data.typeOfInput === "mulChoice") {
      const mulChoiceAnswers = this.state.data.expectedAnswer.input.split(",");

      this.state.mulChoice.correct = mulChoiceAnswers[0];
      this.state.mulChoice.wrong1 = mulChoiceAnswers[1];
      this.state.mulChoice.wrong2 = mulChoiceAnswers[2];
      this.state.mulChoice.wrong3 = mulChoiceAnswers[3];
    }

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  render() {
    const { data, mulChoice } = this.state;

    return (
      <Answer
        data={data}
        mulChoice={mulChoice}
        handleFieldChange={this.handleFieldChange}
        handleMultiAnswerFieldChange={this.handleMultiAnswerFieldChange}
        handleSubmit={this.handleSubmit}
      />
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

const Answer = ({
  data,
  mulChoice,
  handleFieldChange,
  handleMultiAnswerFieldChange,
  handleSubmit
}) => {
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
              id="typeOfInput"
              label="Type of Input"
              select
              fullWidth
              value={data.typeOfInput}
              onChange={handleFieldChange("typeOfInput")}
              onBlur={handleSubmit}
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
          {data.typeOfInput != "mulChoice" ? (
            <Grid item xs={12}>
              <TextField
                id="answer"
                fullWidth
                multiline
                label="Answer"
                value={data.expectedAnswer.input}
                onChange={handleFieldChange("input", true)}
                onBlur={handleSubmit}
              />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <TextField
                id="answer"
                fullWidth
                multiline
                label="Correct Answer"
                value={mulChoice.correct}
                onChange={handleMultiAnswerFieldChange("correct")}
                onBlur={handleSubmit}
              />

              <TextField
                id="answer"
                fullWidth
                multiline
                label="Wrong Answer 1"
                value={mulChoice.wrong1}
                onChange={handleMultiAnswerFieldChange("wrong1")}
                onBlur={handleSubmit}
              />
              <TextField
                id="answer"
                fullWidth
                multiline
                label="Wrong Answer 2"
                value={mulChoice.wrong2}
                onChange={handleMultiAnswerFieldChange("wrong2")}
                onBlur={handleSubmit}
              />
              <TextField
                id="answer"
                fullWidth
                multiline
                label="Wrong Answer 3"
                value={mulChoice.wrong3}
                onChange={handleMultiAnswerFieldChange("wrong3")}
                onBlur={handleSubmit}
              />
            </Grid>
          )}

          {data.typeOfInput != "mulChoice" ? (
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
                  value={data.expectedAnswer.successRating}
                  onChange={handleFieldChange("successRating", true)}
                  onBlur={handleSubmit}
                />
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NewAction;
