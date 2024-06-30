import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/';
export const GetAll = () => {
  return axios.get(API_URL + 'cars')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching miniatures:', error);
      return [];
    });
};
