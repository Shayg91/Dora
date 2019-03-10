import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import NewScenario from './NewScenario';

class Scenario extends Component{
    constructor(props) {
        super(props);

        console.log(this.props);
    }

    render(){
        return(<Grid container direction='row' spacing={24}>
            {this.props.data.map(function(scenario){
            return  (<Grid item xs={3}>
                        <Paper>{scenario}</Paper>
            </Grid>)})
            }
            <NewScenario addScenario={this.addScenario}/>
        </Grid>
        )};
}

export default Scenario;