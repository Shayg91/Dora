import React, { Component } from 'react';
import './Scenarios.css'
import firebase from './scripts/Dora';
import Grid from '@material-ui/core/Grid'

import Scenario from './partials/Scenario';

class Scenarios extends Component{
    constructor(props) {
        super(props);
        
        this.scenarios = ['1','2','3','4'];

        //this.ref = firebase.firestore().collection('scenario');

        /*this.singleLesson = this.ref.doc('U9c0DAnBIl6JznrAjkfa')
            .get()
            .then((doc)=> this.setState({goals: doc.data().goals}));*/
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
        return(
            <div>
                <h3>Scenarios</h3>
                <Grid container direction='column' justify='space-around' alignItems='stretch'>
                    <Scenario data={this.scenarios}/>
                </Grid>
            </div>
        );
    }
}

export default Scenarios;