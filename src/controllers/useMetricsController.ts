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

  const { data: metrics, isLoading, error } = useQuery<Metric[]>(['metrics', athleteId], () => fetchMetrics(athleteId), {
    onError: (error) => {
      console.error("Error fetching metrics:", error);
    }
  });

  const createMutation = useMutation((metric: Omit<Metric, 'id'>) => createMetric(athleteId, metric), {
    onSuccess: (newMetric) => {
      queryClient.setQueryData<Metric[]>(['metrics', athleteId], (old) => [...(old || []), newMetric]);
    },
    onError: (error) => {
      console.error("Error creating metric:", error);
    }
  });

  const deleteMutation = useMutation((metricId: number) => deleteMetric(athleteId, metricId), {
    onSuccess: (_, metricId) => {
      queryClient.setQueryData<Metric[]>(['metrics', athleteId], (old) =>
        old?.filter((metric) => metric.id !== metricId) || []
      );
    },
    onError: (error) => {
      console.error("Error deleting metric:", error);
    }
  });

  const addMetric = async (metric: Omit<Metric, 'id'>) => {
    try {
      await createMutation.mutateAsync(metric);
    } catch (error) {
      console.error("Error adding metric:", error);
    }
  };

  const removeMetric = async (metricId: number) => {
    try {
      await deleteMutation.mutateAsync(metricId);
    } catch (error) {
      console.error("Error removing metric:", error);
    }
  };

  return {
    metrics,
    isLoading,
    error,
    addMetric,
    removeMetric,
  };
};

export default useMetrics;