import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, AppBar, Toolbar, LinearProgress } from '@material-ui/core';
import { Sort, FilterList, Edit } from '@material-ui/icons';
import { connect } from 'react-redux';
import CardDetailDialog from '../dm_components/CardDetailDialog';
import DeckNameDialog from '../dm_components/DeckNameDialog';
import CardView from '../dm_components/CardView';
import GridView from '../ui_components/GridView';
import FilterDialog from '../dm_components/FilterDialog';
import SortMenu from '../dm_components/SortMenu';
import { sortList, filterList } from '../utils/cardListModifier';
import { setTargetCard, openCardDetailDialog, openDeckNameDialog, closeDeckNameDialog, openFilterDialog } from '../redux/actions/dmDialogActions';

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
        apiCallStatus: state.uiEvents.apiCallStatus,
        showdeckNameDialog: state.dmDialog.deckNameDialog,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setTargetCard: (card) => {dispatch(setTargetCard(card))},
        openCardDetailDialog: () => {dispatch(openCardDetailDialog())},
        openDeckNameDialog: () => {dispatch(openDeckNameDialog())},
        closeDeckNameDialog: () => {dispatch(closeDeckNameDialog())},
        openFilterDialog: () => {dispatch(openFilterDialog())},
    };
}

class CardGrid extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            originalCardList: props.originalCardList,
            displayCardList: props.originalCardList,
            raceList: this.getRaceList(props.originalCardList),
            cardTypeList: this.getCardTypeList(props.originalCardList),
            sortOption: 'default',
            showSortMenu : null,
            showDeckNameDialog: false
        };
    }

    // this function won't triggered in Deck Editor
    componentDidUpdate(prevProps)
    {
        const { originalCardList } = this.props;
        if(originalCardList.length !== prevProps.originalCardList.length)
        {
            this.setState({ originalCardList: originalCardList, displayCardList: originalCardList });
            this.setState({ raceList: this.getRaceList(originalCardList), cardTypeList: this.getCardTypeList(originalCardList) });
        }
    }

    getRaceList = (originalCardList) => {
        if(originalCardList.length === 0) return []; 
        let array = [];
        originalCardList.forEach((card) => {
            if(card.races !== undefined) // filter out all non-creature cards
            {
                (card.races).forEach((race) => {
                    if(!array.includes(race))
                    {
                        array.push(race)
                    }
                })
            }
        });

        return array.sort();
    }

    getCardTypeList = (originalCardList) => {
        if(originalCardList.length === 0) return []; 
        let array = [];
        originalCardList.forEach((card) => {
            if(!array.includes(card.type))
            {
                array.push(card.type)
            }
        });

        return array;
    }

    handleFilterChange = (filterOption) => {
        const { originalCardList, sortOption } = this.state;
        let filteredList = filterList( originalCardList, filterOption );
        this.setState({ displayCardList: sortList(filteredList, filteredList, sortOption)});
    }

    handleSortSelectChange = (option) => {
        const { originalCardList, displayCardList } = this.state;
        this.setState({ sortOption: option, displayCardList: sortList( originalCardList, displayCardList, option ) });
    }

    render() 
    {
        const { classes, apiCallStatus, showdeckNameDialog, 
            setTargetCard, openCardDetailDialog, openDeckNameDialog, closeDeckNameDialog, openFilterDialog,
            gridTitle, titleEditable, editDeckNameFunc, cardAction, removeCardFunc } = this.props;
        const { displayCardList, raceList, cardTypeList, showSortMenu, sortOption } = this.state;

        let iniFilterOption = {
            filterRace: [],
            filterCardType: [],
            filterCivil: [],
            filterRarity: [],
            filterCostRange: ["",""],
            filterPowerRange: ["",""]
        }

        return (
            <Fragment>
                <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="textSecondary" className={classes.gridTitle}>{gridTitle}</Typography>
                    {titleEditable && <IconButton color="secondary" onClick={() => openDeckNameDialog()}>
                        <Edit />
                    </IconButton>}
                    <div className={classes.grow} />
                    <IconButton color="secondary" disabled={apiCallStatus==="started"}>
                        <FilterList onClick={() => openFilterDialog()}/>
                    </IconButton>
                    <IconButton color="secondary" disabled={apiCallStatus==="started"}>
                        <Sort onClick={(e) => this.setState({ showSortMenu: e.currentTarget})}/>
                    </IconButton>
                </Toolbar>
                </AppBar>
                { apiCallStatus==="started" && <LinearProgress /> }
                <GridView>
                    { displayCardList.map((card, index) => <CardView key={card._id+index} card={card} handleClick={(card) => {setTargetCard(card); openCardDetailDialog()}}/>) } 
                </GridView>
                <SortMenu sortMenuAnchorEl={showSortMenu} 
                    defaultSelect={sortOption}
                    handleSelectChange={this.handleSortSelectChange}
                    handleSortMenuClose={() => this.setState({ showSortMenu: null})} />
                <FilterDialog
                    filterOption={iniFilterOption}
                    raceList={raceList}
                    cardTypeList={cardTypeList}
                    handleFilterChange={this.handleFilterChange} />
                <CardDetailDialog cardAction={cardAction} rmCardAction={removeCardFunc}/>
                <DeckNameDialog open={showdeckNameDialog} titleId="titleRenameDeck" handleDeckName={editDeckNameFunc} closeDialog={() => closeDeckNameDialog()}/>
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CardGrid));