import React from 'react';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import App_Config from '../config/app-config.json';

const styles = theme => ({
    cardViewBox: {
        textAlign: 'center',
        padding: '10px'
    },
    cardContent: {
        fontFamily: 'Meiryo',
        fontWeight: 'bold',
        fontSize: '10px',
        marginTop: '5px'
    },
    cardImage: {
        width: '100%',
        maxWidth: '130px',
        height: 'auto'
    },
    cardDetailLink: {
        textDecoration: 'none',
        color: 'black',
        flexBasis: '85px',
        '&:hover': {
            color: '#2bd5c6',
        }
    },
    [theme.breakpoints.up('sm')]: {
        cardDetailLink: {
            flexBasis: '115px'
        }
    },
    [theme.breakpoints.up('md')]: {
        cardContent: {
            fontSize: '13px'
        },
        cardDetailLink: {
            flexBasis: '145px',
            border: '1px solid white',
            '&:hover': {
                border: '1px solid #2bd5c6',
                borderRadius: '5px'
            }
        }
    },
});

function CardView({ classes, card, handleClick }) {
    return (
        <div className={classnames(classes.cardViewBox, classes.cardDetailLink)} onClick={() => handleClick(card)}>
            <img src={App_Config.dmCardImageLink + card.setId + "-" + card.setNumber + ".jpg"} className={classes.cardImage} />
            <div className={classes.cardContent}>
                {card.setId.toUpperCase()} - {card.setNumber}<br />
                {card.name}
            </div>
        </div>
    );
}

export default withStyles(styles)(CardView);