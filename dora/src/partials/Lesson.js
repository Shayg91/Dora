import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Typography, ButtonBase } from '../../node_modules/@material-ui/core';

import './Lesson.css'

class Lesson extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.data.map(doc => (
                    <Paper key={doc.id} className='paper'>
                        <Grid container spacing={16}>
                            <Grid item>
                                <ButtonBase className='image'>
                                    <img className='img' alt="complex" src={doc.data().affectPath} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={6} sm container>
                                <Grid item xs container direction="column" spacing={16}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">
                                            {doc.data().textOrWAV}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography style={{ cursor: 'pointer' }}>Remove</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">{doc.data().level}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </div>
        );
    }
}

export default Lesson;