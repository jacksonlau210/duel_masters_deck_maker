import React, { Component } from 'react';
import {  Route, Redirect, withRouter } from "react-router-dom";
import { Auth } from 'aws-amplify';
import App from '../App';

class PrivateRoute extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            shouldRender: false,
            authUser: null
        };
    }

    componentDidMount()
    {
        // check user login when they first launch the page
        Auth.currentAuthenticatedUser()
            .then(user => this.setState({shouldRender: true,authUser: user}))
            // when shouldRender still set to false, render() would not render anything
            // that's why we cannot use setState here
            .catch(err => this.props.history.push('/auth')); 

        // check user login when the path changed
        this.unlisten = this.props.history.listen(() => {
            Auth.currentAuthenticatedUser()
            .then(user => {this.setState({shouldRender: true,authUser: user})})
            .catch(err => {this.setState({authUser: null})});
        });
    }

    componentWillUnmount()
    {
        this.unlisten();
    }

    render()
    {
        const { component: Component,  titleId, changeLanguage, ...rest } = this.props;
        const { shouldRender, authUser } = this.state;

        if (!shouldRender) return null;
        
        return(
            <Route {...rest}
                render={props => {
                    return authUser !== null? 
                        (<App authUser={authUser} mainComponent={Component} titleId={titleId} changeLanguage={changeLanguage} {...props} />) :
                        (<Redirect to={{ pathname: "/auth"}} />)
                }}/>
        );
    }
}

export default withRouter(PrivateRoute);
