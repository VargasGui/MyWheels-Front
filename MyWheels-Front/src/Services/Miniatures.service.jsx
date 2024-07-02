import axios from 'axios';
import Car from '../models/Car.model';

const API_URL = 'http://localhost:8080/api/v1/';

export const MiniaturesService = () => {



  const GetAllMiniatures = () => {
    return axios.get(API_URL + 'cars')
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching miniatures:', error);
        return [];
      });

  }

  const CreateMiniatures = (form) => {
    const car = new Car(
      form.ImageUrl,
      form.Name,
      form.CollectionId,
      form.BatchId,
      form.Description,
      form.AcquisitionDate,
      form.IsThunt,
      form.IsSuperThunt
    );
    
    return axios.post(API_URL + 'cars', car)
      .then((response) => {
        return response;
      })
  }
  return {
    GetAllMiniatures,
    CreateMiniatures
  }
}


