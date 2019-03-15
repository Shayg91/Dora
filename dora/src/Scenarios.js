import React, { Component } from 'react';
import firebase from './scripts/Dora';
import Grid from '@material-ui/core/Grid'
import { TextField, Button, MenuItem, Paper, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'

import './Scenarios.css'

import Scenario from './partials/Scenario';

class Scenarios extends Component{
    constructor(props) {
        super(props);

        this.state ={
            scenarios: [],
            ref: firebase.firestore().collection('scenario'),
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

        this.getAllScenarios();
    }

    getAllScenarios(){

        let currentComponent = this;

        this.state.ref.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                currentComponent.setState(state => ({
                    scenarios: [...state.scenarios, doc],
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
        this.state.ref.add(this.state.data);
        this.setState(state => ({
            added: !state.added,
            add_new: !state.add_new,
            data: {
                level: 1,
                action: 1,
                affectPath: ""
            }
        }));
        event.preventDefault();
    }

    handleFieldChange = field => event => {
        let data = { ...this.state.data };
        data[field] = event.target.value;
        this.setState({ data });
    };

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        this.setState({ added: false });
    };

    render(){
        return(
            <div className='main'>
                <h3>Scenarios</h3>
                <Grid container direction='column' justify='space-around' alignItems='stretch'>
                    {!this.state.add_new ?
                        <Paper className='paper'>
                            <Grid container direction="column" justify="center" alignItems="flex-start" spacing={16}>
                                <form >
                                    <label>Select action:</label><br/>
                                    <TextField id="Action" select value={this.state.data.action}
                                               onChange={this.handleFieldChange('action')} margin="normal">
                                        <MenuItem key='1' value='1'>
                                            Action 1
                                        </MenuItem>
                                        <MenuItem key='2' value='2'>
                                            Action 2
                                        </MenuItem>
                                        <MenuItem key='3' value='3'>
                                            Action 3
                                        </MenuItem>
                                    </TextField >
                                    <br/>
                                    <TextField id="level" label="Level" select value={this.state.data.level}
                                               onChange={this.handleFieldChange('level')} margin="normal">
                                        <MenuItem key='1' value='1'>
                                            Level 1
                                        </MenuItem>
                                        <MenuItem key='2' value='2'>
                                            Level 2
                                        </MenuItem>
                                        <MenuItem key='3' value='3'>
                                            Level 3
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
                    <Button
                        variant="contained"
                        className="add-new-btn"
                        color="secondary"
                        onClick={this.handleToggleClick}
                    >
                        {this.state.add_new ? "Add New Scenario" : "Close"}
                    </Button>
                    <Scenario data={this.state.scenarios}/>
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
                    message={<span id="message-id">Scenario Added Successfully!</span>}
                    scenario={[
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

export default Scenarios;