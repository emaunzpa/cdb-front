import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import userService from '../../services/UserService';
import './AdminSignUp.css';
import { Grid, Card, CardContent, CardActions } from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import I18n from '../../config/i18n';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from "@material-ui/core/Typography";
import MySnackbar from "../utils/MySnackbar";

class AdminSignUpForm extends React.Component {
    state = {snackbar: false}

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
        }).catch(err => this.changeSnackbar("fail", ""+err.message));

        if (isSuccess) {
            if (!isSuccess._success) {
                this.setState({ signUpErr: isSuccess.message });
            }
            else {
                this.changeSnackbar("success", <I18n t="successAddUser" />);
            }
        }
    }

    handleSnack = () => {
        this.setState({ snackbar: !this.state.snackbar })
    };

    changeSnackbar = (variant, message) => {
        this.setState({ snackbar : true, snackMessage : message, snackVariant : variant })
    }

    render() {
        return (
            <div>
                <MySnackbar open={() => this.state.snackbar} close={this.handleSnack} variant={this.state.snackVariant} message = {this.state.snackMessage} />
                <Grid container justify="center">
                    <Card className="card">
                        <CardContent>
                            <h2><I18n t="addAdminTitle" /></h2>
                            <TextField
                                autoFocus
                                id="loginInput"
                                label={<I18n t="name" />}
                                onChange={this.handleChange("loginInput")}
                                margin="dense"
                                fullWidth
                            />

                            <TextField
                                id="passwordInput"
                                label={<I18n t="password" />}
                                onChange={this.handleChange("passwordInput")}
                                type="password"
                                margin="dense"
                                fullWidth
                            />

                            <TextField
                                id="confirmationInput"
                                label={<I18n t="confirmPassword" />}
                                onChange={this.handleChange("confirmationInput")}
                                type="password"
                                margin="dense"
                                fullWidth
                            />
                            <Typography color="error" gutterBottom>
                                {this.state.signUpErr}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={this.signUp} color="primary">
                                <I18n t="addNewAdmin" />
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </div>
        );
    }
}

export default AdminSignUpForm;