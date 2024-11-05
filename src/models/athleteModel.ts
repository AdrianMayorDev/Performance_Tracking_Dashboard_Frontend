// src/models/athleteModel.ts
import dummyData from '../../dummy-data.json';
import { Athlete, Metric } from '../controllers/useAthletesController';

let athletes = dummyData.athletes as Athlete[];
let metrics = dummyData.metrics as Metric[];

export const fetchAthletes = async (): Promise<Athlete[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(athletes);
    }, 1000); 
  });
};

export const fetchMetrics = async (): Promise<Metric[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(metrics);
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

export const createMetric = async (metric: Metric): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      metrics.push(metric);
      resolve();
    }, 500);
  });
};

export const deleteMetric = async (id: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      metrics = metrics.filter(metric => metric.id !== id);
      resolve();
    }, 500);
  });
};