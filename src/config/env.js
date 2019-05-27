
    const local = {
        apiUrl : "http://10.0.1.154:8080/api",
    };

    const prod = {
        apiUrl : "http://ec2-34-201-46-138.compute-1.amazonaws.com/api"
    };

    console.log(process.env.NODE_ENV);

    export default (process.env.NODE_ENV === "production" ? prod : local);