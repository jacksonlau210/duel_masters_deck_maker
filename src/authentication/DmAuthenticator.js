import React, { Component } from 'react';
import dmLogo from '../images/dm_logo.png';
import Grid from '@material-ui/core/Grid';
import Amplify, { Auth } from 'aws-amplify';
import AuthFrame from '../ui_components/AuthFrame';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgetPassword from './ForgetPassword';
import VerifSignInDialog from './VerifSignInDialog';
import VerifForgetPasswordDialog from './VerifForgetPasswordDialog';
import { withRouter } from 'react-router-dom';
import AWS_Config from '../config/aws-config.json';

AWS_Config.API.endpoints[0].custom_header = async () => {
    let token = (await Auth.currentSession()).idToken.jwtToken;
    // console.log(token);
    return { Authorization: token };
}
Amplify.configure(AWS_Config);

class DmAuthenticator extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            authState: 'signIn',
            authUser: null,
            childError: null,
            verificationSignInError: null,
            verificationForgetPsError: null,
            forgetPsEmail: '',
            showVerifCodeDialog: false,
            showVerifPasswordCodeDialog: false
        };
    }

    signIn = (email, password) => {
        Auth.signIn(email, password)
            .then(user => {
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({childError: err})
            });
    }

    signUp = (email, username, password) => {
        if(username.trim().length === 0) //Amplify does not check email length
        {
            this.setState({childError: {code: "EmptyUserException"}})
        }
        else
        {
            Auth.signUp({
                username: email,
                password: password,
                attributes: 
                {
                    email: email,
                    name: username
                }
            })
            .then(data => {
                // if success, system will send email with verification code
                // show dialog for verification code input
                this.setState({authuser: data.user, showVerifCodeDialog: true});
            })
            .catch(err => {
                this.setState({childError: err})
            });
        }
    }

    forgetPassword = (email) => {

        // we only want to run when input does not look like email
        Auth.forgotPassword(email)
            .then(data => {
                this.setState({forgetPsEmail: email, showVerifPasswordCodeDialog: true});
            })
            .catch(err => this.setState({childError: err}));
    }

    resentSignUpCode = () => {
        Auth.resendSignUp(this.state.authuser.username)
            .catch(err => this.setState({verificationSignInError: err}));
    }

    verifySignUpCode = (code) => {
        Auth.confirmSignUp(this.state.authuser.username, code)
            .then(data => {
                this.setState({showVerifCodeDialog: false});
                this.props.history.push('/');
            })
            .catch(err => this.setState({verificationSignInError: err}));
    }

    verifyForgetPasswordCode = (newPassword, code) => {
        Auth.forgotPasswordSubmit(this.state.forgetPsEmail, code, newPassword)
            .then(data => {
                this.setState({showVerifPasswordCodeDialog: false, authState: 'signIn'});
                this.changeState('signIn');
            })
            .catch(err => this.setState({verificationForgetPsError: err}));
    }

    changeState = (targetAuthState) => {
        this.setState({authState: targetAuthState});
    }

    render()
    {
        return(
            <div className="DmAuthenticator">
                <Grid container className="Fullpage-container" 
                    direction="column" alignItems="center" justify="center">
                    <Grid item xs={12} xl={4}>
                        <img src={dmLogo} className="Login-logo" alt="logo" />
                    </Grid>
                    <Grid item xs={10}>
                        <AuthFrame>
                            {(function(authObject) 
                                {
                                    switch(authObject.state.authState) 
                                    {
                                        case 'signIn':
                                            return <SignIn changeState={authObject.changeState} awsSignIn={authObject.signIn} errObject={authObject.state.childError} />;
                                        case 'signUp':
                                            return <SignUp changeState={authObject.changeState} awsSignUp={authObject.signUp} errObject={authObject.state.childError}/>;
                                        case 'forgetPassword':
                                            return <ForgetPassword changeState={authObject.changeState} awsForgetPassword={authObject.forgetPassword} errObject={authObject.state.childError}/>;
                                        default:
                                            return null;
                                    }
                                })(this)
                            }
                        </AuthFrame>
                    </Grid>
                </Grid>
                <VerifSignInDialog open={this.state.showVerifCodeDialog} awsVerifyCode={this.verifySignUpCode}  awsResendCode={this.resentSignUpCode} errObject={this.state.verificationSignInError}/>
                <VerifForgetPasswordDialog open={this.state.showVerifPasswordCodeDialog}  awsVerifyPasswordCode={this.verifyForgetPasswordCode} errObject={this.state.verificationForgetPsError}/>
            </div>
        );
    }
}

export default withRouter(DmAuthenticator);