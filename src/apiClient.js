import axios from 'axios';

const HOST = 'http://localhost:8000';
axios.defaults.withCredentials = true;

export default {
    init() {
        return axios.get(HOST + '/car');
    },
    reset() {
        return axios.delete(HOST + '/car');
    },
    place(position) {
        return axios.post(HOST+'/car/place', position);
    },
    left() {
        return axios.put(HOST+'/car/left');
    },
    right() {
        return axios.put(HOST+'/car/right');
    },
    move() {
        return axios.put(HOST+'/car/move');
    },
};