import React, { Component } from "react";
import {
  Card,
  CardHeader,
  IconButton,
  TextField,
  MenuItem,
  CardContent,
  Grid
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

class NewAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        effect: 1,
        textOrWAV: "",
        whatToPlay: ""
      }
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  render() {
    return (
      <Card>
        <CardHeader
          action={
            <IconButton>
              <SaveIcon onClick={this.handleSubmit} />
            </IconButton>
          }
          title={
            <TextField
              id="question"
              label="Title"
              fullWidth
              multiline
              label="What to Say"
              value={this.state.data.textOrWAV}
              onChange={this.handleFieldChange("textOrWAV")}
              margin="normal"
            />
          }
        />
        <CardContent>
          <Grid>
            <Grid>
              <TextField
                id="effect"
                className="action-label"
                multiline
                fullWidth
                label="What to Show"
                value={this.state.data.whatToPlay}
                onChange={this.handleFieldChange("whatToPlay")}
                margin="normal"
              />
            </Grid>
            <Grid>
              <TextField
                id="affect"
                label="What Face to Make"
                select
                fullWidth
                value={this.state.data.effect}
                onChange={this.handleFieldChange("effect")}
                margin="normal"
              >
                <MenuItem key="1" value="happyFace">
                  Happy Face
                </MenuItem>
                <MenuItem key="2" value="sadFace">
                  Sad Face
                </MenuItem>
                <MenuItem key="3" value="funnyFace">
                  Funny Face
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  handleFieldChange = field => event => {
    let data = { ...this.state.data };
    data[field] = event.target.value;
    this.setState({ data });
  };

  handleSubmit = event => {
    this.props.addAction(this.state.data);
    this.setState(state => ({
      data: {
        effect: 1,
        textOrWAV: "",
        whatToPlay: ""
      }
    }));
    event.preventDefault();
  };
}

export default NewAction;
