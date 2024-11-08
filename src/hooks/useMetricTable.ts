import { useState, useEffect } from "react";
import useAthletes, { Athlete } from "../controllers/useAthletesController";
import useMetrics from "../controllers/useMetricsController";

export const useMetricsTable = () => {
  const { athletes, isLoading: athletesLoading, error: athletesError } = useAthletes();
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const { metrics, isLoading: metricsLoading, error: metricsError, addMetric, removeMetric } = useMetrics(selectedAthlete?.id || 0);
  const [newMetric, setNewMetric] = useState({ athleteId: 0, metricType: "", value: 0, unit: "", timestamp: Date.now() });
  const [valueError, setValueError] = useState("");
  const [unitError, setUnitError] = useState("");

  const handleSelectAthlete = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setNewMetric({ ...newMetric, athleteId: athlete.id });
  };

  const handleAddMetric = async () => {
    if (newMetric.value <= 0) {
      setValueError("Value must be a positive number");
      return;
    }
    if (!["kg", "m/s"].includes(newMetric.unit)) {
      setUnitError("Unit must be either 'kg' or 'm/s'");
      return;
    }
    setValueError("");
    setUnitError("");
    await addMetric(newMetric);
    setNewMetric({ athleteId: selectedAthlete!.id, metricType: "", value: 0, unit: "", timestamp: Date.now() });
  };

  return {
    athletes,
    athletesLoading,
    athletesError,
    selectedAthlete,
    setSelectedAthlete,
    metrics,
    metricsLoading,
    metricsError,
    newMetric,
    setNewMetric,
    valueError,
    unitError,
    handleSelectAthlete,
    handleAddMetric,
    removeMetric,
  };
};