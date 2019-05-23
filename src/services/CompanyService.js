import http from "../helpers/Http";
import Company from "../models/Company";
import Feedback from "../models/Feedback";

class CompanyService {

    /**
     * Fetch companies according to the page and itemPerPage.
     * @param {*} param0 
     */
    async list({page, itemPerPage, search}){
        const companies = await http.get(`/companies?page=${page || ""}&itemPerPage=${itemPerPage || ""}&search=${search || ""}`)
            .catch(err => Promise.reject(err));
        return companies.map(company => new Company(company));
    }

    async getAll(){
        const companies = await http.get(`/companies/all`)
            .catch(err => Promise.reject(err));
        return companies.map(company => new Company(company));
    }

    count(search) {
        return http.get(`/companies/count?search=${search || ""}`);
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
        const feedback = await http.post(`/companies`, JSON.stringify(company.toDto()))
            .catch(err => Promise.reject(err));
        return new Feedback(feedback);
    }

    /**
     * Delete a company according to its id.
     * @param {*} id 
     */
    async delete(id) {
        const feedback = await http.delete(`/companies/${id}`)
            .catch(err => Promise.reject(err));
        return new Feedback(feedback);
    }
}

export default new CompanyService();