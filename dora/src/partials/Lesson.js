import React, { Component } from "react";
import {
  Typography,
  ButtonBase,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Card,
  IconButton
} from "../../node_modules/@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import "./Lesson.css";

class Lesson extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <CardHeader
          scenario={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.data.title}
          subheader={this.props.data.category}
        />
       <CardMedia image={this.props.data.scenarios[0].name} />
       <CardContent>
        <Typography component="p">
          {this.props.data.scenarios[0].name}
        </Typography>
      </CardContent>
      {// <div>
      //   {this.props.data.map(doc => (
      //     <Paper key={doc.id} className="paper">
      //       <Grid container spacing={16}>
      //         <Grid item>
      //           <ButtonBase className="image">
      //             <img
      //               className="img"
      //               alt="complex"
      //               src={doc.data().affectPath}
      //             />
      //           </ButtonBase>
      //         </Grid>
      //         <Grid item xs={6} sm container>
      //           <Grid item xs container direction="column" spacing={16}>
      //             <Grid item xs>
      //               <Typography gutterBottom variant="subtitle1">
      //                 {doc.data().title}
      //               </Typography>
      //             </Grid>
      //             <Grid item>
      //               <Typography style={{ cursor: "pointer" }}>
      //                 Remove
      //               </Typography>
      //             </Grid>
      //           </Grid>
      //           <Grid item>
      //             <Typography variant="subtitle1">
      //               {doc.data().level}
      //             </Typography>
      //           </Grid>
      //         </Grid>
      //       </Grid>
      //     </Paper>
      //   ))}
      // </div>
      }
      </Card>
    );
  }
}

export default Lesson;
