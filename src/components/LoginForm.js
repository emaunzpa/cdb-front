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
import I18n from '../config/i18n';

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
        passwordInput: ""
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
                .catch(err => console.log(err));
            if (isSuccess) {
                window.location.replace("/");
            } else {
                this.setState({ loginErr: <I18n t="invalidCredentials" /> });
            }
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid container justify="center">
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Login Form
                        </Typography>
                            <TextField
                                id="loginInput"
                                label="Name"
                                className={classes.textField}
                                onChange={this.handleChange("loginInput")}
                                margin="normal"
                            />

                            <TextField
                                id="passwordInput"
                                label="Password"
                                className={classes.textField}
                                type="password"
                                onChange={this.handleChange("passwordInput")}
                                margin="normal"
                            />
                            <Typography className={classes.title} color="error" gutterBottom>
                                {this.state.loginErr}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={(event) => this.validateLoginForm(event)}>Login</Button>
                            <Button variant="contained" color="primary" size="small" onClick={this.handleSignUp}>Sign Up</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <SignUpForm open={this.state.signUp} handleSignUp={this.handleSignUp}></SignUpForm>
            </div>
        );
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);