import axios from 'axios';

export default class FYSApiClient {

    /**
     * Returns token of active user
     * @returns {*|string}
     */
    static getUserToken = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            return user.api_token;
        }
    };

    /**
     * API Client with default parameters
     * @type {AxiosInstance}
     */
    static client = axios.create({
        baseURL: process.env.REACT_APP_DEV_API_URL,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.getUserToken(),
        },
        validateStatus: function (status) {
            return status < 500; // Reject only if the status code is greater than or equal to 500
        }
    });

    /**
     * Login
     * @param user
     * @param password
     * @returns {AxiosPromise<any>}
     */
    static login = (email, password) => {
        return this.client.post(`login`, {
            email,
            password
        });
    };

    /**
     * GetServices
     * @returns {AxiosPromise<any>}
     */
    static getServices = () => {
        return this.client.get(`services`);
    };

    /**
     *
     * @param data
     * @returns {AxiosPromise<any>}
     */
    static addService = (data) => {
        return this.client.post(`services`, data);
    };

    /**
     * GetService
     * @returns {AxiosPromise<any>}
     */
    static getService = (id) => {
        return this.client.get(`services/${id}`);
    };

    /**
     *
     * @param data
     * @returns {AxiosPromise<any>}
     */
    static updateService = (id, data) => {
        return this.client.put(`services/${id}`, data);
    };

}
