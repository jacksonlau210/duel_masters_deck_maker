import React from 'react';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles  = theme => (
{
    gridViewBox: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        padding: '10px',
        width: 'inherit',
        height: '100%',
        overflowY: 'auto',
        flexGrow: '1'
    },
    
});

function GridView({ classes, children}) {
    return (
        <Paper className={classes.gridViewBox}>
            { children }
        </Paper>
    );
}

export default withStyles(styles)(GridView);