import axios from 'axios';
import { Athlete } from '../controllers/useAthletesController';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

export const fetchAthletes = async (): Promise<Athlete[]> => {
  const response = await axios.get(`${BASE_URL}/athletes`);
  return response.data;
};

export const createAthlete = async (athlete: Omit<Athlete, 'id'>): Promise<Athlete> => {
  const response = await axios.post(`${BASE_URL}/athletes`, athlete);
  return response.data;
};

export const updateAthlete = async (athlete: Athlete): Promise<Athlete> => {
  const response = await axios.put(`${BASE_URL}/athletes/${athlete.id}`, athlete);
  return response.data;
};

export const deleteAthlete = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/athletes/${id}`);
};