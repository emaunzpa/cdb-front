import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom'

import './header.css';
import UserService from '../../services/UserService';

class Header extends Component {

    state = {
        anchorEl: null,
        auth: UserService.isAuthenticated()
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
            this.props.history.push('/login');
        }
    };

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
                                <MenuItem onClick={this.handleClose}><Link to="/companies" className="menuLink">Companies</Link></MenuItem>
                                <MenuItem onClick={this.handleClose}><Link to="/computers" className="menuLink">Computers</Link></MenuItem>
                            </Menu>
                        </div> }
                        <Typography variant="h6" color="inherit" className="grow">
                            Welcome to cdb-front
                        </Typography>
                        { this.state.auth &&
                        <div>
                            <IconButton color="inherit" onClick={this.handleLogout}>
                                <AccountCircle className="account-icon"/> Log out
                            </IconButton>
                        </div> }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;