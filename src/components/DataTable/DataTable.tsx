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
} from "@ionic/react";
import styled from "styled-components";
import useAthletes, { Athlete } from "../../controllers/useAthletesController";
import EditAthleteModal from "../EditAthleteModal/EditAthleteModal";

const DataTable: React.FC = () => {
	const { athletes, loading, error, addAthlete, editAthlete, removeAthlete } = useAthletes();
	const [newAthlete, setNewAthlete] = useState({ name: "", age: 0, team: "" });
	const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
	const [showModal, setShowModal] = useState(false);

	const HeaderRow = styled(IonRow)`
		background-color: #5d5d66;
		font-weight: bold;
		padding: 8px;
	`;

	const DataRow = styled(IonRow)`
		padding: 8px;
		border-bottom: 1px solid #ccc;
		cursor: pointer;
		&:hover {
			background-color: #f0f0f0;
			color: black;
		}
	`;

	if (loading) {
		return (
			<IonPage>
				<IonHeader>
					<IonToolbar>
						<IonTitle>Data Table</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonSpinner />
				</IonContent>
			</IonPage>
		);
	}

	if (error) {
		return (
			<IonPage>
				<IonHeader>
					<IonToolbar>
						<IonTitle>Data Table</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<p>Error loading data</p>
				</IonContent>
			</IonPage>
		);
	}

	const handleRowClick = (athlete: Athlete) => {
		setSelectedAthlete(athlete);
		setShowModal(true);
	};

	const handleEditAthlete = (athlete: Athlete) => {
		editAthlete(athlete);
		setShowModal(false);
	};

	const handleAddAthlete = () => {
		addAthlete(newAthlete);
		setNewAthlete({ name: "", age: 0, team: "" });
	};

	const handleDeleteAthlete = (id: number) => {
		removeAthlete(id);
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Data Table</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonGrid>
					<HeaderRow>
						<IonCol>ID</IonCol>
						<IonCol>Name</IonCol>
						<IonCol>Age</IonCol>
						<IonCol>Team</IonCol>
						<IonCol>Actions</IonCol>
					</HeaderRow>
					{athletes.map((item) => (
						<DataRow key={item.id} onClick={() => handleRowClick(item)}>
							<IonCol>{item.id}</IonCol>
							<IonCol>{item.name}</IonCol>
							<IonCol>{item.age}</IonCol>
							<IonCol>{item.team}</IonCol>
							<IonCol>
								<IonButton
									color='danger'
									onClick={(e) => {
										e.stopPropagation();
										handleDeleteAthlete(item.id);
									}}
								>
									Delete
								</IonButton>
							</IonCol>
						</DataRow>
					))}
					<IonRow>
						<IonCol>
							<IonItem>
								<IonLabel position='floating'>Name</IonLabel>
								<IonInput
									value={newAthlete.name}
									onIonChange={(e) => setNewAthlete({ ...newAthlete, name: e.detail.value! })}
								/>
							</IonItem>
						</IonCol>
						<IonCol>
							<IonItem>
								<IonLabel position='floating'>Age</IonLabel>
								<IonInput
									value={newAthlete.age}
									onIonChange={(e) => setNewAthlete({ ...newAthlete, age: Number(e.detail.value) })}
								/>
							</IonItem>
						</IonCol>
						<IonCol>
							<IonItem>
								<IonLabel position='floating'>Team</IonLabel>
								<IonInput
									value={newAthlete.team}
									onIonChange={(e) => setNewAthlete({ ...newAthlete, team: e.detail.value! })}
								/>
							</IonItem>
						</IonCol>
						<IonCol>
							<IonButton onClick={handleAddAthlete}>Add Athlete</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>
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
