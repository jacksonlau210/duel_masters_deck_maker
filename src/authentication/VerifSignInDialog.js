import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { Button, TextField, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

class VerifSignInDialog extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            code: '',
            codeErrorMsg: ""
        };
    }

    componentDidUpdate(prevProps)
    {
        let errorObj = this.props.errObject;
        if(errorObj && errorObj !== prevProps.errObject)
        {
                this.setState({codeErrorMsg: "Invalid verification code provided, please try again"});
            if(errorObj === "Code cannot be empty") 
            {
                this.setState({codeErrorMsg: "Code cannot be empty"});
            }
            else if(errorObj.code === "CodeMismatchException") 
            {
                this.setState({codeErrorMsg: "Invalid verification code provided, please try again"});
            }
            else
            {
                this.setState({codeErrorMsg: errorObj.message});
            }
        }
    }

    handleTextChange(event)
    {
        this.setState({code: event.target.value});
    }

    clearError = (event) => {
        this.setState({ codeErrorMsg: ''});
    }

    handleClose = () => {
        //clear form
        this.setState({
            password: '',
            passwordErrorMsg: "",
            code: '',
            codeErrorMsg: "",
            showPassword: false
        });
    }

    render() 
    {
        return(
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={this.props.open}
                onExit={() => this.handleClose()}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><FormattedMessage id="titleVerifySignIn"/></DialogTitle>
                <DialogContent>
                    <DialogContentText><FormattedMessage id="txtVerifySignInCodePrompt"/></DialogContentText>
                    <TextField
                        autoFocus
                        label={<FormattedMessage id="txtVerifyCode"/>}
                        value={this.state.code} 
                        error={this.state.codeErrorMsg !== ""}
                        helperText={this.state.codeErrorMsg}
                        fullWidth
                        onInput={(event) => this.clearError(event)}
                        onChange={(event) => this.handleTextChange(event)}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.awsResendCode()} ><FormattedMessage id="btnResendCode"/></Button>
                    <Button onClick={() => this.props.awsVerifyCode(this.state.code)} ><FormattedMessage id="btnConfirm"/></Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default VerifSignInDialog;