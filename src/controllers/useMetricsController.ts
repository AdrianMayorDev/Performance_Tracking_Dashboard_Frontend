import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchMetrics, createMetric, deleteMetric } from '../models/metricModel';

export interface Metric {
  id: number;
  athleteId: number;
  metricType: string;
  value: number;
  unit: string;
  timestamp: number;
}

const useMetrics = (athleteId: number) => {
  const queryClient = useQueryClient();

  const { data: metrics, isLoading, error } = useQuery<Metric[]>(['metrics', athleteId], () => fetchMetrics(athleteId));

  const createMutation = useMutation((metric: Omit<Metric, 'id'>) => createMetric(athleteId, metric), {
    onSuccess: (newMetric) => {
      queryClient.setQueryData<Metric[]>(['metrics', athleteId], (old) => [...(old || []), newMetric]);
    },
  });

  const deleteMutation = useMutation((metricId: number) => deleteMetric(athleteId, metricId), {
    onSuccess: (_, metricId) => {
      queryClient.setQueryData<Metric[]>(['metrics', athleteId], (old) =>
        old?.filter((metric) => metric.id !== metricId) || []
      );
    },
  });

  const addMetric = async (metric: Omit<Metric, 'id'>) => {
    await createMutation.mutateAsync(metric);
  };

  const removeMetric = async (metricId: number) => {
    await deleteMutation.mutateAsync(metricId);
  };

  return { metrics, isLoading, error, addMetric, removeMetric };
};

export default useMetrics;