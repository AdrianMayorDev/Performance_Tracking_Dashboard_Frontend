import { useState } from "react";
import useAthletes, { Athlete } from "../controllers/useAthletesController";

export const useAthleteTable = () => {
  const { athletes, isLoading, error, addAthlete, editAthlete, removeAthlete } = useAthletes();
  const [newAthlete, setNewAthlete] = useState({ name: "", age: 0, team: "" });
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [ageError, setAgeError] = useState("");

  const handleAddAthlete = async () => {
    if (newAthlete.age <= 0 || isNaN(newAthlete.age)) {
      setAgeError("Age must be a positive number");
      return;
    }
    setAgeError("");
    try {
      await addAthlete(newAthlete);
      setNewAthlete({ name: "", age: 0, team: "" });
    } catch (error) {
      console.error("Error adding athlete:", error);
    }
  };

  const handleEditAthlete = async (athlete: Athlete) => {
    if (athlete.age <= 0 || isNaN(athlete.age)) {
      setAgeError("Age must be a positive number");
      return;
    }
    setAgeError("");
    try {
      await editAthlete(athlete);
      setShowModal(false);
    } catch (error) {
      console.error("Error editing athlete:", error);
    }
  };

  const handleDeleteAthlete = async (id: number) => {
    try {
      await removeAthlete(id);
    } catch (error) {
      console.error("Error deleting athlete:", error);
    }
  };

  return {
    athletes,
    isLoading,
    error,
    newAthlete,
    setNewAthlete,
    selectedAthlete,
    setSelectedAthlete,
    showModal,
    setShowModal,
    ageError,
    handleAddAthlete,
    handleEditAthlete,
    handleDeleteAthlete,
  };
};