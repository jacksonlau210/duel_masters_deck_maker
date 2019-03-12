import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DmAuthenticator from '../authentication/DmAuthenticator';
import PrivateRoute from './PrivateRoute';
import DeckManager from '../pages/DeckManager';
import DeckEditor from '../pages/DeckEditor';
import ProductGallery from '../pages/ProductGallery';
import CardGallery from '../pages/CardGallery';

function DmRouter({changeLanguage})
{
  return(
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path='/auth' component={DmAuthenticator} />
        <PrivateRoute exact path='/' component={DeckManager} titleId="titleDeckManager" changeLanguage={changeLanguage}/>
        <PrivateRoute path='/deckManager' component={DeckManager} titleId="titleDeckManager" changeLanguage={changeLanguage}/>
        <PrivateRoute path='/deckEditor' component={DeckEditor} titleId="titleDeckEditor" changeLanguage={changeLanguage}/>
        <PrivateRoute path='/productGallery' component={ProductGallery} titleId="titleProductGallery" changeLanguage={changeLanguage}/>
        <PrivateRoute path='/cardGallery' component={CardGallery} titleId="titleCardGallery" changeLanguage={changeLanguage}/>
      </Switch>
    </Router>
  );
}

export default DmRouter;
