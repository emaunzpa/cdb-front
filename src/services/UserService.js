import http from "../helpers/Http";
import Feedback from "../models/Feedback";

class UserService {

    /**
     * Request for login.
     * @param {*} auth 
     */
    async login(auth) {
        const response = await http.post(`/authenticate`, JSON.stringify(auth))
            .catch(err => Promise.reject(err));
        localStorage.setItem("token", response.token);

        localStorage.setItem("role", response.role);
        return true;
    }

    /**
     * Create a user.
     * @param {*} user 
     */
    async create(user) {
        const feedback = await http.post(`/users`, JSON.stringify(user))
            .catch(err => Promise.reject(err));
        return new Feedback(feedback);
    }

    /**
     * Logout.
     */
    logout() {
        localStorage.setItem("token", "");
        return true;
    }

    isAdmin(){
        return localStorage.getItem("role") === "ROLE_MANAGER";
    }

    /**
     * Return true if the user has a token. 
     */
    isAuthenticated(){
        return localStorage.getItem("token") !== ""; 
    }
}

export default new UserService();