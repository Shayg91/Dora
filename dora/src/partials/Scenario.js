import React, { Component } from "react";
import {
  Typography,
  ButtonBase,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  CardActions,
  IconButton
} from "../../node_modules/@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import "./Scenario.css";

class Scenario extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.data.name}
          subheader={this.props.data.level}
        />
        <CardMedia image={this.props.data.actions[0].whatToPlay} />
        <CardContent>
          <Typography component="p">
            {this.props.data.actions[0].textOrWav}
          </Typography>
        </CardContent>
        {/* <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions> */}
      </Card>
    );
  }
}

export default Scenario;
