import axios from 'axios';
import { Metric } from '../controllers/useMetricsController';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

export const fetchMetrics = async (athleteId: number): Promise<Metric[]> => {
  const response = await axios.get(`${BASE_URL}/metrics/${athleteId}`);
  return response.data;
};

export const createMetric = async (athleteId: number, metric: Omit<Metric, 'id'>): Promise<Metric> => {
  const response = await axios.post(`${BASE_URL}/metrics/${athleteId}`, metric);
  return response.data;
};

export const deleteMetric = async (athleteId: number, metricId: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/metrics/${athleteId}/${metricId}`);
};