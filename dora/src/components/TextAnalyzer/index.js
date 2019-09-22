import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  Dialog,
  Paper,
  Tooltip,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography
} from "@material-ui/core";

import {
  INITIAL_STATE_ACTION,
  ROBOT_SEARCH_PRETEXT,
  STUDENT_SEARCH_PRETEXT
} from "../../constants/initializers";

import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  paper: {
    padding: theme.spacing(3, 2),
    width: 450,
    height: 450
  }
}));

// This function does a naive convertion from the text that is entered in the textbox to a scenario
const changeFromTextToScenario = (textValue, scenarioData, allScenarios) => {
  /*
  How arr is defined:
  arr[0] - Starting text. Should contain the ROBOT_SEARCH_PRETEXT
  arr[1] - Contains the question that the robot should ask the child
  arr[3] - What the child should answer 
  arr[5] - What the robot should say if the child answers a correct answer
  arr[7] - The next scenario if the child asnwers a correct answer 
  arr[9] - What the robot should say if the child answers an incorrect answer
  arr[11] - The next scenario if the child answers an incorrect answer
  */
  const arr = textValue.split("'");

  // Checks that there is at least one ' and that the pretext is included in the text.
  if (
    arr.length > 1 &&
    arr[0].toLowerCase().indexOf(ROBOT_SEARCH_PRETEXT) === -1
  ) {
    return "There was a problem converting the text. Please see help info for an example template";
  }

  const answerText = arr[1];
  const expectedAnswer = arr[3];
  const successText = arr[5];
  const successScenario = arr[7];
  const failureText = arr[9];
  const failureScenario = arr[11];

  let action = INITIAL_STATE_ACTION;
  action.textOrWav = answerText;

  scenarioData.actions = [action];
  scenarioData.waitFor.expectedAnswer.input = expectedAnswer;
  scenarioData.onSuccess.action.textOrWav = successText;
  scenarioData.onfailure.action.textOrWav = failureText;

  // Checks if the scenario name entered is contained in the list of the scenarios
  const scenarioSuccess = allScenarios.filter(
    data =>
      data.value.name.toLowerCase().indexOf(successScenario.toLowerCase()) !==
      -1
  );

  // If a scenario was found - insert the scenario. Otherwise show the user an error
  if (scenarioSuccess.length > 0) {
    scenarioData.onSuccess.nextScenarioID = scenarioSuccess[0].value.name;
  } else {
    return "Success Scenario Name doesn't exist. Please make sure you typed the name in correctly.";
  }

  // Checks if the scenario name entered is contained in the list of the scenarios
  const scenarioFailure = allScenarios.filter(
    data =>
      data.value.name.toLowerCase().indexOf(failureScenario.toLowerCase()) !==
      -1
  );

  // If a scenario was found - insert the scenario. Otherwise show the user an error
  if (scenarioFailure.length > 0) {
    scenarioData.onfailure.nextScenarioID = scenarioFailure[0].value.name;
  } else {
    return "Failure Scenario Name doesn't exist. Please make sure you typed the name in correctly.";
  }

  return "";
};

const TextAnalyzer = ({ scenarioData, handleConvert, allScenarios }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [textValue, setValue] = useState(
    "The robot says 'TEXT TO SAY', if the student says 'TEXT TO LISTEN FOR' then the robot says 'SUCCESS TEXT' and continues to scenario 'SCENARIO NAME' otherwise, the robot says 'FAILURE TEXT' and continues to scenario 'SCENARIO NAME'."
  );
  const [errorMessage, setError] = useState("");
  const [errorState, handleError] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFieldChanged = event => {
    setValue(event.target.value);
  };

  const handleCopy = () => {
    setValue(
      "The robot says 'TEXT TO SAY', if the student says 'TEXT TO LISTEN FOR' then the robot says 'SUCCESS TEXT' and continues to scenario 'SCENARIO NAME' otherwise, the robot says 'FAILURE TEXT' and continues to scenario 'SCENARIO NAME'."
    );
    setOpen(false);
  };

  const handleTextToData = () => {
    const errorMessage = changeFromTextToScenario(
      textValue,
      scenarioData,
      allScenarios
    );

    if (errorMessage === "") {
      handleError(false);
    } else {
      handleError(true);
    }

    setError(errorMessage);

    handleConvert(scenarioData);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container layout="row">
          <Grid container layout="row" justify="flex-end" alignItems="flex-end">
            <Grid item>
              <Tooltip
                title="Click for more Info on how to write the scenario"
                aria-label="help"
              >
                <InfoIcon onClick={handleOpen} />
              </Tooltip>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"How to write a Scenario"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Typography variant="subtitle2">
                      Write something like the following:
                    </Typography>
                    <Typography variant="body1">
                      The robot says 'TEXT TO SAY', if the student says 'TEXT TO
                      LISTEN FOR' then the robot says 'SUCCESS TEXT' and
                      continues to scenario 'SCENARIO NAME' otherwise, the robot
                      says 'FAILURE TEXT' and continues to scenario 'SCENARIO
                      NAME'.
                    </Typography>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleCopy}
                    color="secondary"
                    variant="contained"
                    autoFocus
                  >
                    Copy Text
                  </Button>
                  <Button
                    onClick={handleClose}
                    color="primary"
                    variant="contained"
                    autoFocus
                  >
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>

          <Grid container layout="row" justify="flex-end" alignItems="center">
            <Grid item xs={12}>
              <TextField
                multiline
                fullWidth
                value={textValue}
                onChange={handleFieldChanged}
                onBlur={handleTextToData}
                placeholder="Start writing the Scenario..."
                helperText={errorMessage}
                error={errorState}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default TextAnalyzer;
