import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import userService from '../services/UserService';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContentText } from "@material-ui/core";

class SignUpForm extends React.Component {
    state = { }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value,
        signUpErr : "" });
    };

    validateSignUp = () => {
      if(!this.state.loginInput || !this.state.passwordInput || !this.state.confirmationInput){
        this.setState({ signUpErr : "Please complete all fields." });
        return false;
      }

      if(this.state.passwordInput.length < 6){
        this.setState({ signUpErr : "Password must be at least 6 characters." });
        return false;
      }

      if(this.state.confirmationInput !== this.state.passwordInput){
        this.setState({ signUpErr : "Password don't match" });
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
          console.log("success");
        }
      }
    }

    render() {
        return (
          <div> 
            <Dialog open={this.props.open} onClose={this.props.handleSignUp} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
              <DialogContent>
                  <DialogContentText color="error">
                  {this.state.signUpErr}
                  </DialogContentText>
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
              </DialogContent>
              <DialogActions>
                <Button onClick={this.props.handleSignUp} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.signUp} color="primary">
                  Sign up
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
    }
}

export default SignUpForm;