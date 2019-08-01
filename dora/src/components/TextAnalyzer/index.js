import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

export default function TextAnalyzer() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <TextField />
      </Paper>
    </div>
  );
}
