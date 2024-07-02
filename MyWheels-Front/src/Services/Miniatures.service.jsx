import axios from 'axios';
import Car from '../models/Car.model';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8080/api/v1/';

export const MiniaturesService = () => {

  const [miniatures$, setMiniatures$] = useState([]);

  useEffect(() => {
    console.log(miniatures$)
  }, [miniatures$]);

  const GetAllMiniatures = () => {
    return axios.get(API_URL + 'cars')
      .then(response => {
        return setMiniatures$(response.data);
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
        setMiniatures$([...miniatures$, car]);
        return response;
      })
  }

  const DeleteMiniatures = (id) => {
    return axios.delete(API_URL + 'cars/' + id)
      .then(response => {
        setMiniatures$(miniatures$.filter(car => car.Id !== id));
        return response;
      })
  }


  return {
    GetAllMiniatures,
    CreateMiniatures,
    DeleteMiniatures,
    miniatures$,
  }
}


