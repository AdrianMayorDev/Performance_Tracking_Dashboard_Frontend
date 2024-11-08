import React, { useState } from "react";
import {
	IonGrid,
	IonRow,
	IonCol,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonSpinner,
	IonButton,
	IonInput,
	IonItem,
	IonLabel,
	IonText,
} from "@ionic/react";
import styled from "styled-components";
import useAthletes, { Athlete } from "../../controllers/useAthletesController";
import EditAthleteModal from "../EditAthleteModal/EditAthleteModal";

const DataTable: React.FC = () => {
	const { athletes, isLoading, error, addAthlete, editAthlete, removeAthlete } = useAthletes();
	const [newAthlete, setNewAthlete] = useState({ name: "", age: 0, team: "" });
	const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [ageError, setAgeError] = useState("");

	const handleAddAthlete = async () => {
		try {
			await addAthlete(newAthlete);
			setNewAthlete({ name: "", age: 0, team: "" });
		} catch (error) {
			console.error("Error adding athlete:", error);
		}
	};

	const handleEditAthlete = async (athlete: Athlete) => {
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

	if (isLoading) return <IonSpinner />;
	if (error) return <IonText color='danger'>Error: {(error as Error).message}</IonText>;

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Athletes</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonGrid>
					<IonRow>
						<IonCol>Name</IonCol>
						<IonCol>Age</IonCol>
						<IonCol>Team</IonCol>
						<IonCol>Actions</IonCol>
					</IonRow>
					{athletes?.map((athlete) => (
						<IonRow key={athlete.id}>
							<IonCol>{athlete.name}</IonCol>
							<IonCol>{athlete.age}</IonCol>
							<IonCol>{athlete.team}</IonCol>
							<IonCol>
								<IonButton
									color='danger'
									onClick={(e) => {
										e.stopPropagation();
										handleDeleteAthlete(athlete.id);
									}}
								>
									Delete
								</IonButton>
								<IonButton
									onClick={() => {
										setSelectedAthlete(athlete);
										setShowModal(true);
									}}
								>
									Edit
								</IonButton>
							</IonCol>
						</IonRow>
					))}
				</IonGrid>
				<IonItem>
					<IonLabel position='floating'>Name</IonLabel>
					<IonInput value={newAthlete.name} onIonChange={(e) => setNewAthlete({ ...newAthlete, name: e.detail.value! })} />
				</IonItem>
				<IonItem>
					<IonLabel position='floating'>Age</IonLabel>
					<IonInput
						type='number'
						value={newAthlete.age}
						onIonChange={(e) => setNewAthlete({ ...newAthlete, age: parseInt(e.detail.value!, 10) })}
					/>
				</IonItem>
				<IonItem>
					<IonLabel position='floating'>Team</IonLabel>
					<IonInput value={newAthlete.team} onIonChange={(e) => setNewAthlete({ ...newAthlete, team: e.detail.value! })} />
				</IonItem>
				<IonButton onClick={handleAddAthlete}>Add Athlete</IonButton>
				<EditAthleteModal
					isOpen={showModal}
					athlete={selectedAthlete}
					onClose={() => setShowModal(false)}
					onSave={handleEditAthlete}
				/>
			</IonContent>
		</IonPage>
	);
};

export default DataTable;
