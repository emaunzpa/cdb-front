import http from "../helpers/Http";

class ComputerService {

    list(options) {
        return http.get(`/computers?page=${options.page}&itemPerPage=${options.itemPerPage}&search=${options.search}&orderby=${options.orderBy}`)
    }

    create(computer) {
        return http.post(`/computers`, computer);
    }

    edit(computer) {
        return http.patch(`/computers`, computer);
    }
}



export default new ComputerService();