import axios from 'axios';
import Car from '../models/Car.model';
import { useState } from 'react';

const API_URL = 'http://localhost:8080/api/v1/';

export const MiniaturesService = () => {

  const [miniaturesList, setMiniaturesList] = useState([]);

  const GetAllMiniatures = () => {
    console.log("executado o getall")
    return axios.get(API_URL + 'cars')
      .then(response => {
        // return response.data;
        setMiniaturesList(response.data);
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
        GetAllMiniatures()
        return response;
      })
  }

  const UpdateMiniatures = (form, id) => {
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

    return axios.put(API_URL + 'cars/' + id, car)
      .then((response) => {
        GetAllMiniatures()
        return response;
      })
  }

  const DeleteMiniatures = (id) => {
    return axios.delete(API_URL + 'cars/' + id)
      .then(response => {
        return response;
      })
  }


  return {
    GetAllMiniatures,
    CreateMiniatures,
    UpdateMiniatures,
    DeleteMiniatures,
    miniaturesList
  }
}




