import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import GridView from '../ui_components/GridView';
import DeckView from '../dm_components/DeckView';
import DeckNameDialog from '../dm_components/DeckNameDialog';
import { getPlayerDecks, createPlayerDeck } from '../redux/actions/dmDeckActions';

const styles = theme => ({
  addFab: {
    position: 'fixed',
    right: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 2
  },
  deleteFab: {
    position: 'fixed',
    right: theme.spacing.unit * 4 + 56,
    bottom: theme.spacing.unit * 2
  }
});

const mapStateToProps = state => {
  return {
    dmDeckList: state.dmDeckList,
    apiCallStatus: state.uiEvents.apiCallStatus
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getPlayerDecks: () => {dispatch(getPlayerDecks())},
    createPlayerDeck: (deckName) => {dispatch(createPlayerDeck(deckName))}
  };
}

class DeckManager extends Component 
{
  constructor(props)
    {
        super(props);
        this.state = {
          showDeckNameDialog: false
        };
    }

  componentDidMount()
  {
    this.props.getPlayerDecks();
  }

  createDeck = (deckName) => {
    this.props.createPlayerDeck(deckName);

    //refresh screen
    this.props.getPlayerDecks();
  }

  closeDeckNameDialog = () => {
    this.setState({showDeckNameDialog: false})
  }

  render() 
  {
    const { classes, dmDeckList, apiCallStatus } = this.props;

    return (
      <Fragment>
        { apiCallStatus==="started" && <LinearProgress /> }
        <GridView>
          { dmDeckList.map((deck) => <DeckView key={deck._id} deck={deck} />) }
        </GridView>
        <Fab color="primary" className={classes.addFab} onClick={() => this.setState({showDeckNameDialog: true})}>
          <Add />
        </Fab>
        <DeckNameDialog open={this.state.showDeckNameDialog} titleId="titleNewDeck" handleDeckName={this.createDeck} closeDialog={this.closeDeckNameDialog}/>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DeckManager));