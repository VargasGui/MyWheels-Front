import axios from 'axios';
import Car from '../models/Car.model';
import React from 'react';

const API_URL = 'http://localhost:8080/api/v1/';

export const MiniaturesService = () => {



  const GetAll = () => {
    return axios.get(API_URL + 'cars')
      .then(response => {
        return response
      })
      .catch(error => {
        console.error('Error fetching miniatures:', error);
        return [];
      });

  }

  const Create = (form) => {
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
      .then(
        GetAll()
      )
      .catch(error => {
        console.error('Error creating miniature:', error);
        return [];
      });
  }
  return {
    GetAll,
    Create
  }
}


