import React, { Component } from "react";
import firebase from "../scripts/Dora";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography, ButtonBase } from "../../node_modules/@material-ui/core";
import StarIcon from "../../node_modules/@material-ui/icons/Star";
import DeleteIcon from "@material-ui/icons/Delete";

import "./Action.css";

class Action extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storage: firebase
        .storage()
        .ref()
        .child("images")
    };
  }

  render() {
    return (
      <div>
        {this.props.data.map(doc => (
          <Paper key={doc.id} className="paper">
            <Grid container spacing={16}>
              <Grid item>
                <ButtonBase className="image">
                  <img
                    className="img"
                    alt="complex"
                    src={this.state.storage.child(doc.data().affectPath)}
                  />
                  {console.log(
                    this.state.storage.child(doc.data().affectPath).fullPath
                  )}
                </ButtonBase>
              </Grid>
              <Grid item xs={6} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {doc.data().textOrWAV}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <DeleteIcon />
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    <StarIcon />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </div>
    );
  }
}

export default Action;
