import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import LanguageIcon from '@material-ui/icons/Language';
import I18n from '../../config/i18n';
import { Link, withRouter, NavLink } from 'react-router-dom';

import './header.css';
import UserService from '../../services/UserService';

class Header extends Component {

    state = {
        anchorEl: null,
        auth: UserService.isAuthenticated(),
        currentLang: 'fr'
    };

    handleMenu = event => {
        this.setState({ ...this.state, anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ ...this.state, anchorEl: null });
    };

    handleLogout = () => {
        UserService.logout();
        if(!UserService.isAuthenticated()){
            this.setState({ ...this.state, auth: false})
            this.props.history.push("/login");
        }
    };

    changeLang = () => {
        this.setState({...this.state, currentLang: this.state.currentLang === 'fr' ? 'en' : 'fr' });
    }

    render() {

        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        console.log(this.state.currentLang)

        return (

            <div>
                <AppBar position="static">
                    <Toolbar>
                        { this.state.auth &&
                        <div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}><Link ignoreLocale to={"/" + (this.state.currentLang === 'fr' ? 'en' : 'fr')} className="menuLink"><I18n t="home"/></Link></MenuItem>
                                <MenuItem onClick={this.handleClose}><Link ignoreLocale to={"/" + (this.state.currentLang === 'fr' ? 'en' : 'fr') + "/companies"} className="menuLink"><I18n t="companies"/></Link></MenuItem>
                                <MenuItem onClick={this.handleClose}><Link ignoreLocale to={"/" + (this.state.currentLang === 'fr' ? 'en' : 'fr') + "/computers" } className="menuLink"><I18n t="computers"/></Link></MenuItem>
                            </Menu>
                        </div> }
                        <Typography variant="h6" color="inherit" className="grow">
                            <I18n t="welcome"/>
                        </Typography>
                        <div id="navDiv">
                            { this.state.currentLang === 'fr' ? <NavLink ignoreLocale to="/fr" className="lang langLink" onClick={this.changeLang}><LanguageIcon className="lang"/><p className="lang langLabel">Fr</p></NavLink> :
                            <NavLink ignoreLocale to="/en" className="lang langLink" onClick={this.changeLang}><LanguageIcon className="lang"/><p className="lang langLabel">En</p></NavLink> }
                        { this.state.auth &&
                            <IconButton color="inherit" onClick={this.handleLogout}>
                                <AccountCircle className="account-icon"/><I18n t="logout"/>
                            </IconButton> }
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withRouter(Header);