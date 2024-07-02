import axios from 'axios';


const API_URL = 'http://localhost:8080/api/v1/';
export const CollectionsService = () => {
    const GetAllCollections = () => {
        return axios.get(API_URL + 'collections')
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching collections:', error);
                return [];
            });
    }
    return {
        GetAllCollections
    }
}