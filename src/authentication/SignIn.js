import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, TextField, Input, InputLabel, InputAdornment, IconButton, FormControl, FormHelperText } from '@material-ui/core';
import { Lock, Visibility, VisibilityOff, AccountCircle } from '@material-ui/icons';

class SignIn extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            email: '',
            emailErrorMsg: "",
            password: '',
            passwordErrorMsg: "",
            showPassword: false
        };
    }

    componentDidUpdate(prevProps)
    {
        let errorObj = this.props.errObject;
        if(errorObj && errorObj !== prevProps.errObject)
        {
            if(errorObj === "Username cannot be empty") 
            {
                this.setState({emailErrorMsg: "Email cannot be empty"});
            }
            else if(errorObj.code === "UserNotFoundException") 
            {
                this.setState({emailErrorMsg: "Email does not exist"});
            }
            else if(errorObj.code === "UserNotConfirmedException") 
            {
                this.setState({emailErrorMsg: "Account is not confirmed"});
            }
            else if(errorObj.code === "NotAuthorizedException") 
            {
                this.setState({passwordErrorMsg: "Incorrect password"});
            }
            else if(errorObj.code === "UnexpectedLambdaException") 
            {
                this.setState({passwordErrorMsg: "Password cannot be empty"});
            }
            else
            {
                this.setState({emailErrorMsg: errorObj.message});
            }
        }
    }

    handleTextChange = event =>
    {
        this.setState({[event.target.id]: event.target.value});
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    clearError = (event) => {
        if(event.target.id === "email")
        {
            this.setState({ emailErrorMsg: ''});
        }
        else if(event.target.id === "password")
        {
            this.setState({ passwordErrorMsg: ''});
        }
    }

    render() 
    {
        return(
            <form>
                <Grid container direction="column" spacing={16}>
                    <Grid item>
                        <Grid container>
                            <Typography variant="h5" color="textPrimary"><FormattedMessage id="titleSignIn"/></Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container alignItems="flex-end">
                            <Grid item xs={2}>
                                <AccountCircle />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField id="email"
                                    label={<FormattedMessage id="txtEmail"/>}
                                    type="email"
                                    value={this.state.email}
                                    error={this.state.emailErrorMsg !== ""}
                                    helperText={this.state.emailErrorMsg}
                                    fullWidth={true}
                                    onInput={(event) => this.clearError(event)}
                                    onChange={(event) => this.handleTextChange(event)}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container alignItems="flex-end">
                            <Grid item xs={2}>
                                <Lock />
                            </Grid>
                            <Grid item xs={10}>
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
                                        {this.state.passwordErrorMsg !== '' && <FormHelperText>{this.state.passwordErrorMsg}</FormHelperText>}
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" fullWidth={true} onClick={() => this.props.awsSignIn(this.state.email, this.state.password)} ><FormattedMessage id="btnSignIn"/></Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container justify="center" alignItems="center">
                            <Grid item>
                                <Button color="primary" onClick={() => this.props.changeState("forgetPassword")}><FormattedMessage id="btnForgetPassword"/></Button>
                            </Grid>
                            <Grid item>
                                <Button color="primary" onClick={() => this.props.changeState("signUp")}><FormattedMessage id="btnCreateAccount"/></Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container justify="center" alignItems="center">
                            <Grid item>
                                <Button color="primary" onClick={() => this.props.changeLanguage("en")}>EN</Button>
                            </Grid>
                            <Grid item>
                                <Button color="primary" onClick={() => this.props.changeLanguage("zh")}>ZH</Button>
                            </Grid>
                            <Grid item>
                                <Button color="primary" onClick={() => this.props.changeLanguage("ja")}>JA</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default SignIn;