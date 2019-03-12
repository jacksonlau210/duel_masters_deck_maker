import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { Button, TextField, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

class DeckNameDialog extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            deckName: '',
            codeErrorMsg: "",
        };
    }

    handleTextChange(event)
    {
        this.setState({deckName: event.target.value});
    }

    handleClose = () => {
        //clear form
        this.setState({
            deckName: ''
        });
        this.props.closeDialog();
    }

    submit = (deckName) => {
        if(deckName.length > 0)
        {
            this.props.handleDeckName(this.state.deckName);
            this.handleClose();
        }
        else
        {
            this.setState({codeErrorMsg: "Deck name cannot be empty"});
        }
    }

    render() 
    {
        const { open, titleId } = this.props;
        const { deckName, codeErrorMsg } = this.state;

        return(
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={open}
                onExit={() => this.handleClose()}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><FormattedMessage id={titleId}/></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <FormattedMessage id="txtDeckNamePrompt"/>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        label={<FormattedMessage id="txtDeckName"/>}
                        value={deckName}
                        error={codeErrorMsg !== ""}
                        helperText={codeErrorMsg}
                        fullWidth
                        onChange={(event) => this.handleTextChange(event)}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.handleClose()}><FormattedMessage id="btnCancel"/></Button>
                    <Button onClick={() => this.submit(deckName)}><FormattedMessage id="btnConfirm"/></Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default DeckNameDialog;