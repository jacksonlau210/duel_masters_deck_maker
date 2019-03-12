import React from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import imgDeckCase from '../images/deck_case.png';

const styles = theme => ({
    deckViewBox: {
        textAlign: 'center',
        padding: '10px',
    },
    deckContent: {
        fontFamily: 'Meiryo',
        fontWeight: 'bold',
        fontSize: '14px',
        marginTop: '5px'
    },
    deckImage: {
        width: '100%',
        maxWidth: '100px',
        height: 'auto'
    },
    deckDetailLink: {
        textDecoration: 'none',
        color: 'black',
        flexBasis: '100px',
        '&:hover': {
            color: '#2bd5c6',
        }
    },
    [theme.breakpoints.up('md')]: {
        deckDetailLink: {
            flexBasis: '105px',
            border: '1px solid white',
            '&:hover': {
                color: '#2bd5c6',
                border: '1px solid #2bd5c6',
                borderRadius: '5px'
            }
        }
    },
});

function DeckView({ classes, deck }) {
    return (
        <Link className={classes.deckDetailLink} to={{ pathname: '/deckEditor', 
        state: { deckId: deck._id } }}>
            <div className={classes.deckViewBox}>
                <img src={imgDeckCase} className={classes.deckImage} />
                <div className={classes.deckContent}>
                    {deck.name}
                </div>
            </div>
        </Link>
    );
}

export default withStyles(styles)(DeckView);