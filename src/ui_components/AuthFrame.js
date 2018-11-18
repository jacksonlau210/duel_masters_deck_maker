import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: '30px'
    }
};

function AuthFrame(props) {
    const { classes, children } = props;

    return (
        <Paper classes={{root: classes.root}} elevation={1}>
          { children }
        </Paper>
      );
}
export default withStyles(styles)(AuthFrame);