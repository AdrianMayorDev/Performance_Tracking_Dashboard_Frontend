import React from "react";
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
	IonText,
} from "@ionic/react";
import EditAthleteModal from "../EditAthleteModal/EditAthleteModal";
import { useAthleteTable } from "../../hooks/useAthleteTable";

import { Athlete } from "../../controllers/useAthletesController";
import AthleteTableRow from "../AthleteTableRow.tsx/AthleteTableRow";
import InputField from "../InputField/InputField";

const DataTable: React.FC = () => {
	const {
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
	} = useAthleteTable();

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
					{athletes?.map((athlete: Athlete) => (
						<AthleteTableRow
							key={athlete.id}
							athlete={athlete}
							onDelete={handleDeleteAthlete}
							onEdit={(athlete: Athlete) => {
								setSelectedAthlete(athlete);
								setShowModal(true);
							}}
						/>
					))}
				</IonGrid>
				<InputField
					label='Name'
					value={newAthlete.name}
					onChange={(value) => setNewAthlete({ ...newAthlete, name: value as string })}
				/>
				<InputField
					label='Age'
					type='number'
					value={newAthlete.age}
					onChange={(value) => setNewAthlete({ ...newAthlete, age: value as number })}
				/>
				{ageError && <IonText color='danger'>{ageError}</IonText>}
				<InputField
					label='Team'
					value={newAthlete.team}
					onChange={(value) => setNewAthlete({ ...newAthlete, team: value as string })}
				/>
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
