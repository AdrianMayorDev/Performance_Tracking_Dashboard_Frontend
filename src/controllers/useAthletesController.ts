// src/controllers/useAthletesController.ts
import { useState, useEffect } from 'react';
import { fetchAthletes, fetchMetrics, createAthlete, updateAthlete, deleteAthlete, createMetric, deleteMetric } from '../models/athleteModel';

export interface Athlete {
  id: number;
  name: string;
  age: number;
  team: string;
}

export interface Metric {
  id: number;
  athleteId: number;
  metricType: string;
  value: number;
  unit: string;
  timestamp: number;
}

const useAthletes = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const athletesData: Athlete[] = await fetchAthletes();
        const metricsData: Metric[] = await fetchMetrics();
        setAthletes(athletesData);
        setMetrics(metricsData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const addAthlete = async (athlete: Omit<Athlete, 'id'>) => {
    setLoading(true);
    try {
      const newId = athletes.length > 0 ? Math.max(...athletes.map(a => a.id)) + 1 : 1;
      await createAthlete({ ...athlete, id: newId });
      setAthletes(await fetchAthletes());
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const editAthlete = async (athlete: Athlete) => {
    setLoading(true);
    try {
      await updateAthlete(athlete);
      setAthletes(await fetchAthletes());
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const removeAthlete = async (id: number) => {
    setLoading(true);
    try {
      await deleteAthlete(id);
      setAthletes(await fetchAthletes());
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

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

  return { athletes, metrics, loading, error, addAthlete, editAthlete, removeAthlete, addMetric, removeMetric };
};

export default useAthletes;