import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import companyService from '../../services/CompanyService';
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
            let computer = this.state.computer;
            computer.name = event.target.value;
            this.setState({ ...this.state, validField: { ...this.state.validField, computer : computer, computerName: true } });
        } catch (err) {
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
            let computer = this.state.computer;
            computer.introduced = new Date(event.target.value);
            this.setState({ ...this.state, validField: { ...this.state.validField, computer: computer, introduced: true } });
        } catch (err) {
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
            let computer = this.state.computer;
            computer.discontinued = new Date(event.target.value);
            this.setState({ ...this.state, validField: { ...this.state.validField, computer : computer, discontinued: true } });
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
            let company = this.state.companies.find(obj => obj.id === event.target.value);
            this.setState({ ...this.state, validField: { ...this.state.validField, company : company, defaultCompanyID:company.id, companyId: true } });
        } catch (err) {
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
            console.log(computer);
            // computerService.create(computer)
            //     .then(this.props.history.push("/"))
            //     .catch(err => console.log(err))
        }
    }

    async componentWillMount() {
        var companyList = await companyService.getAll();
        companyList.splice(0, 0, new Company({ id: 0, name: "Choose a company" }))
        this.setState({ companies: companyList })
    }

    render() {

        return (
            <div className="container">

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

                    <button id="submitBtn" className="button" onClick={this.addNewComputer}>
                        Create computer
                            </button>
            </div>
        );
    }
}

export default withRouter(AddComputer);