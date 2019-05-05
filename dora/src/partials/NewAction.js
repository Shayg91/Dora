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
      data: {
        effect: "happyFace",
        textOrWAV: "",
        whatToPlay: ""
      }
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
  }

  render() {
    console.log("state", this.state);
    console.log("props", this.props);
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
                value={this.state.data.textOrWAV}
                onChange={this.handleFieldChange("textOrWAV")}
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
                  accept="image/*"
                  randomizeFilename
                  storageRef={firebase.storage().ref("images")}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
                />
                {/* <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  type="file"
                  onChange={this.handleFieldChange("whatToPlay")}
                /> */}

                {/* <label htmlFor="raised-button-file">
                  <Tooltip title="Add Picture" placement="top">
                    <Button component="span">
                      <AddIcon color="secondary" />
                    </Button>
                  </Tooltip>
                </label> */}
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
                  <MenuItem key="1" value="happyFace">
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
              {/* <Grid item>
                <Button
                  onClick={this.handleSubmit}
                  color="secondary"
                  className="save-btn"
                >
                  Save Action
                </Button>
              </Grid> */}
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
    this.props.addAction(this.state.data);
    event.preventDefault();
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({
      data: { whatToPlay: filename },
      progress: 100,
      isUploading: false
    });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };
}

export default NewAction;