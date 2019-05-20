export default class Company {
    
    _id;
    _name;

    constructor({ id, name }) {
        this._name = name;
        this._id = id;
    }

    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }


}