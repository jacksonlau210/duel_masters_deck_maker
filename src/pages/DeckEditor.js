import React, { Component, Fragment } from 'react';
import {FormattedMessage} from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Fab } from '@material-ui/core';
import { Delete, Save, DeleteSweep, AddToPhotos } from '@material-ui/icons';
import { connect } from 'react-redux';
import { getPlayerDeck, updatePlayerDecks, deletePlayerDeck } from '../redux/actions/dmDeckActions';
import ConfirmDialog from '../dm_components/ConfirmDialog';
import CardGrid from '../dm_components/CardGrid';
import { closeCardDetailDialog } from '../redux/actions/dmDialogActions';


const styles = theme => ({
    flexColumnBox: {
      display: 'flex',
      flexFlow: 'column',
      height: '100%'
    },
    gridWrapper: {
      height: '100%'
    },
    firstColumn: {
      display: 'flex',
      flexFlow: 'column'
    },
    secondColumn: {
      display: 'grid'
    },
    grow: {
      flexGrow: 1,
    },
    gridTitle: {
      fontWeight: 'bold'
    },
    saveFab: {
      position: 'fixed',
      right: theme.spacing.unit * 2,
      bottom: theme.spacing.unit * 2
    },
    deleteFab: {
        position: 'fixed',
        right: theme.spacing.unit * 4 + 56,
        bottom: theme.spacing.unit * 2
    },
    insertCardFab: {
        position: 'fixed',
        right: theme.spacing.unit * 6 + 112,
        bottom: theme.spacing.unit * 2
    },
    [theme.breakpoints.up('lg')]: {
      firstColumn: {
        gridTemplateRows: 'auto'
      },
      secondColumn: {
        gridTemplateRows: 'auto'
      }
    }
});

const mapStateToProps = state => {
  return {
    dmDeck: state.dmDeckList[0],
    apiCallStatus: state.uiEvents.apiCallStatus
  };
}

const mapDispatchToProps = dispatch => {
  return {
    closeCardDetailDialog: () => {dispatch(closeCardDetailDialog())},
    getPlayerDeck: (deckId) => {dispatch(getPlayerDeck(deckId))},
    updatePlayerDecks: (deckObject) => {dispatch(updatePlayerDecks(deckObject._id, deckObject))},
    deletePlayerDeck: (deckId) => {dispatch(deletePlayerDeck(deckId))}
  };
}

class DeckEditor extends Component 
{
  constructor(props)
  {
      super(props);
      this.state = {
        card: null,
        cachedDeck: null,
        showConfirmDialog: false
      };
  }

  componentDidMount()
  {
    const { location, getPlayerDeck } = this.props;
    getPlayerDeck(location.state.deckId);
  }

  componentDidUpdate()
  {
    const { cachedDeck } = this.state;
    const { dmDeck } = this.props;
    if(cachedDeck === null && dmDeck !== undefined)
    {
      this.setState({ cachedDeck: dmDeck });
    }
  }

  editDeckName = (deckName) => {
    const { cachedDeck } = this.state;
    let newDeck = { ...cachedDeck };
    newDeck.name = deckName;
    this.setState({ cachedDeck: newDeck });
  }

  removeCardFromDeck = (removingCard) => {
    const { closeCardDetailDialog } = this.props;
    const { cachedDeck } = this.state;
    let newDeck = { ...cachedDeck };
    newDeck.cards = cachedDeck.cards.filter(card => card !== removingCard);
    this.setState({ cachedDeck: newDeck });
    closeCardDetailDialog();
  }

  render() 
  {
    const { classes, updatePlayerDecks, deletePlayerDeck } = this.props;
    const { cachedDeck, showConfirmDialog } = this.state;

    if(cachedDeck===null) return null;

    return (
      <Fragment>
        <CardGrid 
          gridTitle={cachedDeck.name}
          titleEditable={true}
          originalCardList={cachedDeck.cards}
          cardAction="rmFromDeck"
          removeCardFunc={this.removeCardFromDeck}
          editDeckNameFunc={this.editDeckName} />
        <Link to={{ pathname: '/productGallery' }}>
          <Fab color="primary" className={classes.insertCardFab}>
            <AddToPhotos />
          </Fab>
        </Link>
        <Fab color="primary" className={classes.deleteFab} onClick={() => this.setState({showConfirmDialog: true})}>
          <Delete />
        </Fab>
        <Fab color="primary" className={classes.saveFab} onClick={() => {updatePlayerDecks(cachedDeck);this.props.history.push('/deckManager');}}>
          <Save />
        </Fab>
        <ConfirmDialog open={showConfirmDialog}
          dialogTitle={<FormattedMessage id="titleRemoveDeck"/>}
          dialogMessage={<FormattedMessage id="txtRemoveDeckWarn"/>}
          closeDialog={() => this.setState({showConfirmDialog: false})}
          submitButtonText={<FormattedMessage id="btnRemove"/>}
          submitAction={() => {deletePlayerDeck(cachedDeck._id);this.props.history.push('/deckManager');}}/>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(DeckEditor)));