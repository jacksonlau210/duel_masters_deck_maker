import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import SideNav from './ui_components/SideNav';
import Typography from '@material-ui/core/Typography';
import { withRouter, Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Menu, MenuItem, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Menu as MenuIcon, Language ,PowerSettingsNew, Work, Collections } from '@material-ui/icons';
import ConfirmDialog from './dm_components/ConfirmDialog'

const styles = theme => (
  {
    root: {
      paddingTop: '56px',
      height: '97vh',
      [theme.breakpoints.up('sm')]: {
        marginLeft: '50px'
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: '60px'
      }
  },
  compName: {
    display: 'none'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  drawerText: {
    "color": "#eeeeee"
  },
  componentWrapper: {
    padding: '10px'
  },
  [theme.breakpoints.up('sm')]: {
    root: {
      paddingTop: '0px'
    },
    compName: {
      display: 'block'
    },
    mobileMenu: {
      display: 'none'
    }
  }
});

class App extends Component 
{
  constructor(props)
    {
        super(props);
        this.state = {
          languageMenuAnchorEl : null,
          showConfirmDialog: false,
          showDrawer: false
        };
    }

  signOut = () => {
      Auth.signOut()
        .then(data => {this.setState({showConfirmDialog: false}); this.props.history.push('/auth');})
        .catch(err => console.log(err));
  }

  toggleDrawer = (open) => () => {
    this.setState({
      showDrawer: open,
    });
  };

  render() 
  {
    const { mainComponent: Component, classes, titleId, changeLanguage } = this.props;
    const { languageMenuAnchorEl, showConfirmDialog, showDrawer } = this.state;

    return (
      <div>
        <SideNav 
          showConfirmDialog={() => this.setState({showConfirmDialog: true})} 
          showLanguageMenu={(e) => this.setState({languageMenuAnchorEl: e.currentTarget})} />
        <div className={classes.root}>
          <AppBar position="fixed" color="primary" className={classes.mobileMenu}>
            <Toolbar>
              <IconButton className={classes.menuButton} 
                color="primary" 
                aria-label="Menu"
                onClick={this.toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                <FormattedMessage id={titleId}/>
              </Typography>
              <IconButton color="primary" onClick={(e) => this.setState({languageMenuAnchorEl: e.currentTarget})}>
                <Language />
              </IconButton>
              <IconButton color="primary" onClick={() => this.setState({showConfirmDialog: true})}>
                <PowerSettingsNew />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.componentWrapper}>
            <div>
              <Typography variant="h3" color="textPrimary" className={classes.compName} gutterBottom><FormattedMessage id={titleId}/></Typography>
              <Component />
            </div>
            
          </div>
        </div >
        <ConfirmDialog open={showConfirmDialog}
          dialogTitle={<FormattedMessage id="titleLogout"/>}
          dialogMessage={<FormattedMessage id="txtLogoutWarn"/>}
          closeDialog={() => this.setState({showConfirmDialog: false})}
          submitButtonText={<FormattedMessage id="titleLogout"/>}
          submitAction={this.signOut}/>
        <Menu
          id="langaugeMenu"
          anchorEl={languageMenuAnchorEl}
          open={Boolean(languageMenuAnchorEl)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={() => this.setState({languageMenuAnchorEl: null})} >
          <MenuItem onClick={() => { localStorage.setItem('langCode', "en");changeLanguage("en");this.setState({languageMenuAnchorEl: null});}}>English</MenuItem>
          <MenuItem onClick={() => { localStorage.setItem('langCode', "zh");changeLanguage("zh");this.setState({languageMenuAnchorEl: null});}}>繁體中文</MenuItem>
          <MenuItem onClick={() => { localStorage.setItem('langCode', "ja");changeLanguage("ja");this.setState({languageMenuAnchorEl: null});}}>日本語</MenuItem>
        </Menu>
        <Drawer anchor="left" open={showDrawer} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}>
            <List>
              <Link to="/deckManager">
                <ListItem>
                    <ListItemIcon><Work /></ListItemIcon>
                    <ListItemText classes={{ primary: classes.drawerText }} primary={<FormattedMessage id="titleDeckManager" />} />
                </ListItem>
              </Link>
              <Link to="/productGallery">
                <ListItem>
                    <ListItemIcon><Collections /></ListItemIcon>
                    <ListItemText classes={{ primary: classes.drawerText }} primary={<FormattedMessage id="titleProductGallery" />} />
                </ListItem>
              </Link>
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(App));
