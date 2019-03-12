import React from 'react';
import {FormattedMessage} from 'react-intl';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

const ConfirmDialog = ({open, closeDialog, dialogTitle, dialogMessage, submitAction, submitButtonText}) => (
    <Dialog
        open={open}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description">
        <DialogTitle id="logout-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
            <DialogContentText id="logout-dialog-description">
                {dialogMessage}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => closeDialog()}><FormattedMessage id="btnCancel"/></Button>
            <Button onClick={() => submitAction()} autoFocus>{submitButtonText}</Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmDialog;