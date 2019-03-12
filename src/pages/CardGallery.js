import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import { Fab  } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import { connect } from 'react-redux';
import { getCardsBySetId, getCardsByDeckId } from '../redux/actions/dmCardActions';
import CardGrid from '../dm_components/CardGrid';

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
    topFab: {
      position: 'fixed',
      right: theme.spacing.unit * 2,
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
    dmCardList: state.dmCardList
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getCardsBySetId: (setId) => {dispatch(getCardsBySetId(setId))},
    getCardsByDeckId: (deckId) => {dispatch(getCardsByDeckId(deckId))}
  };
}

class CardGallery extends Component 
{
  constructor(props)
  {
      super(props);
      this.state = {
        originCardList: [],
        cachedCardList: [],
        showInsertCardDialog : false
      };
  }

  componentDidMount()
  {
    const { location } = this.props;
    switch(location.state.action)
    {
      case "getCardsBySetId":
        this.props.getCardsBySetId(location.state.primaryId);
        break;
      case "getPlayerDeck":
        this.props.getCardsByDeckId(location.state.primaryId);
        break;
    }
  }

  componentDidUpdate()
  {
    const { cachedCardList } = this.state;
    const { dmCardList } = this.props;
    if(cachedCardList.length === 0 && dmCardList.length > 0)
    {
      this.setState({ cachedCardList: dmCardList, originCardList: dmCardList });
    }
  }

  handleInsertCardDialogClose = () => {
    this.setState({ showInsertCardDialog: false, card: null });
  }

  render() 
  {
    const { classes, location, dmCardList } = this.props;

    return (
      <Fragment>
        <CardGrid 
          gridTitle={location.state.title}
          titleEditable={false}
          originalCardList={dmCardList}
          cardAction="addToDeck"/>
        <Fab color="primary" className={classes.topFab} onClick={() => window.scrollTo(0,0)}>
          <ArrowUpward />
        </Fab>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(CardGallery)));