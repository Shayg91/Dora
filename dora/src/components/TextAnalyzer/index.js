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
  let value = textValue.toLowerCase();
  const valueArr = value.split("'");
  const arr = textValue.split("'");

  if (arr.length > 1 && valueArr[0].indexOf(ROBOT_SEARCH_PRETEXT) === -1) {
    return null;
  }

  let action = INITIAL_STATE_ACTION;
  action.textOrWav = arr[1];

  scenarioData.actions = [action];
  scenarioData.waitFor.expectedAnswer.input = arr[3];
  scenarioData.onSuccess.action.textOrWav = arr[5];
  scenarioData.onfailure.action.textOrWav = arr[9];

  const scenarioSuccess = allScenarios.filter(
    data => data.value.name.toLowerCase() === valueArr[7]
  );

  if (scenarioSuccess.length > 0) {
    scenarioData.onSuccess.nextScenarioID = scenarioSuccess[0].value.name;
  } else {
    return "Success Scenario Name doesn't exist. Please make sure you typed the name in correctly.";
  }

  const scenarioFailure = allScenarios.filter(
    data => data.value.name.toLowerCase() === valueArr[11]
  );

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
