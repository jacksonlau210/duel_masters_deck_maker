import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, TextField, Input, InputLabel, InputAdornment, IconButton, FormControl, FormHelperText } from '@material-ui/core';
import { Lock, Visibility, VisibilityOff, Email, AccountCircle  } from '@material-ui/icons';

class SignUp extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            emailErrorMsg: "",
            username: "",
            usernameErrorMsg: "",
            password: "",
            passwordErrorMsg: "",
            showPassword: false
        };
    }

    componentDidUpdate(prevProps)
    {
        let errorObj = this.props.errObject;
        if(errorObj && errorObj !== prevProps.errObject)
        {
            if(errorObj.code === "EmptyUserException") 
            {
                this.setState({usernameErrorMsg: "Username cannot be empty"});
            }
            else if(errorObj === "Username cannot be empty") 
            {
                this.setState({emailErrorMsg: "Email cannot be empty"});
            }
            else if(errorObj.code === "UsernameExistsException") 
            {
                this.setState({emailErrorMsg: "Email already in used"});
            }
            else if(errorObj.code === "InvalidParameterException" && errorObj.message.includes("Invalid email")) 
            {
                this.setState({emailErrorMsg: "Invalid email address format."});
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
                this.setState({emailErrorMsg: errorObj.message});
            }
        }
    }

    handleTextChange = event => {
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
        else if(event.target.id === "username")
        {
            this.setState({ usernameErrorMsg: ''});
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
                            <Typography variant="h5" color="textPrimary"><FormattedMessage id="titleSignUp"/></Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container alignItems="flex-end">
                            <Grid item xs={2}>
                                <Email />
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
                                <AccountCircle />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField id="username"
                                    label={<FormattedMessage id="txtUsername"/>}
                                    type="text"
                                    value={this.state.username}
                                    error={this.state.usernameErrorMsg !== ""}
                                    helperText={this.state.usernameErrorMsg}
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
                                        {this.state.passwordErrorMsg !== "" && <FormHelperText>{this.state.passwordErrorMsg}</FormHelperText>}
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" fullWidth={true} 
                                    onClick={() => this.props.awsSignUp(this.state.email, this.state.username, this.state.password)} ><FormattedMessage id="titleSignUp"/></Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container justify="center" alignItems="center">
                            <Grid item>
                                <Button color="primary" onClick={() => this.props.changeState("signIn")}><FormattedMessage id="btnSignInInstead"/></Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default SignUp;