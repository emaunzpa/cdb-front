import http from "../helpers/Http";
import Computer from "../models/Computer";
import Feedback from "../models/Feedback";

class ComputerService {

    /**
     * List computers according to the page, itemPerPage, search and orderBy parameters.
     * @param {*} options 
     */
    async list(options) {
        const computers = await http.get(`/computers?page=${options.page || ""}&itemPerPage=${options.itemPerPage || ""}&search=${options.search || ""}&orderby=${options.orderBy || ""}`)
            .catch(err => Promise.reject(err));
        return computers.map(computer => new Computer(computer));
    }

    /**
     * Fetch a specific computer according to its id.
     * @param {*} id 
     */
    async get(id) {
        const computer = await(`/computers/${id}`)
            .catch(err => Promise.reject(err));
        return new Computer(computer);
    }

    /**
     * Create a new computer.
     * @param {*} computer 
     */
    async create(computer) {
        const feedback = await http.post(`/computers`, computer.toDto())
            .catch(err => Promise.reject(err));
        return new Feedback(feedback);
    }

    /**
     * Edit a computer.
     * @param {*} computer 
     */
    async edit(computer) {
        const feedback = await http.patch(`/computers`, computer.toDto())
            .catch(err => Promise.reject(err));
        return new Feedback(feedback);
    }

    /**
     * Delete a computer according to its id.
     * @param {*} id 
     */
    async delete(id) {
        const feedback = await http.delete(`/computers/${id}`)
            .catch(err => Promise.reject(err));
        return new Feedback(feedback);
    }
}

export default new ComputerService();