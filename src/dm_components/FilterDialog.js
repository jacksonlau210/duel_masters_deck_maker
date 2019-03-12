import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import Typography from '@material-ui/core/Typography';
import { Dialog, DialogContent, IconButton, Grid, Checkbox, FormControl, FormLabel, FormGroup, TextField } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Save } from '@material-ui/icons';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { closeFilterDialog } from '../redux/actions/dmDialogActions';
import FormControlImage from '../ui_components/FormControlImage'
import CheckboxSelect from '../ui_components/CheckboxSelect'
import App_Config from '../config/app-config.json';

const styles = theme => ({
    dialogTitle: {
        display: 'flex',
        alignItems: 'center'
    },
    grow: {
        flexGrow: 1,
    },
    minMaxField: {
        margin: '5px 10px'
    }
});

const mapStateToProps = state => {
    return {
        showFilterDialog: state.dmDialog.filterDialog,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        closeFilterDialog: () => {dispatch(closeFilterDialog())}
    };
}

class FilterDialog extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { 
            ...props.filterOption,
            costMinErrorMsg: '',
            costMaxErrorMsg: '',
            powerMinErrorMsg: '',
            powerMaxErrorMsg: '',
        };
    }

    handleSelectChange = (originalListName, event, checked) => {
        if(checked) //insert item to list
        {
            this.setState({ [originalListName]: [...this.state[originalListName], event.target.value] });
        }
        else //remove item from list
        {
            this.setState({ [originalListName]: [...this.state[originalListName]].filter((item) => item !== event.target.value) });
        }
    }

    handleRangeChange = (event) => {
        const { filterCostRange, filterPowerRange} = this.state;
        let value = Number(event.target.value);
        let negErrorMsg = "Value cannot be negative";
        let maxErrorMsg = "Max value cannot smaller min value";

        if(event.target.id === "costMin")
        {
            this.setState({ filterCostRange: [event.target.value, filterCostRange[1]]});

            if(value < 0) {
                this.setState({ costMinErrorMsg: negErrorMsg});
            }
        }
        else if(event.target.id === "costMax")
        {
            this.setState({ filterCostRange: [filterCostRange[0], event.target.value]});

            if(value < 0) {
                this.setState({ costMaxErrorMsg: negErrorMsg});
            }
            else if(event.target.value !== "" && value < Number(this.state.filterCostRange[0])) {
                this.setState({ costMaxErrorMsg: maxErrorMsg});
            }
        }
        else if(event.target.id === "powerMin")
        {
            this.setState({ filterPowerRange: [event.target.value, filterPowerRange[1]]});

            if(value < 0) {
                this.setState({ powerMinErrorMsg: negErrorMsg});
            }
        }
        else if(event.target.id === "powerMax")
        {
            this.setState({ filterPowerRange: [filterPowerRange[0], event.target.value]});

            if(value < 0) {
                this.setState({ powerMaxErrorMsg: negErrorMsg});
            }
            else if(event.target.value !== "" && value < Number(this.state.filterPowerRange[0])) {
                this.setState({ powerMaxErrorMsg: maxErrorMsg});
            }
        }
    }

    clearError = (event) => {
        if(event.target.id === "costMin")
        {
            this.setState({ costMinErrorMsg: ''});
        }
        else if(event.target.id === "costMax")
        {
            this.setState({ costMaxErrorMsg: ''});
        }
        else if(event.target.id === "powerMin")
        {
            this.setState({ powerMinErrorMsg: ''});
        }
        else if(event.target.id === "powerMax")
        {
            this.setState({ powerMaxErrorMsg: ''});
        }
    }

    handleOnClose = () => {
        const { closeFilterDialog, handleFilterChange } = this.props;
        const { costMinErrorMsg, costMaxErrorMsg, powerMinErrorMsg, powerMaxErrorMsg } = this.state;
        if((costMinErrorMsg+costMaxErrorMsg+powerMinErrorMsg+powerMaxErrorMsg) === "")
        {
            handleFilterChange(this.state);
            closeFilterDialog();
        }
    }

    render() 
    {
        const { classes, showFilterDialog, raceList, cardTypeList } = this.props;
        const { filterRace, filterCardType, filterCivil, filterRarity, filterCostRange, filterPowerRange, 
            costMinErrorMsg, costMaxErrorMsg, powerMinErrorMsg, powerMaxErrorMsg} = this.state;

        let civilList = ["火","水","自然","光","闇"];
        let rarityList = ["SR", "VR", "R", "U", "C"];

        return(
            <Dialog open={showFilterDialog} onClose={() => this.handleOnClose()}>
                <MuiDialogTitle disableTypography className={classes.dialogTitle}>
                    <Typography variant="h6"><FormattedMessage id="titleFilterOptions"/></Typography>
                    <div className={classes.grow} />
                    <IconButton color="secondary" onClick={() => this.handleOnClose()}>
                        <Save />
                    </IconButton>
                </MuiDialogTitle>
                <DialogContent>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={7}>
                            <CheckboxSelect controlLabel={<FormattedMessage id="txtRace" />} name="filterRace" valueList={filterRace} selectList={raceList} handleSelectChange={this.handleSelectChange}/>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <CheckboxSelect controlLabel={<FormattedMessage id="txtCardType" />} name="filterCardType" valueList={filterCardType} selectList={cardTypeList} handleSelectChange={this.handleSelectChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel><FormattedMessage id="txtCivilization"/></FormLabel>
                                <FormGroup row>
                                    { civilList.map((civil, index) => 
                                        <FormControlImage key={index} control={<Checkbox color="primary" checked={filterCivil.includes(civil)} value={civil} onChange={(event, checked) => this.handleSelectChange("filterCivil", event, checked)} />} imgLink={ App_Config.cloudfrontImageLink + "civilizations/" + civil + ".png" }/> ) } 
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel><FormattedMessage id="txtRarity"/></FormLabel>
                                <FormGroup row>
                                    { rarityList.map((rarity) => 
                                        <FormControlImage key={rarity} control={<Checkbox color="primary" checked={filterRarity.includes(rarity)} value={rarity} onChange={(event, checked) => this.handleSelectChange("filterRarity", event, checked)} />} imgLink={ App_Config.cloudfrontImageLink + "rarity/" + rarity + ".png" }/> ) }
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel><FormattedMessage id="txtCost"/></FormLabel>
                                <FormGroup row>
                                    <TextField
                                        className={classes.minMaxField}
                                        id="costMin"
                                        label={<FormattedMessage id="txtMin"/>}
                                        value={filterCostRange[0]}
                                        type="number"
                                        error={costMinErrorMsg !== ""}
                                        helperText={costMinErrorMsg}
                                        onInput={(e) => this.clearError(e)}
                                        onChange={(e) => this.handleRangeChange(e)} />
                                    <TextField
                                        className={classes.minMaxField}
                                        id="costMax"
                                        label={<FormattedMessage id="txtMax"/>}
                                        value={filterCostRange[1]}
                                        type="number"
                                        error={costMaxErrorMsg !== ""}
                                        helperText={costMaxErrorMsg}
                                        onInput={(e) => this.clearError(e)}
                                        onChange={(e) => this.handleRangeChange(e)} />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel><FormattedMessage id="txtPower"/></FormLabel>
                                <FormGroup row>
                                    <TextField
                                        className={classes.minMaxField}
                                        id="powerMin"
                                        label={<FormattedMessage id="txtMin"/>}
                                        value={filterPowerRange[0]}
                                        type="number"
                                        error={powerMinErrorMsg !== ""}
                                        helperText={powerMinErrorMsg}
                                        onInput={(e) => this.clearError(e)}
                                        onChange={(e) => this.handleRangeChange(e)} />
                                    <TextField
                                        className={classes.minMaxField}
                                        id="powerMax"
                                        label={<FormattedMessage id="txtMax"/>}
                                        value={filterPowerRange[1]}
                                        type="number"
                                        error={powerMaxErrorMsg !== ""}
                                        helperText={powerMaxErrorMsg}
                                        onInput={(e) => this.clearError(e)}
                                        onChange={(e) => this.handleRangeChange(e)} />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilterDialog));