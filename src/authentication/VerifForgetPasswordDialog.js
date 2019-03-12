import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { Grid, Input, InputLabel, InputAdornment, IconButton, FormControl, FormHelperText, Button, TextField, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

class VerifForgetPasswordDialog extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            password: '',
            passwordErrorMsg: "",
            code: '',
            codeErrorMsg: "",
            showPassword: false
        };
    }

    componentDidUpdate(prevProps)
    {
        let errorObj = this.props.errObject;
        if(errorObj && errorObj !== prevProps.errObject)
        {
            if(errorObj === "Code cannot be empty") 
            {
                this.setState({codeErrorMsg: "Code cannot be empty"});
            }
            else if(errorObj.code === "CodeMismatchException") 
            {
                this.setState({codeErrorMsg: "Invalid verification code provided, please try again."});
            }
            else if(errorObj === "Password cannot be empty") 
            {
                this.setState({passwordErrorMsg: "Password cannot be empty"});
            }
            else if(errorObj.message.includes("equal to 6") || errorObj.message.includes("long enough"))
            {
                this.setState({passwordErrorMsg: "Password length must at least has 8 characters"});
            }
            else if(errorObj.code === "InvalidPasswordException" && errorObj.message.includes("uppercase")) 
            {
                this.setState({passwordErrorMsg: "Password must have uppercase characters"});
            }
            else if(errorObj.code === "InvalidPasswordException" && errorObj.message.includes("lowercase")) 
            {
                this.setState({passwordErrorMsg: "Password must have lowercase characters"});
            }
            else if(errorObj.code === "InvalidPasswordException" && errorObj.message.includes("numeric ")) 
            {
                this.setState({passwordErrorMsg: "Password must have numeric characters"});
            }
            else if(errorObj.code === "InvalidPasswordException" && errorObj.message.includes("symbol ")) 
            {
                this.setState({passwordErrorMsg: "Password must have symbol characters"});
            }
            else
            {
                this.setState({codeErrorMsg: errorObj.message});
            }
        }
    }

    handleTextChange(event)
    {
        this.setState({[event.target.id]: event.target.value});
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    clearError = (event) => {
        if(event.target.id === "password")
        {
            this.setState({ passwordErrorMsg: ''});
        }
        else if(event.target.id === "code")
        {
            this.setState({ codeErrorMsg: ''});
        }
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
                <DialogTitle id="form-dialog-title"><FormattedMessage id="titleVerifyForgetPs"/></DialogTitle>
                <DialogContent>
                    <DialogContentText><FormattedMessage id="txtVerifyForgetPsCodePrompt"/></DialogContentText>
                    <Grid container spacing={16}>
                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth={true} error={this.state.passwordErrorMsg !== ""}>
                                <InputLabel htmlFor="password"><FormattedMessage id="txtPassword"/></InputLabel>
                                <Input 
                                    id="password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onInput={(event) => this.clearError(event)}
                                    onChange={(event) => this.handleTextChange(event)}
                                    endAdornment=
                                    {
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}>
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }/>
                                    {this.state.passwordErrorMsg !== "" && <FormHelperText>{this.state.passwordErrorMsg}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}> 
                            <TextField id="code"
                                label={<FormattedMessage id="txtVerifyCode"/>}
                                value={this.state.code} 
                                error={this.state.codeErrorMsg !== ""}
                                helperText={this.state.codeErrorMsg}
                                fullWidth
                                onInput={(event) => this.clearError(event)}
                                onChange={(event) => this.handleTextChange(event)}/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.awsVerifyPasswordCode(this.state.password, this.state.code)} ><FormattedMessage id="btnConfirm"/></Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default VerifForgetPasswordDialog;