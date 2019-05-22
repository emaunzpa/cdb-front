import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import computerService from '../../services/ComputerService';
import companyService from '../../services/CompanyService';
import Footer from '../Footer'
import Grid from '@material-ui/core/Grid';
import Computer from "../../models/Computer";
import { withRouter } from 'react-router-dom';
import './AddComputer.css'

class AddComputer extends React.Component {

    state = {
        defaultCompanyID: 0,
        companies: []
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    async addNewComputer() {
        var company = this.state.companies.find(obj => obj.id === this.state.companyId);
        var computer = new Computer({ name: this.state.computerName, introduced: this.state.introducedDate, discontinued: this.state.discontinuedDate, companyId: this.state.companyId, companyName: company.name})

        computerService.create(computer)
        .then(this.props.history.push("/"))
        .catch(err => console.log(err))
        
    }

    async componentWillMount() {
        await companyService.list(0, 0)
            .then(companies => this.setState({ companies: companies, defaultCompanyID: companies[0].id }))
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Grid container justify="center">
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Add a new computer
                        </Typography>
                            <TextField
                                id="computerName"
                                label="Computer name"
                                className={classes.textField}
                                onChange={this.handleChange("computerName")}
                                margin="normal"
                            />

                            <TextField
                                id="introducedDate"
                                label="Introduced date"
                                type="date"
                                onChange={this.handleChange("introducedDate")}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <TextField
                                id="discontinuedDate"
                                label="Discontinued date"
                                type="date"
                                onChange={this.handleChange("discontinuedDate")}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <TextField
                                id="companyId"
                                select
                                label="Company"
                                className={classes.textField}
                                value={this.state.defaultCompanyID}
                                onChange={this.handleChange("companyId")}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                helperText="Please select the company"
                                margin="normal"
                                variant="outlined"
                            >
                                {this.state.companies.map(option => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={(event) => this.addNewComputer(event)}>Login</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Footer />
            </div>
        );
    }
}

AddComputer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(AddComputer);