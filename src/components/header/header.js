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
import InputIcon from '@material-ui/icons/Input';
import I18n from '../../config/i18n';
import { Link, withRouter, NavLink } from 'react-router-dom';

import './header.css';
import UserService from '../../services/UserService';
import MySnackbar from "../MySnackbar";

class Header extends Component {

    state = {
        anchorEl: null,
        auth: UserService.isAuthenticated(),
        menuDisplayed: false,
        snackbar: false,
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick);
    }

    handleClick = (event) => {
        if (this.state.menuDisplayed === true & event.target.tagName !== 'A') {
            this.setState({ ...this.state, menuDisplayed: !this.state.menuDisplayed });
            document.getElementById('dropdownMenu').setAttribute("style", "display: none;");
        }
    }

    handleMenu = event => {
        this.setState({ ...this.state, anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ ...this.state, anchorEl: null });
    };

    handleLogout = () => {
        this.toggleMenu();
        UserService.logout();
        if (!UserService.isAuthenticated()) {
            this.setState({ ...this.state, auth: false })
            this.props.history.push("/login");
            this.handleSnack();
        }
    };

    toggleMenu = () => {
        this.setState({ ...this.state, menuDisplayed: !this.state.menuDisplayed });
        if (this.state.menuDisplayed) {
            document.getElementById('dropdownMenu').setAttribute("style", "display: none;");
        }
        else {
            document.getElementById('dropdownMenu').setAttribute("style", "display: flex;");
        }
    }

    handleUrl = (lang) => {
        var urlTab = window.location.pathname.split("/");
        if (urlTab[1] === 'fr' || urlTab[1] === 'en') {
            urlTab.splice(1, 1);
        }
        urlTab = urlTab.join('/');
        urlTab = "/" + lang + urlTab;
        return urlTab;
    }

    changeLang = () => {
        localStorage.setItem("language", localStorage.getItem("language") === "fr" ? "en" : "fr");
        this.toggleMenu();
    }

    snackbar = () => {
        return this.state.snackbar;
    }

    handleSnack = () => {
        this.setState({ snackbar: !this.state.snackbar })
    };

    refresh = () => {
        window.location.replace(this.handleUrl(localStorage.getItem("language")));
    }

    render() {

        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (

            <div>
                <AppBar position="static">
                    <Toolbar>
                        {this.state.auth &&
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
                                    <Link to={"/" + localStorage.getItem("language") + "/companies"} className="menuLink"><MenuItem onClick={this.handleClose}><I18n t="companies" /></MenuItem></Link>
                                    <Link to={"/" + localStorage.getItem("language") + "/computers"} className="menuLink"><MenuItem onClick={this.handleClose}><I18n t="computers" /></MenuItem></Link>
                                    {
                                        UserService.isAdmin() &&
                                    <Link to={"/" + localStorage.getItem("language") + "/users"} className="menuLink"><MenuItem onClick={this.handleClose}><I18n t="admin" /></MenuItem></Link>
                                }
                                </Menu>
                            </div>}
                        <Typography variant="h6" color="inherit" className="grow" >
                            <NavLink to="#" onClick={this.refresh} className="welcome"><I18n t="welcome"/></NavLink>
                        </Typography>
                        <div>

                            <IconButton color="inherit" onClick={this.toggleMenu}>
                                <AccountCircle className="account-icon" /><I18n t="settings" />
                            </IconButton>
                            <div id="dropdownMenu">
                                <NavLink to={this.handleUrl('en')} className="dropdownItem" onClick={this.handleUrl}><LanguageIcon /><I18n t="english" /></NavLink>
                                <NavLink to={this.handleUrl('fr')} className="dropdownItem" onClick={this.changeLang}><LanguageIcon /><I18n t="french" /></NavLink>
                                {this.state.auth &&
                                    <div>
                                        <NavLink to="#" className="dropdownItem" onClick={this.handleLogout}><InputIcon /><I18n t="logout" /></NavLink>
                                    </div>
                                }
                            </div>
                        </div>

                    </Toolbar>
                </AppBar>
                <MySnackbar open={this.snackbar} close={this.handleSnack} variant="success" message={<I18n t="SnackSuccessLogout" />} />
            </div>
        );
    }
}

export default withRouter(Header);