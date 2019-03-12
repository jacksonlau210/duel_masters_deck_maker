import React, { Fragment } from 'react';
import {FormattedMessage} from 'react-intl';
import Typography from '@material-ui/core/Typography';
import { Dialog, DialogContent, IconButton, Divider } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Close, Archive, DeleteSweep } from '@material-ui/icons';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import App_Config from '../config/app-config.json';
import imgDialogBackground from '../images/dialog_background.gif';
import InsertCardDialog from '../dm_components/InsertCardDialog';
import { closeCardDetailDialog, openinsertCardDialog, closeinsertCardDialog } from '../redux/actions/dmDialogActions';

const styles = theme => ({
    dialogTitleBar: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#263238'
    },
    dialogTitle: {
        color: '#eeeeee'
    },
    dialogContent: {
        backgroundImage: 'url('+imgDialogBackground+')'
    },
    cardImage: {
        width: '215px'
    },
    civilImage: {
        height: '30px'
    },
    grow: {
        flexGrow: 1,
    },
    gridContainer: {
        display: 'grid',
        gridGap: '10px',
        marginTop: '25px'
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
    [theme.breakpoints.up('sm')]: {
        gridContainer: {
        gridTemplateColumns: 'auto auto'
      }
    }
});

const mapStateToProps = state => {
    return {
        showDetailDialog: state.dmDialog.cardDetailDialog,
        showInsertDialog: state.dmDialog.insertCardDialog,
        card: state.dmDialog.targetCard
    };
}

const mapDispatchToProps = dispatch => {
    return {
        closeCardDetailDialog: () => {dispatch(closeCardDetailDialog())},
        openinsertCardDialog: () => {dispatch(openinsertCardDialog())},
        closeinsertCardDialog: () => {dispatch(closeinsertCardDialog())}
    };
}

const CardDetailDialog = ({classes, showDetailDialog, showInsertDialog, card, 
    closeCardDetailDialog, openinsertCardDialog, closeinsertCardDialog, cardAction, rmCardAction}) => {
        if(card === null) return null;
        return (
            <Fragment>
                <Dialog open={showDetailDialog} onClose={() => closeCardDetailDialog()}>
                    <MuiDialogTitle disableTypography className={classes.dialogTitleBar}>
                        <Typography variant="h6" className={classes.dialogTitle}><FormattedMessage id="titleCardDetail"/></Typography>
                        <div className={classes.grow} />
                        { cardAction==="addToDeck" && 
                            <IconButton color="primary" onClick={() => {closeCardDetailDialog();openinsertCardDialog();}}>
                                <Archive />
                            </IconButton>}
                        { cardAction==="rmFromDeck" && 
                            <IconButton color="primary" onClick={() => rmCardAction(card)}>
                                <DeleteSweep />
                            </IconButton>}
                        <IconButton color="primary" onClick={() => closeCardDetailDialog()}>
                            <Close />
                        </IconButton>
                    </MuiDialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <div className={classes.gridContainer}>
                            <div className={classes.gridItemImgContainer}>
                                <img src={App_Config.dmCardImageLink + card.setId + "-" + card.setNumber + ".jpg"} className={classes.cardImage} />
                            </div>
                            <div className={classes.gridItemDetailContainer}>
                                {card.name} {card.setId.toUpperCase()} {card.setNumber}<br />
                                {card.type} {card.civilizations.map((civil) => <img src={App_Config.cloudfrontImageLink + "civilizations/" + civil + ".png"} className={classes.civilImage}/>)} 
                                <img src={App_Config.cloudfrontImageLink + "rarity/" + card.rarityCd + ".png"} /><br />
                                コスト {card.cost} マナ {card.mana} パワー {card.power!==undefined && card.power}<br />
                                {card.races !== undefined && (card.races.map((race) => race))}
                                <Divider light />
                                <ul className={classes.effectList}>
                                    {card.effects.map((effect, index) => <li key={card.setNumber+index}>{effect}</li>)}
                                </ul>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                <InsertCardDialog open={showInsertDialog} card={card} handleClose={() => closeinsertCardDialog()}/>
            </Fragment>
        );
    };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CardDetailDialog));