import Company from "./Company";


export default class Computer {

    _id;
    _name;
    _introduced;
    _discontinued;
    _company;

    static EMPTY_NAME_ERROR = "Cannot set an empty name.";
    static UNCONSISTENT_DATES_ERROR = "Cannot have introduced date after discontinued date.";

    constructor({ id, name, introduced, discontinued, companyId, companyName }) {
        this._id = id;
        this._name = name;
        this._introduced = introduced;
        this._discontinued = discontinued;
        this._company = new Company({ id : companyId, name : companyName });
    }

    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if(!value || value.trim() === ""){
            throw new Error(this.EMPTY_NAME_ERROR);
        }
        this._name = value.trim();
    }
    get introduced() {
        return this._introduced;
    }
    set introduced(value) {
        let dateDiscontinued = new Date(this.discontinued)
        let dateValue = new Date(value)
        if(this.discontinued && value && dateDiscontinued.getTime() < dateValue.getTime()){
            throw new Error(this.UNCONSISTENT_DATES_ERROR);
        }
        this._introduced = value;
    }
    get discontinued() {
        return this._discontinued;
    }
    set discontinued(value) {
        let dateIntroduced = new Date(this.introduced)
        let dateValue = new Date(value)
        if(this.introduced && value && dateIntroduced.getTime() > dateValue.getTime()){
            throw new Error(this.UNCONSISTENT_DATES_ERROR);
        }
        this._discontinued = value;
    }
    get company() {
        return this._company;
    }
    set company(value) {
        this._company = value;
    }

    toDto(){
        return { 
            id : this.id, 
            name : this.name,
            introduced : this.introduced ? this.introduced.toISOString().split("T")[0] : "",
            discontinued : this.discontinued ? this.discontinued.toISOString().split("T")[0] : "",
            companyId : this.company.id,
            companyName : this.company.name
        };
    }

}