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
const changeFromTextToScenario = (textValue, scenarioData) => {
  let value = textValue.toLowerCase();
  const valueArr = value.split("'");
  const arr = textValue.split("'");

  if (arr.length > 1 && valueArr[0].indexOf(ROBOT_SEARCH_PRETEXT) === -1) {
    return null;
  }

  let action = INITIAL_STATE_ACTION;
  action.textOrWav = arr[1];

  scenarioData.actions = [action];

  console.log(scenarioData);
};

const TextAnalyzer = (scenarioData, handleConvert) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [textValue, setValue] = useState("");

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
  console.log("handleConvert", handleConvert);
  const handleTextToData = () => {
    changeFromTextToScenario(textValue, scenarioData.scenarioData);
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
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default TextAnalyzer;
