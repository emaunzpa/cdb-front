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

class SignUpForm extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid container justify = "center">
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

                        <TextField
                            id="passwordConfirmInput"
                            label="passwordConfirm"
                            className={classes.textField}
                            type="password"
                            onChange={this.handleChange("passwordConfirm")}
                            margin="normal"
                        />
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={(event) => this.validateLoginForm(event)}>Login</Button>
                    </CardActions>
                </Card>
                </Grid>
            </div>
        );
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpForm);