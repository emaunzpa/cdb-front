import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LanguageIcon from '@material-ui/icons/Language';

const styles = {
    root: {
        width: 500,
    },
};

class Footer extends React.Component {

    render() {

        return (
            <BottomNavigation
                showLabels
            >
                <BottomNavigationAction href="/?lang=fr" label="Fr" icon={<LanguageIcon />} />
                <BottomNavigationAction href="/?lang=en" label="En" icon={<LanguageIcon />} />
            </BottomNavigation>
        );
    }
}

export default withStyles(styles)(Footer);