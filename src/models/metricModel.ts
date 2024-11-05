// src/models/metricModel.ts
import dummyData from '../../dummy-data.json';
import { Metric } from '../controllers/useMetricsController';


let metrics = dummyData.metrics as Metric[];

export const fetchMetrics = async (): Promise<Metric[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(metrics);
    }, 1000); 
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