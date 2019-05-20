import http from "../helpers/Http";

class UserService {

    async login(auth) {
        const response = await http.post(`/authenticate`, JSON.stringify(auth))
            .catch(err => Promise.reject(err));
        localStorage.setItem("token", response.token);
        return Promise.resolve(true);
    }

    logout() {
        localStorage.setItem("token", undefined);
    }
}

export default new UserService();