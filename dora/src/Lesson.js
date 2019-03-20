import React from 'react';
import firebase from './scripts/Dora';
import Grid from '@material-ui/core/Grid'
import { TextField, Button, Paper, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import './Lesson.css'
import Lesson from './partials/Lesson';
import Scenarios from "./Scenarios";
import Scenario from "./partials/Scenario";

class Lessons extends Scenarios{
    constructor(props) {
        super(props);

        this.state = {
            lessons: [],
            ref: firebase.firestore().collection('lesson'),
            add_new: true,
            added: false,
            data: {
                title: '',
                category: '',
                badge: '',
                goals: '',
                scenarios: 1,
                affectPath: '',
            }
        }

        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmitGoal = this.handleSubmitGoal.bind(this);
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
        this.state.ref.add(this.state.data);
        this.setState(state => ({
            added: !state.added,
            add_new: !state.add_new,
            data: {
                title: '',
                category: '',
                badge: '',
                goals: '',
                scenarios: 1,
                affectPath: '',
            }}));
        event.preventDefault();
    }

    handleSubmitGoal = () => {
            this.setState({
                goals: this.state.goals.concat('goals')
            });
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
                <h3>Lessons</h3>
                <Grid container direction='column' justify='space-around' alignItems='stretch'>
                    {!this.state.add_new ?
                        <Paper className='paper'>
                            <Grid container direction="column" justify="center" alignItems="flex-start" spacing={16}>
                                <form >
                                    <TextField
                                        id="title"
                                        label="Insert lesson title"
                                        fullWidth
                                        value={this.state.data.title}
                                        onChange={this.handleFieldChange("title")}
                                        margin="normal"
                                    /><br/>
                                    <TextField
                                        id="category"
                                        label="Insert lesson category"
                                        fullWidth
                                        value={this.state.data.category}
                                        onChange={this.handleFieldChange("category")}
                                        margin="normal"
                                    /><br/>
                                    <TextField
                                        id="goals"
                                        label="Insert lesson goals"
                                        fullWidth
                                        value={this.state.data.goals}
                                        onChange={this.handleFieldChange("goals")}
                                        margin="normal"
                                    />
                                    <Button color='secondary' variant="contained" onClick={this.handleSubmitGoal}>
                                        Add Goal
                                    </Button><br/>
                                    <br/><label>Insert lesson badge: </label> <input type="file" accept={"image/jpeg",
                                    "image/png", "video/mp4"}/><br/>
                                    <Scenarios/>
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
                        {this.state.add_new ? "Add New Lesson" : "Close"}
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