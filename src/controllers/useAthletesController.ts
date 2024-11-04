// src/controllers/useAthletesController.ts
import { useState, useEffect } from 'react';
import { fetchAthletes, createAthlete, updateAthlete, deleteAthlete } from '../models/athleteModel';

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

  useEffect(() => {
    const getAthletes = async () => {
      try {
        const data: Athlete[] = await fetchAthletes();
        setAthletes(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getAthletes();
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

  return { athletes, loading, error, addAthlete, editAthlete, removeAthlete };
};

export default useAthletes;