import React from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import App_Config from '../config/app-config.json';

const styles = theme => ({
    productViewBox: {
        textAlign: 'center',
        padding: '10px',
    },
    productContent: {
        fontFamily: 'Meiryo',
        fontWeight: 'bold',
        fontSize: '14px',
        marginTop: '5px'
    },
    productImage: {
        width: '100%',
        maxWidth: '150px',
        height: 'auto'
    },
    cardGalleryLink: {
        textDecoration: 'none',
        color: 'black',
        flexBasis: '150px',
        '&:hover': {
            color: '#2bd5c6',
        }
    },
    [theme.breakpoints.up('md')]: {
        cardGalleryLink: {
            flexBasis: '155px',
            border: '1px solid white',
            '&:hover': {
                color: '#2bd5c6',
                border: '1px solid #2bd5c6',
                borderRadius: '5px'
            }
        }
    },
});

function ProductView({ classes, product, productType }) {
    return (
        <Link className={classes.cardGalleryLink} to={{ pathname: '/cardGallery', 
        state: { 
            action: (productType === "startDeck")? "getPlayerDeck": "getCardsBySetId", 
            title: parseSetId(product.setId) + " " + (product.seriesName !== undefined?product.seriesName + " ":"") + (product.seriesNumber !== undefined?product.seriesNumber + " ":"") + product.name, 
            primaryId: (productType === "startDeck")? product._id: product.setId} }}>
            <div className={classes.productViewBox}>
                <img src={App_Config.cloudfrontImageLink + "products/" + product.setId + ".jpg"} className={classes.productImage} />
                <div className={classes.productContent}>
                    {parseSetId(product.setId)}<br />
                    {(product.seriesName !== undefined && product.seriesNumber !== undefined)? <div>{product.seriesName}  {product.seriesNumber}</div>: null}
                    {product.name}
                </div>
            </div>
        </Link>
    );
}

function parseSetId(setId)
{
    var setCode = setId.split(/[0-9]/)[0];
    var setNumber = setId.split(/^[a-zA-Z]+/)[1];
    return setCode.toLocaleUpperCase() + "-" + setNumber;
}

export default withStyles(styles)(ProductView);