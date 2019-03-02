import React, { Component } from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/List'
import ListItemText from '@material-ui/core/List'
import ListItemSecondaryAction from '@material-ui/core/List'
import IconButton from '@material-ui/core/List'
import DeleteIcon from '@material-ui/icon/Delete'

class GoalsList extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className={this.props.classes.demo}>
                <List>
                    {generate(
                        <ListItem>
                        <ListItemText primary="Single-line item" />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Delete">
                            <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                        </ListItem>,
                    )}
                </List>
            </div>)
    }
}

export default GoalsList;