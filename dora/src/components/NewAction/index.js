import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { makeStyles } from "@material-ui/core/styles";
import { sizing } from "@material-ui/system";

import {
  TextField,
  MenuItem,
  Grid,
  Button,
  Paper,
  Tooltip
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import FileUploader from "react-firebase-file-uploader";

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
  img: {
    width: 100,
    height: 100
  }
}));

class NewAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUploading: false,
      progress: 0,
      key: props.actionNum,
      data: props.data
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <Action
        data={this.state.data}
        handleFieldChange={this.handleFieldChange}
        handleSubmit={this.handleSubmit}
        props={this.props}
        handleProgress={this.handleProgress}
        handleUploadError={this.handleUploadError}
        handleUploadStart={this.handleUploadStart}
        handleUploadSuccess={this.handleUploadSuccess}
      />
    );
  }

  handleFieldChange = field => event => {
    let data = { ...this.state.data };
    data[field] = event.target.value;
    this.setState({ data });
  };

  handleSubmit = event => {
    console.log(this.props);
    this.props.addAction(this.state.key, this.state.data);
    event.preventDefault();
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    let data = this.state.data;
    data.whatToPlay = filename;
    this.setState({
      data: data,
      progress: 100,
      isUploading: false
    });

    this.props.firebase.storage
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        data.whatToPlay = url;
        this.setState({ data: data });
      });
  };
}

const Action = ({
  data,
  handleFieldChange,
  handleSubmit,
  props,
  handleProgress,
  handleUploadError,
  handleUploadStart,
  handleUploadSuccess
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="flex-start"
      >
        <Grid
          direction="row"
          container
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <TextField
              id="question"
              fullWidth
              label="Title"
              style={{ width: "100%" }}
              multiline
              label="What to Say"
              value={data.textOrWav}
              onChange={handleFieldChange("textOrWav")}
              onBlur={handleSubmit}
            />
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
          >
            <Grid item xs={8}>
              {data.whatToPlay && (
                <img src={data.whatToPlay} className={classes.img} />
              )}
              <TextField
                disabled
                id="effect"
                className="action-label"
                multiline
                fullWidth
                label="What to Show"
                value={data.whatToPlay}
                onChange={handleFieldChange("whatToPlay")}
                onBlur={handleSubmit}
              />
            </Grid>
            <Grid item xs={4}>
              <div>
                <FileUploader
                  hidden
                  id="raised-button-file"
                  accept="image/*"
                  randomizeFilename
                  storageRef={props.firebase.storage.ref("images")}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />

                <label htmlFor="raised-button-file">
                  <Tooltip title="Add Picture" placement="top">
                    <Button component="span">
                      <AddIcon color="secondary" />
                    </Button>
                  </Tooltip>
                </label>
              </div>
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
                value={data.effect}
                onChange={handleFieldChange("effect")}
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

export default withFirebase(NewAction);
