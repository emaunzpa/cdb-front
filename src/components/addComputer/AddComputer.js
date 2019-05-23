import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import computerService from '../../services/ComputerService';
import companyService from '../../services/CompanyService';
import Grid from '@material-ui/core/Grid';
import Computer from "../../models/Computer";
import { withRouter } from 'react-router-dom';
import './AddComputer.css';
import Company from "../../models/Company";


class AddComputer extends React.Component {

    state = {
        defaultCompanyID: 0,
        companies: [],
        computer: new Computer({ name: "", introduced: "", discontinued: "", companyId: "", companyName: "" }),
        validField: { computerName: false, introduced: true, discontinued: true, companyId: true },
        company: new Company({ id: "", name: "" }),
    };

    checkValidField = () => {
        Object.keys(this.state.validField).map(function (key) {
            var field = this.state.validField[key];
            if (field === false) {
                return false;
            }
            return true;
        });
    };

    handleChangeComputerName = (event) => {
        try {
            this.state.computer.name = event.target.value;
            this.setState({ ...this.state, validField: { ...this.state.validField, computerName: true } });
        } catch (err) {
            console.log(err);
            this.setState({ ...this.state, validField: { ...this.state.validField, computerName: false } });
        }
        if (this.checkValidField) {
            document.getElementById("submitBtn").disabled = false;
        }
        else {
            document.getElementById("submitBtn").disabled = true;
        }
    };

    handleChangeIntroduced = (event) => {
        try {
            this.state.computer.introduced = new Date(event.target.value);
            this.setState({ ...this.state, validField: { ...this.state.validField, introduced: true } });
        } catch (err) {
            console.log(err);
            this.setState({ ...this.state, validField: { ...this.state.validField, introduced: false } });
        }
        if (this.checkValidField) {
            document.getElementById("submitBtn").disabled = false;
        }
        else {
            document.getElementById("submitBtn").disabled = true;
        }
    };

    handleChangeDiscontinued = (event) => {
        try {
            this.state.computer.discontinued = new Date(event.target.value);
            this.setState({ ...this.state, validField: { ...this.state.validField, discontinued: true } });
        } catch (err) {
            console.log(err);
            this.setState({ ...this.state, validField: { ...this.state.validField, discontinued: false } });
        }
        if (this.checkValidField) {
            document.getElementById("submitBtn").disabled = false;
        }
        else {
            document.getElementById("submitBtn").disabled = true;
        }
    };

    handleChangeCompany = (event) => {
        try {
            this.state.company = this.state.companies.find(obj => obj.id === event.target.value);
            this.state.defaultCompanyID = this.state.company.id;
            this.setState({ ...this.state, validField: { ...this.state.validField, companyId: true } });
        } catch (err) {
            console.log(err);
            this.setState({ ...this.state, validField: { ...this.state.validField, companyId: false } });
        }
        if (this.checkValidField) {
            document.getElementById("submitBtn").disabled = false;
        }
        else {
            document.getElementById("submitBtn").disabled = true;
        }
    };

    addNewComputer = () => {
        if (this.state.validField.computerName || this.state.validField.introduced
            || this.state.validField.discontinued || this.state.validField.companyId) {

            var computer = new Computer({
                name: this.state.computer.name,
                introduced: this.state.computer.introduced,
                discontinued: this.state.computer.discontinued,
                companyId: this.state.company.id,
                companyName: this.state.company.name
            })
            computerService.create(computer)
                .then(this.props.history.push("/"))
                .catch(err => console.log(err))
        }
    }

    async componentWillMount() {
        var companyList = await companyService.getAll();
        companyList.splice(0, 0, new Company({ id: 0, name: "Choose a company" }))
        this.setState({ companies: companyList })
    }

    render() {

        return (
            <div>
                <Grid container justify="center">
                    <Card className="card" id="card">
                        <CardContent id="cardContent">
                            <Typography className="title" color="textSecondary" gutterBottom>
                                Add a new computer
                        </Typography>
                            <TextField
                                id="computerName"
                                label="Computer name"
                                className="textField"
                                onChange={this.handleChangeComputerName}
                                margin="normal"
                            />
                            {
                                this.state.validField.computerName ?
                                    <span id="computerNameValidator" className="spanValidator valid">OK !</span> :
                                    <span id="computerNameValidator" className="spanValidator invalid">This field is required</span>
                            }
                            <TextField
                                id="introducedDate"
                                label="Introduced date"
                                type="date"
                                onChange={this.handleChangeIntroduced}
                                className="textField"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {
                                this.state.validField.introduced ?
                                    <span id="introducedDateValidator" className="spanValidator valid">OK !</span> :
                                    <span id="introducedDateValidator" className="spanValidator invalid">Invalid on unconsistend date</span>
                            }

                            <TextField
                                id="discontinuedDate"
                                label="Discontinued date"
                                type="date"
                                onChange={this.handleChangeDiscontinued}
                                className="textField"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {
                                this.state.validField.discontinued ?
                                    <span id="discontinuedDateValidator" className="spanValidator valid">OK !</span> :
                                    <span id="discontinuedDateValidator" className="spanValidator invalid">Invalid on unconsistend date</span>
                            }

                            <TextField
                                id="companyId"
                                select
                                label="Company"
                                className="textField"
                                value={this.state.defaultCompanyID}
                                onChange={this.handleChangeCompany}
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
                            {
                                this.state.validField.companyId ?
                                    <span id="companyValidator" className="spanValidator valid">OK !</span> :
                                    <span id="companyValidator" className="spanValidator invalid">This field is required</span>
                            }

                        </CardContent>
                        {
                            (this.state.validField.computerName && this.state.validField.introduced
                                && this.state.validField.discontinued && this.state.validField.companyId) ?
                                <span id="validAddMessage" className="spanValidator valid">All field are valid</span> :
                                <span id="errorAddMessage" className="spanValidator invalid">All field must be valid to add the new computer</span>
                        }
                        <CardActions>
                            <button id="submitBtn" className="button" onClick={this.addNewComputer}>
                                Create computer
                            </button>
                        </CardActions>
                    </Card>
                </Grid>
            </div>
        );
    }
}

export default withRouter(AddComputer);