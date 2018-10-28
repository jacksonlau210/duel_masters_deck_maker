import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import dmLogo from './images/dm_logo.png';
import './Maintenance.css';

class Maintenance extends Component
{
    render() {
        return(
            <div className="Maintenance">
                <Grid container className="Maintain-container" alignItems="center" alignContent="center">
                    <Grid item xs={12} >
                        <img src={dmLogo} className="DM-logo" alt="logo" />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className="Maintain-msg" variant="h5" align="center">Site is under maintenance.</Typography>
                    </Grid>
                </Grid>
                
            </div>
        );
    }
}

export default Maintenance;