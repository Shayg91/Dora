import React, { Component } from 'react';
import firebase from './scripts/Dora';
import Grid from '@material-ui/core/Grid'
import { TextField, Button, MenuItem, Paper, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'

import './Lesson.css'
import Lesson from './partials/Lesson';


class Lessons extends Component{
    constructor(props) {
        super(props);

        this.state ={
            lessons: [],
            ref: firebase.firestore().collection('lesson'),
            add_new: true,
            added: false,
            data: {
                level: 1,
                action : 1,
                affectPath: '',
            }
        }

        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);

        this.getAllLessons();
    }

    getAllLessons(){

        let currentComponent = this;

        this.state.ref.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                currentComponent.setState(state => ({
                    lessons: [...state.lessons, doc],
                }));
            });
        });

    }

    handleToggleClick() {
        this.setState(state => ({
            add_new: !state.add_new
        }));
    }

    handleSubmit(event) {
        this.setState(state => ({
            added: !state.added
        }));
        event.preventDefault();
    }

    handleSubmitGoal(event) {
        this.setState(state => ({
            added: !state.added
        }));
        event.preventDefault();
        //need to add when pressing add a new goal field
    }

    handleFieldChange = (field) => (event) => {
        let data = { ...this.state.data };
        data[field] = event.target.value;
        this.setState({ data });
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ added: false });
    }

    render(){
        return(
            <div className='main'>
                <h3>Lessons</h3>
                <Grid container direction='column' justify='space-around' alignItems='stretch'>
                    {!this.state.add_new ?
                        <Paper className='paper'>
                            <Grid container direction="column" justify="center" alignItems="flex-start" spacing={16}>
                                <form >
                                    <label>Insert lesson title: </label> <input type="text"/><br/>
                                    <label>Insert lesson category: </label> <input type="text"/><br/>
                                    <label>Insert lesson goal: </label> <input type="text"/>
                                    <Button onClick={this.handleSubmitGoal}>
                                        Add Goal
                                    </Button><br/>
                                    <label>Insert lesson badge: </label> <input type="file"/><br/>
                                    <TextField id="level" label="Scenarios:" select value={this.state.data.level}
                                               onChange={this.handleFieldChange('level')} margin="normal">
                                        <MenuItem key='1' value='1'>
                                            Scenario 1
                                        </MenuItem>
                                        <MenuItem key='2' value='2'>
                                            Scenario 2
                                        </MenuItem>
                                        <MenuItem key='3' value='3'>
                                            Scenario 3
                                        </MenuItem>
                                    </TextField>
                                </form>
                                <Button variant="contained" color='secondary' onClick={this.handleSubmit}>
                                    Save
                                </Button>
                            </Grid>
                        </Paper>
                        : null
                    }
                    <Button variant="contained" className='add-new-btn' onClick={this.handleToggleClick}>
                        {this.state.add_new ? 'Add New Lesson' : 'Close' }
                    </Button>
                    <Lesson data={this.state.lessons}/>
                </Grid>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.added}
                    color='secondary'
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message={<span id="message-id">Lesson Added Successfully!</span>}
                    lesson={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

export default Lessons;