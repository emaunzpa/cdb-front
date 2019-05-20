
    const local = {
        apiUrl : "http://10.0.1.154:8080/api",
    };

    const prod = {
        apiUrl : ""
    };

    export default (process.env.NODE_ENV === "production" ? prod : local);