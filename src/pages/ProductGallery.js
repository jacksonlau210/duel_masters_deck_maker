import React, { Component, Fragment } from 'react';
import {FormattedMessage} from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Grid, Toolbar, Button, LinearProgress, Fab } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import { connect } from 'react-redux';
import GridView from '../ui_components/GridView';
import ProductView from '../dm_components/ProductView';
import { getBoosterPack, getStarterDeck } from '../redux/actions/dmProductActions'

const styles = theme => ({
  appBarButtonWrapper: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto'
  },
  topFab: {
    position: 'fixed',
    right: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 2
  }
});

const mapStateToProps = state => {
  return {
    dmProductList: state.dmProductList,
    apiCallStatus: state.uiEvents.apiCallStatus
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getBoosterPack: () => {dispatch(getBoosterPack())},
    getStarterDeck: () => {dispatch(getStarterDeck())},
  };
}

class ProductGallery extends Component 
{
  constructor(props)
    {
        super(props);
        this.state = {
            productType: ""
        };
    }

  componentDidMount()
  {
    this.getDmProduct("boosterPack");
  }

  getDmProduct = productType => {
    const { getBoosterPack, getStarterDeck } = this.props;
    this.setState({productType: productType});
    switch(productType)
    {
      case "boosterPack":
        getBoosterPack();
        break;
      case "startDeck":
        getStarterDeck();
        break;
    }
  }

  render() 
  {
    const { classes, dmProductList, apiCallStatus } = this.props;

    return (
      <Fragment>
        <AppBar position="static" color="default">
            <Toolbar>
              <Grid container justify="space-between" spacing={8}>
                <Grid item xs={12} sm={5} className={classes.appBarButtonWrapper}>
                  <Button onClick={() => this.getDmProduct("boosterPack")}><FormattedMessage id="txtBoosterPacks"/></Button>
                  <Button onClick={() => this.getDmProduct("startDeck")}><FormattedMessage id="txtStarterDecks"/></Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          { apiCallStatus==="started" && <LinearProgress /> }
          <GridView>
              { dmProductList.map((product) => <ProductView key={product._id} product={product} productType={this.state.productType}/>) }
          </GridView>
          <Fab color="primary" className={classes.topFab}>
            <ArrowUpward />
          </Fab>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductGallery));