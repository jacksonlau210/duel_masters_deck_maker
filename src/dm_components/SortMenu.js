import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { Popover, RadioGroup, FormControl , FormControlLabel, Radio } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    radio: {
        color: '#232E33',
        '&$checked': {
            color: '#263238'
        }
    },
    checked: {}
});

 class SortMenu extends Component
{
    render() 
    {
        const { classes, defaultSelect, sortMenuAnchorEl, handleSortMenuClose, handleSelectChange } = this.props;

        return (
            <Popover
                id="sortMenu"
                anchorEl={sortMenuAnchorEl}
                open={Boolean(sortMenuAnchorEl)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={() => handleSortMenuClose()}>
                    <FormControl className={classes.formControl}>
                        <RadioGroup 
                            name="cardSortMenu" 
                            value={defaultSelect} 
                            onChange={(e) => { handleSelectChange(e.target.value);handleSortMenuClose(); }}>
                            <FormControlLabel value="default" control={<Radio classes={{root: classes.radio, checked: classes.checked}} />} label={<FormattedMessage id="txtSortDefault"/>} />
                            <FormControlLabel value="costLH" control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>} label={<FormattedMessage id="txtSortCostLH"/>} />
                            <FormControlLabel value="costHL" control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>} label={<FormattedMessage id="txtSortCostHL"/>} />
                            <FormControlLabel value="powerLH" control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>} label={<FormattedMessage id="txtSortPowerLH"/>} />
                            <FormControlLabel value="powerHL" control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>} label={<FormattedMessage id="txtSortPowerHL"/>} />
                        </RadioGroup>
                    </FormControl>
             </Popover>
        );
    }
}

export default withStyles(styles)(SortMenu);