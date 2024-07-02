import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/';
export const BatchesService = () => {

    const GetAllBatches = () => {
        return axios.get(API_URL + 'batches')
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching batches:', error);
                return [];
            });
    }
    return {
        GetAllBatches
    }
}