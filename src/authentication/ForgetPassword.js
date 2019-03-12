import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import Typography from '@material-ui/core/Typography';
import { TextField, Grid, Button } from '@material-ui/core';
import { AccountCircle  } from '@material-ui/icons';

class ForgetPassword extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email: '',
            emailErrorMsg: ""
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
            else
            {
                this.setState({emailErrorMsg: errorObj.message});
            }
        }
    }

    handleTextChange(event)
    {
        this.setState({[event.target.id]: event.target.value});
    }

    clearError = (event) => {
        this.setState({ emailErrorMsg: ''});
    }

    render() 
    {
        return(
            <form onSubmit={(e) => { e.preventDefault(); this.props.awsForgetPassword(this.state.email)}} >
                <Grid container direction="column" spacing={16}>
                    <Grid item>
                        <Grid container>
                            <Typography variant="h5" color="textPrimary"><FormattedMessage id="titleForgetPassword"/></Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container alignItems="flex-end">
                            <Grid item xs={2}>
                                <AccountCircle color="primary"/>
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
                        <Grid container>
                            <Grid item xs={12}>
                                <Button variant="contained" color="secondary" type="submit" fullWidth={true} ><FormattedMessage id="btnGetNewPassword"/></Button>
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

export default ForgetPassword;