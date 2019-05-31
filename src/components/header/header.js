import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import LanguageIcon from '@material-ui/icons/Language';
import InputIcon from '@material-ui/icons/Input';
import I18n from '../../config/i18n';
import { withRouter, NavLink } from 'react-router-dom';
import './header.css';
import UserService from '../../services/UserService';
import MySnackbar from "../utils/MySnackbar";



class Header extends Component {

    state = {
        anchorSettings: null,
        anchorMenu: null,
        auth: UserService.isAuthenticated(),
        menuDisplayed: false,
        snackbar: false,
        settingsDisplayed:false
    };

    handleLogout = () => {
        UserService.logout();
        if (!UserService.isAuthenticated()) {
            this.setState({ ...this.state, auth: false })
            this.props.history.push("/login");
            this.handleSnack();
        }
    };


    handleUrl = (lang) => {
        var urlTab = window.location.pathname.split("/");
        if (urlTab[1] === 'fr' || urlTab[1] === 'en') {
            urlTab.splice(1, 1);
        }
        urlTab = urlTab.join('/');
        urlTab = "/" + lang + urlTab;
        return urlTab;
    }

    handleMenu = (event) => {
        this.setState({
            menuDisplayed:!this.state.menuDisplayed,
            anchorMenu: event.currentTarget
        })
    }

    closeMenu = ()=> {
        this.setState({
            menuDisplayed:false
        })
    }



    handleSettings = (event) => {
        this.setState({
            settingsDisplayed:!this.state.settingsDisplayed,
            anchorSettings: event.currentTarget 
        })
    }

    closeSettings = ()=> {
        this.setState({
            settingsDisplayed:false
        })
    }

    changeLang = () => {
        localStorage.setItem("language", localStorage.getItem("language") === "fr" ? "en" : "fr");
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
                                    anchorEl={this.state.anchorMenu}
                                    anchorOrigin={{
                                        vertical: 'bot',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'bot',
                                        horizontal: 'right',
                                    }}
                                    open={this.state.menuDisplayed}
                                    onClose={this.closeMenu}
                                    PaperProps={{ style: { background: '#3f51b5' } }}
                                >
                                    <NavLink onClick={this.closeMenu} to={"/" + localStorage.getItem("language") + "/companies"} className="dropdownItem" activeClassName="dropdownItemSelected"><I18n t="companies" /></NavLink>
                                    <NavLink onClick={this.closeMenu} to={"/" + localStorage.getItem("language") + "/computers"} className="dropdownItem" activeClassName="dropdownItemSelected"><I18n t="computers" /></NavLink>
                                    {
                                        UserService.isAdmin() &&
                                        <NavLink onClick={this.closeMenu} to={"/" + localStorage.getItem("language") + "/users"} className="dropdownItem" activeClassName="dropdownItemSelected"><I18n t="admin" /></NavLink>
                                    }


                                </Menu>
                            </div>}
                        <Typography variant="h6" color="inherit" className="grow" >
                            <NavLink to="#" onClick={this.refresh} className="welcome"><I18n t="welcome" /></NavLink>
                        </Typography>

                            <IconButton color="inherit" 
                                    onClick={this.handleSettings}
                                    aria-owns={open ? 'settings-appbar' : undefined}
                                    aria-haspopup="true">
                                <AccountCircle className="account-icon" /><I18n t="settings" />
                            </IconButton>
                            <Menu
                              id="settings-appbar"
                              anchorEl={this.state.anchorSettings}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                              }}
                                open={this.state.settingsDisplayed}
                                onClose={this.closeSettings}
                                PaperProps={{ style: { background: '#3f51b5' } }}
                            >
                                <NavLink  to={this.handleUrl('en')} className="dropdownItem" activeClassName="dropdownItemSelected" onClick={(lang) => {this.handleUrl(lang);this.closeSettings()}}><LanguageIcon /><I18n t="english" /></NavLink>
                                <NavLink  to={this.handleUrl('fr')} className="dropdownItem" activeClassName="dropdownItemSelected" onClick={(lang) => {this.changeLang(lang);this.closeSettings()}}><LanguageIcon /><I18n t="french" /></NavLink>
                                {this.state.auth &&
                                    <div>
                                        <NavLink  to="#" className="dropdownItem" onClick={() => {this.handleLogout();this.closeSettings()}}><InputIcon /><I18n t="logout" /></NavLink>
                                    </div>
                                }
                            </Menu>

                    </Toolbar>
                </AppBar>
                <MySnackbar open={this.snackbar} close={this.handleSnack} variant="success" message={<I18n t="SnackSuccessLogout" />} />
            </div>
        );
    }
}

export default withRouter(Header);