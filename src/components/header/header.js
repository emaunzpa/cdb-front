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

class Header extends Component {

    state = {
        anchorEl: null,
        auth: UserService.isAuthenticated(),
        menuDisplayed: false
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick);
    }

    handleClick = (event) => {
        if(this.state.menuDisplayed === true & event.target.tagName !== 'A'){
            this.setState({ ...this.state, menuDisplayed: !this.state.menuDisplayed});
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
        if(!UserService.isAuthenticated()){
            this.setState({ ...this.state, auth: false})
            this.props.history.push("/login");
        }
    };

    toggleMenu = () => {
        this.setState({ ...this.state, menuDisplayed: !this.state.menuDisplayed });
        if (this.state.menuDisplayed){
            document.getElementById('dropdownMenu').setAttribute("style", "display: none;");
        }
        else {
            document.getElementById('dropdownMenu').setAttribute("style", "display: flex;");
        }
    }

    changeLang = () => {
        localStorage.setItem("language", localStorage.getItem("language") === "fr" ? "en" : "fr");
        this.toggleMenu();
    }

    render() {

        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

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
                                <MenuItem onClick={this.handleClose}><Link ignoreLocale to={"/" + localStorage.getItem("language") } className="menuLink"><I18n t="home"/></Link></MenuItem>
                                <MenuItem onClick={this.handleClose}><Link ignoreLocale to={"/" + localStorage.getItem("language") + "/companies"} className="menuLink"><I18n t="companies"/></Link></MenuItem>
                                <MenuItem onClick={this.handleClose}><Link ignoreLocale to={"/" + localStorage.getItem("language") + "/computers" } className="menuLink"><I18n t="computers"/></Link></MenuItem>
                            </Menu>
                        </div> }
                        <Typography variant="h6" color="inherit" className="grow">
                            <I18n t="welcome"/>
                        </Typography>
                        <div>
                        { this.state.auth &&
                            <IconButton color="inherit" onClick={this.toggleMenu}>
                                <AccountCircle className="account-icon"/><I18n t="settings"/>
                            </IconButton> 
                        }
                            <div id="dropdownMenu">
                                <NavLink ignoreLocale to="/en"className="dropdownItem" onClick={this.changeLang}><LanguageIcon/><I18n t="english"/></NavLink>
                                <NavLink ignoreLocale to="/fr" className="dropdownItem" onClick={this.changeLang}><LanguageIcon/><I18n t="french"/></NavLink>
                                <a className="dropdownItem" onClick={this.handleLogout}><InputIcon/><I18n t="logout"/></a>
                            </div>
                        </div>
                        
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withRouter(Header);