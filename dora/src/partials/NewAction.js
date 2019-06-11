import React, { Component } from "react";
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
import firebase from "../scripts/Dora";

import "./NewAction.css";

class NewAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUploading: false,
      progress: 0,
      key: props.actionNum,
      data: {
        effect: "Smile",
        textOrWav: "",
        whatToPlay: ""
      }
    };

    if (this.props.editMode) {
      this.state.data = this.props.data;
    }

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
  }

  render() {
    return (
      <Paper className="new-action">
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
                value={this.state.data.textOrWav}
                onChange={this.handleFieldChange("textOrWav")}
                onBlur={this.handleSubmit}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                disabled
                id="effect"
                className="action-label"
                multiline
                fullWidth
                label="What to Show"
                value={this.state.data.whatToPlay}
                onChange={this.handleFieldChange("whatToPlay")}
                onBlur={this.handleSubmit}
              />
            </Grid>
            <Grid item>
              <div>
                <FileUploader
                  hidden
                  id="raised-button-file"
                  accept="image/*"
                  randomizeFilename
                  storageRef={firebase.storage().ref("images")}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
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
                  value={this.state.data.effect}
                  onChange={this.handleFieldChange("effect")}
                  onBlur={this.handleSubmit}
                >
                  <MenuItem key="1" value="Smile">
                    😊 - Happy Face
                  </MenuItem>
                  <MenuItem key="2" value="sadFace">
                    ☹️ - Sad Face
                  </MenuItem>
                  <MenuItem key="3" value="funnyFace">
                    😂- Funny Face
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  handleFieldChange = field => event => {
    let data = { ...this.state.data };
    data[field] = event.target.value;
    this.setState({ data });
  };

  handleSubmit = event => {
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

    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        data.whatToPlay = url;
        this.setState({ data: data });
      });
  };
}

export default NewAction;
