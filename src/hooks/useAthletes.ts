// src/hooks/useAthletes.ts
import { useState, useEffect } from 'react';
import { fetchAthletes } from '../api/fetchAthletes';

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

  return { athletes, loading, error };
};

export default useAthletes;