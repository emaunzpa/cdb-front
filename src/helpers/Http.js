import env from "../config/env";

class Http {

    baseUrl;

    httpOptions = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    };

    constructor() {
        this.baseUrl = env.apiUrl;
    }

    get(uri){
        let options = Object.assign({}, this.httpOptions);
        options.method = "GET";
        options.headers.Authorization = "Bearer " + localStorage.getItem("token");

        return fetch(this.baseUrl + uri, options)
            .then(response => response.json());
    }

    post(uri, body) {
        let options = Object.assign({}, this.httpOptions);
        options.headers.Authorization = "Bearer " + localStorage.getItem("token");

        return fetch(this.baseUrl + uri,{...this.httpOptions, method : "POST", body : body })
            .then(response => response.json());
    }
       

    put(uri, body) {
        let options = Object.assign({}, this.httpOptions);
        options.headers.Authorization = "Bearer " + localStorage.getItem("token");

        return fetch(this.baseUrl + uri,{...this.httpOptions, method : "PUT", body : body })
            .then(response => response.json());   
    }

    delete(uri) {
        let options = Object.assign({}, this.httpOptions);
        options.headers.Authorization = "Bearer " + localStorage.getItem("token");

        return fetch(this.baseUrl + uri,{ ...this.httpOptions, method : "DELETE" })
            .then(response => response.json());  
    }
}

export default new Http();
