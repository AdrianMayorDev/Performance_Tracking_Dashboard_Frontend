// src/controllers/useMetrics.ts
import { useState, useEffect } from 'react';
import { fetchMetrics, createMetric, deleteMetric } from '../models/metricModel';

export interface Metric {
  id: number;
  athleteId: number;
  metricType: string;
  value: number;
  unit: string;
  timestamp: number;
}

const useMetrics = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const metricsData: Metric[] = await fetchMetrics();
        setMetrics(metricsData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const addMetric = async (metric: Omit<Metric, 'id'>) => {
    setLoading(true);
    try {
      const newId = metrics.length > 0 ? Math.max(...metrics.map(m => m.id)) + 1 : 1;
      await createMetric({ ...metric, id: newId });
      setMetrics(await fetchMetrics());
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const removeMetric = async (id: number) => {
    setLoading(true);
    try {
      await deleteMetric(id);
      setMetrics(await fetchMetrics());
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { metrics, loading, error, addMetric, removeMetric };
};

export default useMetrics;