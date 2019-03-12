import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Chip } from '@material-ui/core';

const styles = theme => ({
    selectFormControl: {
        width: '100%'
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        margin: theme.spacing.unit / 4
    },
});

function CheckboxSelect({ classes, controlLabel, name, valueList, selectList, handleSelectChange }) 
{
    return (
        <FormControl className={classes.selectFormControl}>
            <InputLabel>{controlLabel}</InputLabel>
            <Select multiple value={valueList}
                renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map((value, index) => (
                        <Chip key={index} label={value} className={classes.chip} />
                      ))}
                    </div>
                  )}>
                {selectList.map((selectOption, index) =>
                    <MenuItem key={index} value={selectOption}>
                        <Checkbox color="primary" checked={valueList.includes(selectOption)} value={selectOption} onChange={(event, checked) => handleSelectChange(name, event, checked)}/>
                        <ListItemText primary={selectOption} />
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

export default withStyles(styles)(CheckboxSelect);