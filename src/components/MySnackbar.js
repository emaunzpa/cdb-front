import React, { Component } from 'react';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';

class MySnackbar extends Component {
    state = {
        open : this.props.open,
        close : this.props.close,
        duration : this.props.duration ? this.props.duration : 2000
    }

	render() {
		return (
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                key={`${'bottom'},${'right'}`}
                open={this.state.open()}
                onClose={this.state.close}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                autoHideDuration={this.state.duration}
            >
                <SnackbarContent
                    className={"snackbar-"+this.props.variant}
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar" className="snackbarMessage">
                        {this.props.variant === "success" ? <CheckCircleIcon className="snackbarIcon" /> :""}
                        {this.props.variant === "fail" ? <CancelIcon className="snackbarIcon"/> :""}
                            {this.props.message}
                        </span>
                    }
                    action={[
                        <IconButton key="close" aria-label="Close" color="inherit" onClick={this.state.close}>
                            <CloseIcon />
                        </IconButton>,
                    ]}
                /> 
            </Snackbar>
            );
        }
    }
        
export default MySnackbar;