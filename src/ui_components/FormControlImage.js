import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    checkBoxImg: {
        maxHeight: '20px',
        verticalAlign: 'middle'
    },
});

function FormControlImage({ classes, control, imgLink }) 
{
    return (
        <span>
            {control}
            <img src={imgLink} className={classes.checkBoxImg}/>
        </span>
    );
}

export default withStyles(styles)(FormControlImage);