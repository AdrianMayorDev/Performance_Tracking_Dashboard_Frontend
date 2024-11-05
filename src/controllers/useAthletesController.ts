// src/controllers/useAthletesController.ts
import { useState, useEffect } from 'react';
import { fetchAthletes, createAthlete, updateAthlete, deleteAthlete } from '../models/athleteModel';
import useMetrics, { Metric } from './useMetricsController';

export interface Athlete {
  id: number;
  name: string;
  age: number;
  team: string;
}

const useAthletes = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { metrics, loading: metricsLoading, error: metricsError, addMetric, removeMetric } = useMetrics();

  useEffect(() => {
    const getData = async () => {
      try {
        const athletesData: Athlete[] = await fetchAthletes();
        setAthletes(athletesData);
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

  return { athletes, metrics, loading, error, addAthlete, editAthlete, removeAthlete, addMetric, removeMetric };
};

export default useAthletes;