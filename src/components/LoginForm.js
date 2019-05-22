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
import computerService from '../services/ComputerService';
import Footer from './footer/Footer';
import Grid from '@material-ui/core/Grid';



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

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    async validateLoginForm() {
        let isSuccess = await userService.login({ login: this.state.loginInput, password: this.state.passwordInput })
            .catch(err => console.log(err));
        if (isSuccess) {
            let computers = await computerService.list({ page: "1", itemPerPage: "10", search: "Apple" })
                .catch(err => console.log(err));
            console.log(computers);
        }
    }

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

export default withStyles(styles)(LoginForm);