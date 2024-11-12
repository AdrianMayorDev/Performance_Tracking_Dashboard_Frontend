import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchAthletes, createAthlete, updateAthlete, deleteAthlete } from '../models/athleteModel';

export interface Athlete {
  id: number;
  name: string;
  age: number;
  team: string;
}

const useAthletes = () => {
  const queryClient = useQueryClient();

  const { data: athletes, isLoading, error } = useQuery<Athlete[]>('athletes', fetchAthletes, {
    onError: async (error) => {
      console.error("Error fetching athletes:", error);
    }
  });

  const createMutation = useMutation(async (athlete: Omit<Athlete, 'id'>) => {
    const newAthlete = await createAthlete(athlete);
    return newAthlete;
  }, {
    onSuccess: async (newAthlete) => {
      await queryClient.setQueryData<Athlete[]>('athletes', (old) => [...(old || []), newAthlete]);
    },
    onError: async (error) => {
      console.error("Error creating athlete:", error);
    }
  });

  const updateMutation = useMutation(async (athlete: Athlete) => {
    const updatedAthlete = await updateAthlete(athlete);
    return updatedAthlete;
  }, {
    onSuccess: async (updatedAthlete) => {
      await queryClient.setQueryData<Athlete[]>('athletes', (old) =>
        old?.map((ath) => ath.id === updatedAthlete.id ? updatedAthlete : ath) || []
      );
    },
    onError: async (error) => {
      console.error("Error updating athlete:", error);
    }
  });

  const deleteMutation = useMutation(async (id: number) => {
    await deleteAthlete(id);
  }, {
    onSuccess: async (_, id) => {
      await queryClient.setQueryData<Athlete[]>('athletes', (old) =>
        old?.filter((athlete) => athlete.id !== id) || []
      );
    },
    onError: async (error) => {
      console.error("Error deleting athlete:", error);
    }
  });

  const addAthlete = async (athlete: Omit<Athlete, 'id'>) => {
    try {
      await createMutation.mutateAsync(athlete);
    } catch (error) {
      console.error("Error adding athlete:", error);
    }
  };

  const editAthlete = async (athlete: Athlete) => {
    try {
      await updateMutation.mutateAsync(athlete);
    } catch (error) {
      console.error("Error editing athlete:", error);
    }
  };

  const removeAthlete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error removing athlete:", error);
    }
  };

  return { athletes, isLoading, error, addAthlete, editAthlete, removeAthlete };
};

export default useAthletes;