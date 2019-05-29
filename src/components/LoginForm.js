import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import userService from '../services/UserService';
import Grid from '@material-ui/core/Grid';
import SignUpForm from '../components/SignUpForm'
import I18n from "../config/i18n";
import MySnackbar from './MySnackbar'

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    card: {
        minWidth: 275,
        marginTop: '13em',
    },
});

class LoginForm extends React.Component {
    state = {
        signUp: false,
        loginInput: "",
        passwordInput: "",
        loginErr: "",
        snackbar: false
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleEnter, false);
    }

    handleEnter = (event) => {
        if (event.keyCode === 13) {
            this.validateLoginForm();
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSignUp = () => {
        this.setState({ signUp: !this.state.signUp });
    }

    async validateLoginForm() {
        if (this.state.loginInput === "" || this.state.passwordInput === "") {
            this.setState({ loginErr: <I18n t="completeAllFields" /> });
        } else {
            let isSuccess = await userService.login({ login: this.state.loginInput, password: this.state.passwordInput })
                .catch(err => this.changeSnackbar("fail", "Something wrong happened, try later"));
            if (isSuccess) {
                window.location.replace("/");
            } else {
                this.handleSnack();
                this.setState({ loginErr: <I18n t="invalidCredentials" /> });
            }
        }
    }

    handleSnack = () => {
        this.setState({ snackbar: !this.state.snackbar})
    };

    autoConnect = (login, password) => {
        this.setState({loginInput : login, passwordInput : password});
    }
    
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid container justify="center">
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                <I18n t="loginform" />
                            </Typography>
                            <TextField
                                id="loginInput"
                                label={<I18n t="name" />}
                                value={this.state.loginInput ? this.state.loginInput : ""}
                                className={classes.textField}
                                onChange={this.handleChange("loginInput")}
                                margin="normal"
                            />

                            <TextField
                                id="passwordInput"
                                label={<I18n t="password" />}
                                value={this.state.passwordInput ? this.state.passwordInput : ""}
                                className={classes.textField}
                                type="password"
                                onChange={this.handleChange("passwordInput")}
                                margin="normal"
                            />
                            <Typography color="error" gutterBottom>
                                {this.state.loginErr}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="contained" color="primary" onClick={(event) => this.validateLoginForm(event)}><I18n t="login" /></Button>
                            <Button  size="small" onClick={this.handleSignUp}><I18n t="signup" /></Button>
                        </CardActions>
                    </Card>
                </Grid>
                <SignUpForm open={this.state.signUp} handleSignUp={this.handleSignUp} autoConnect={this.autoConnect}></SignUpForm>
                <MySnackbar open={() => this.state.snackbar} close={this.handleSnack} variant="fail" message={<I18n t="SnackFailLogin" />} />
            </div>
        );
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);