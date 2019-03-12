import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { Dialog, DialogContent, DialogTitle, DialogActions, Grid, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import App_Config from '../config/app-config.json';
import { getPlayerDecks, insertCardsToDeck } from '../redux/actions/dmDeckActions';

const styles = theme => ({
    dialogTitle: {
        display: 'flex',
        alignItems: 'center'
    },
    cardImage: {
        width: '215px'
    },
    grow: {
        flexGrow: 1,
      },
    gridContainer: {
        display: 'grid',
        gridGap: '10px',
        marginTop: '10px'
    },
    gridItemImgContainer: {
        textAlign: 'center'
    },
    gridItemDetailContainer: {
        fontFamily: 'Meiryo',
    },
    effectList: {
        listStyleType: 'square'
    },
    formControl: {
        width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
        gridContainer: {
        gridTemplateColumns: 'auto auto'
      },
      gridItemDetailContainer: {
          width: '200px'
      }
    }
});

const mapStateToProps = state => {
    return {
        dmDeckList: state.dmDeckList
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
        getPlayerDecks: () => {dispatch(getPlayerDecks())},
        insertCardsToDeck: (deckId, requestBody) => {dispatch(insertCardsToDeck(deckId, requestBody))}
    };
}

class InsertCardDialog extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            deckId: '',
            quantity: ''
        };
    }

    componentDidMount()
    {
        this.props.getPlayerDecks();
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleDialogClose = () => {
        const { handleClose } = this.props;
        this.setState({ deckId: '', quantity: 0 });
        handleClose();
    }

    submit = (setId, setNumber) => {
        const { insertCardsToDeck } = this.props;
        const { deckId, quantity } = this.state;
        insertCardsToDeck(deckId, {setId: setId, setNumber: setNumber, quantity: quantity});
    }

    render() 
    {
        const { classes, open, card, handleClose, dmDeckList } = this.props;

        if(card === null) return null;

        return (
            <Dialog 
                disableBackdropClick
                disableEscapeKeyDown
                open={open}
                onExit={() => this.handleDialogClose()}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><FormattedMessage id="titleInsertCard" /></DialogTitle>
                <DialogContent>
                    <div className={classes.gridContainer}>
                        <div className={classes.gridItemImgContainer}>
                            <img src={App_Config.dmCardImageLink + card.setId + "-" + card.setNumber + ".jpg"} className={classes.cardImage} />
                        </div>
                        <div className={classes.gridItemDetailContainer}>
                            <Grid container spacing={8}>
                                <Grid item xs={8} sm={12}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="deckId-dropdown"><FormattedMessage id="txtDeck"/></InputLabel>
                                        <Select
                                            value={this.state.deckId}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: 'deckId',
                                                id: 'deckId-dropdown'
                                            }}>
                                            { dmDeckList.map((deck) => <MenuItem key={deck._id} value={deck._id}>{deck.name}</MenuItem>) }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4} sm={12}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="quantity-dropdown"><FormattedMessage id="txtQuantity"/></InputLabel>
                                        <Select
                                            value={this.state.quantity}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: 'quantity',
                                                id: 'quantity-dropdown'
                                            }}>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose()}><FormattedMessage id="btnCancel"/></Button>
                    <Button onClick={() => { this.submit(card.setId, card.setNumber); this.handleDialogClose();}}><FormattedMessage id="btnInsert"/></Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InsertCardDialog));