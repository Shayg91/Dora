import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab'; 
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import './NewScenario.css'

class NewScenario extends Component{
    constructor(props) {
        super(props);

        this.classes = props;
        this.scenarios = [];

        this.state = {
            open: false
        };
    }

    handleOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

    render(){
        return(
        <div>
            <Grid item>
                <Paper onClick={this.handleOpen}><AddIcon/></Paper>
            </Grid>
            
            <Modal open={this.state.open} onClose={this.handleClose} className='modal'>
                <div className='modal-main'>
                    <Typography variant="h6" id="modal-title">
                    Text in a modal
                    </Typography>
                    <Typography variant="subtitle1" id="simple-modal-description">
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                    <Button onClick={this.props.addScenario}>Add New Scenario</Button>
                </div>
            </Modal>
        </div>);
    }
}

export default NewScenario;

/*
<Fab color="secondary" aria-label="Edit" className={this.classes.fab} onClick={this.handleOpen} style="">
                <AddIcon/>
            </Fab>
*/