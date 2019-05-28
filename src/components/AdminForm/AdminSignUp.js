import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import userService from '../../services/UserService';
import './AdminSignUp.css';
import { Grid, Card, CardContent, CardActions} from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import I18n from '../../config/i18n';
import Snackbar from '@material-ui/core/Snackbar';

class AdminSignUpForm extends React.Component {
    state = {}

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
            signUpErr: ""
        });
    };

    validateSignUp = () => {
        if (!this.state.loginInput || !this.state.passwordInput || !this.state.confirmationInput) {
            this.setState({ signUpErr: <I18n t="completeAllFields" /> });
            return false;
        }

        if (this.state.passwordInput.length < 6) {
            this.setState({ signUpErr: <I18n t="passwordTooShort" /> });
            return false;
        }

        if (this.state.confirmationInput !== this.state.passwordInput) {
            this.setState({ signUpErr: <I18n t="passDontMatch" /> });
            return false;
        }

        return true;
    }

    signUp = async () => {
        if (!this.validateSignUp()) return;

        let isSuccess = await userService.createAdmin({
            login: this.state.loginInput,
            password: this.state.passwordInput, 
            confirmation: this.state.confirmationInput
        })
            .catch(err => console.log(err));

        if (isSuccess) {
            if (!isSuccess._success) {
                this.setState({ signUpErr: isSuccess.message });
                console.log("fail");
            }
            else {
                this.props.handleSignUp();
                this.setState({ snackbar: true });
            }
        }
    }

    handleSnack = () => {
        this.setState({ ...this.state, snackbar: !this.state.snackbar })
    };

    render() {
        return (
            <div>
                <Snackbar
                    bodyStyle={{ backgroundColor: 'green', color: 'coral' }}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    key={`${'bottom'},${'center'}`}
                    open={this.state.snackbar}
                    onClose={this.handleSnack}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    autoHideDuration={2000}
                >

                    <SnackbarContent
                        className="snackbar-success"
                        aria-describedby="client-snackbar"
                        message={
                            <span id="client-snackbar" className="snackbarMessage">
                                <CheckCircleIcon className="snackbarIcon" />
                                <I18n t="successAddUser" />
                            </span>
                        }
                        action={[
                            <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleSnack}>
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </Snackbar>
                <Grid container justify="center">
                    <Card className="card">
                        <CardContent>
                            <TextField
                                autoFocus
                                id="loginInput"
                                label="Name"
                                onChange={this.handleChange("loginInput")}
                                margin="dense"
                                fullWidth
                            />

                            <TextField
                                id="passwordInput"
                                label="Password"
                                onChange={this.handleChange("passwordInput")}
                                type="password"
                                margin="dense"
                                fullWidth
                            />

                            <TextField
                                id="confirmationInput"
                                label="Confirmation"
                                onChange={this.handleChange("confirmationInput")}
                                type="password"
                                margin="dense"
                                fullWidth
                            />
                        </CardContent>
                        <CardActions>
                            <Button onClick={this.signUp} color="primary">
                                <I18n t="signup" />
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </div>
                );
            }
        }
        
export default AdminSignUpForm;