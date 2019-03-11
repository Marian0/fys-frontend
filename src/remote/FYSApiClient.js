import axios from 'axios';

export default class FYSApiClient {

    /**
     * API Client with default parameters
     * @type {AxiosInstance}
     */
    static client = axios.create({
        baseURL: process.env.REACT_APP_DEV_API_URL,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
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

}
