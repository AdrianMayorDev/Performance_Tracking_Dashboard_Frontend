import dummyData from '../../dummy-data.json';
import { Athlete } from '../controllers/useAthletesController';

let athletes = dummyData.athlethes as Athlete[];

export const fetchAthletes = async (): Promise<Athlete[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(athletes);
    }, 1000); 
  });
};

export const createAthlete = async (athlete: Athlete): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      athletes.push(athlete);
      resolve();
    }, 500);
  });
};

export const updateAthlete = async (updatedAthlete: Athlete): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      athletes = athletes.map(athlete => 
        athlete.id === updatedAthlete.id ? updatedAthlete : athlete
      );
      resolve();
    }, 500);
  });
};

export const deleteAthlete = async (id: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      athletes = athletes.filter(athlete => athlete.id !== id);
      resolve();
    }, 500);
  });
};