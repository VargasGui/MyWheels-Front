import axios from 'axios';

export const fetchMiniatures = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching miniatures:', error);
      return [];
    });
};