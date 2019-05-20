import http from "../helpers/Http";
import Company from "../models/Company";
import Feedback from "../models/Feedback";

class CompanyService {

    /**
     * Fetch companies according to the page and itemPerPage.
     * @param {*} param0 
     */
    async list({page, itemPerPage}){
        const companies = await http.get(`/companies?page${page || ""}&itemPerPage=${itemPerPage}`)
            .catch(err => Promise.reject(err));
        return companies.map(company => new Company(company));
    }

    /**
     * Fetch a specific company according to its id.
     * @param {*} id 
     */
    async get(id) {
        const company = await http.get(`/companies/${id}`)
            .catch(err => Promise.reject(err));
        return new Company(company);
    }

    /**
     * Create a new company.
     * @param {*} company 
     */
    async create(company) {
        const feedback = await http.post(`/companies`, company)
            .catch(err => Promise.reject(err));
        return new Feedback(feedback);
    }

    /**
     * Delete a company according to its id.
     * @param {*} id 
     */
    async delete(id) {
        const feedback = http.delete(`/companies/${id}`)
            .catch(err => Promise.reject(err));
        return new Feedback(feedback);
    }
}

export default new CompanyService();