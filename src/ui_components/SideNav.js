import React from 'react';
import {FormattedMessage} from 'react-intl';
import './SideNav.css';
import { Tooltip, IconButton } from '@material-ui/core';
import { Collections, Work, Language ,PowerSettingsNew } from '@material-ui/icons';
import { Link } from "react-router-dom";
import dmIcon from '../images/dm__icon.png'

function SideNav(props) {
    return (
        <div id="sidenav">
            <div id="topSideNav">
                <img alt="DM" src={dmIcon} id="dmIcon"/>
                <hr/>
                <Link to="/deckManager">
                    <Tooltip title={<FormattedMessage id="titleDeckManager"/>} placement="right">
                        <IconButton color="primary">
                            <Work />
                        </IconButton>
                    </Tooltip>
                </Link>
                <Link to="/productGallery">
                    <Tooltip title={<FormattedMessage id="titleProductGallery"/>} placement="right">
                        <IconButton color="primary">
                            <Collections />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>
            <div id="bottomSideNav">
                <Tooltip title={<FormattedMessage id="titleLanguageSetting"/>} placement="right">
                    <IconButton color="primary" onClick={(e) => props.showLanguageMenu(e)}>
                        <Language />
                    </IconButton>
                </Tooltip>
                <Tooltip title={<FormattedMessage id="titleLogout"/>} placement="right">
                    <IconButton color="primary" onClick={() => props.showConfirmDialog()}>
                        <PowerSettingsNew />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
}
export default SideNav;