import dummyData from '../../dummy-data.json';
import { Athlete } from '../hooks/useAthletes';

export const fetchAthletes = async (): Promise<Athlete[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyData.athlethes);
    }, 1000); 
  });
};