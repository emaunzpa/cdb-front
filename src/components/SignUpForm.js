import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import userService from '../services/UserService';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContentText } from "@material-ui/core";

import I18n from '../config/i18n';
import MySnackbar from "./MySnackbar";

class SignUpForm extends React.Component {
    state = { snackbar : false }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value,
        signUpErr : "" });
    };

    validateSignUp = () => {
      if(!this.state.loginInput || !this.state.passwordInput || !this.state.confirmationInput){
        this.setState({ signUpErr : <I18n t="completeAllFields" /> });
        return false;
      }

      if(this.state.passwordInput.length < 6){
        this.setState({ signUpErr : <I18n t="passwordTooShort" /> });
        return false;
      }

      if(this.state.confirmationInput !== this.state.passwordInput){
        this.setState({ signUpErr : <I18n t="passDontMatch" /> });
        return false;
      }

      return true;
    }

    signUp = async () => {
      if(!this.validateSignUp()) return;

      let isSuccess = await userService.create({ login: this.state.loginInput, 
        password: this.state.passwordInput, confirmation: this.state.confirmationInput})
      .catch(err => console.log(err));
      
      if (isSuccess) {
        if(!isSuccess._success){
          this.setState({ signUpErr : isSuccess.message });
          console.log("fail");
        }
        else {
          this.props.handleSignUp();
          this.setState({...this.state, snackbar : true });
        }
      }
    }

    openSnack = () => {
      return this.state.snackbar;
    }

    closeSnack = () => {
      this.setState({snackbar: !this.state.snackbar});
    }

    render() {
        return (
          <div> 
            <MySnackbar open={this.openSnack} close={this.closeSnack} variant="success" message={<I18n t="successAddUser" />} />
          
            <Dialog open={this.props.open} onClose={this.props.handleSignUp} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title"><I18n t="signup" /></DialogTitle>
              <DialogContent>
                  <DialogContentText color="error">
                  {this.state.signUpErr}
                  </DialogContentText>
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
              </DialogContent>
              <DialogActions>
                <Button onClick={this.props.handleSignUp}>
                <I18n t="cancel" />
                </Button>
                <Button onClick={this.signUp} variant="contained" color="primary">
                  <I18n t="signup" />
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
    }
}

export default SignUpForm;