import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LanguageIcon from '@material-ui/icons/Language';
import { withRouter } from 'react-router-dom';

import './Footer.css';

class Footer extends React.Component {

    changeLangageEn = () => {
        this.props.history.push("?lang=en");
    };

    changeLangageFr = () => {
        this.props.history.push("?lang=fr");
    };

    render() {

        return (
            <BottomNavigation
                showLabels
            >
                <BottomNavigationAction label="Fr" icon={<LanguageIcon />} onClick={this.changeLangageFr}></BottomNavigationAction>
                <BottomNavigationAction label="En" icon={<LanguageIcon />} onClick={this.changeLangageEn}></BottomNavigationAction>
            </BottomNavigation>
        );
    }
}

export default withRouter(Footer);