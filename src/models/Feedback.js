export default class Feedback {

    _success;
    _message;

    constructor({ status, message }) {
        this._success = status === "success";
        this._message = message;
    }

    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    get message() {
        return this._message;
    }
    set message(value) {
        this._message = value;
    }
}