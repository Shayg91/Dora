import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { TextField, Button } from '../../node_modules/@material-ui/core';

class Action extends Component{
    constructor(props) {
        super(props);

        console.log(this.props);
    }

    render() {
      return (
        <ul>
          {this.props.items.map(item => (
            <li key={item._id}>{item.textOrWAV}</li>
          ))}
        </ul>
      );
    }
}

export default Action;

/*{this.props.data.map(function(action){
            return  (<Grid item xs={12}>
                        <Paper>
                            <TextField>Testing</TextField>
                        </Paper>
                     </Grid>)})
            }*/