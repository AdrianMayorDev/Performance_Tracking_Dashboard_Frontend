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

  const { data: athletes, isLoading, error } = useQuery<Athlete[]>('athletes', fetchAthletes);

  const createMutation = useMutation(createAthlete, {
    onSuccess: (newAthlete) => {
      queryClient.setQueryData<Athlete[]>('athletes', (old) => [...(old || []), newAthlete]);
    },
  });

  const updateMutation = useMutation(updateAthlete, {
    onSuccess: (updatedAthlete) => {
      queryClient.setQueryData<Athlete[]>('athletes', (old) =>
        old?.map((athlete) => (athlete.id === updatedAthlete.id ? updatedAthlete : athlete)) || []
      );
    },
  });

  const deleteMutation = useMutation(deleteAthlete, {
    onSuccess: (_, id) => {
      queryClient.setQueryData<Athlete[]>('athletes', (old) =>
        old?.filter((athlete) => athlete.id !== id) || []
      );
    },
  });

  const addAthlete = async (athlete: Omit<Athlete, 'id'>) => {
    await createMutation.mutateAsync(athlete);
  };

  const editAthlete = async (athlete: Athlete) => {
    await updateMutation.mutateAsync(athlete);
  };

  const removeAthlete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  return { athletes, isLoading, error, addAthlete, editAthlete, removeAthlete };
};

export default useAthletes;