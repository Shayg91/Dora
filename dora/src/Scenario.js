import React, { Component } from 'react';
import './Scenario.css'
import firebase from './scripts/Dora';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import NewScenario from './partials/NewScenario';

class Scenario extends Component{
    constructor(props) {
        super(props);
        
        this.scenarios = [];

        this.ref = firebase.firestore().collection('lesson');

        this.singleLesson = this.ref.doc('U9c0DAnBIl6JznrAjkfa')
            .get()
            .then((doc)=> this.setState({goals: doc.data().goals}));
    }

    updateInput = e => {
        this.senarios.setState({
            [e.target.name]: e.target.value
        });
    };

    addScenario = e => {
        e.preventDefault();
        this.scenarios.push("new-item");
    };

    render(){
        let list = this.scenarios.map(x => console.log(x));
        return(
            <div>
                <h3>Scenarios</h3>
                <Grid container direction='column' justify='space-around' alignItems='stretch'>
                    {/* <Grid container direction='row' spacing={24}>
                        <Grid item xs={3}>
                            <Paper className={this.props.classes.paper}>xs=3</Paper>
                        </Grid>
                        <Grid item xs={3}>
                        <   Paper className={this.props.classes.paper}>xs=3</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={this.props.classes.paper}>xs=3</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={this.props.classes.paper}>xs=3</Paper>
                        </Grid>
                    </Grid> */}
                    <NewScenario addScenario={this.addScenario}/>
                </Grid>
            </div>
        );
    }
}

export default Scenario;