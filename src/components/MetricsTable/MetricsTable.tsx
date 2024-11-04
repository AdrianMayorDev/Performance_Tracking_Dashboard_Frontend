// src/components/MetricsTable/MetricsTable.tsx
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
	IonInput,
	IonItem,
	IonLabel,
	IonButton,
} from "@ionic/react";
import styled from "styled-components";
import { Athlete, Metric } from "../../controllers/useAthletesController";

interface MetricsTableProps {
	athletes: Athlete[];
	metrics: Metric[];
	onSelectAthlete: (athlete: Athlete) => void;
}

const MetricsTable: React.FC<MetricsTableProps> = ({ athletes, metrics, onSelectAthlete }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredAthletes = athletes.filter((athlete) => athlete.name.toLowerCase().includes(searchTerm.toLowerCase()));

	const HeaderRow = styled(IonRow)`
		background-color: #e0e0f0;
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

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Metrics Table</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonItem>
					<IonLabel position='floating'>Search Athlete</IonLabel>
					<IonInput value={searchTerm} onIonChange={(e) => setSearchTerm(e.detail.value!)} />
				</IonItem>
				<IonGrid>
					<HeaderRow>
						<IonCol>ID</IonCol>
						<IonCol>Name</IonCol>
						<IonCol>Age</IonCol>
						<IonCol>Team</IonCol>
					</HeaderRow>
					{filteredAthletes.map((athlete) => (
						<DataRow key={athlete.id} onClick={() => onSelectAthlete(athlete)}>
							<IonCol>{athlete.id}</IonCol>
							<IonCol>{athlete.name}</IonCol>
							<IonCol>{athlete.age}</IonCol>
							<IonCol>{athlete.team}</IonCol>
						</DataRow>
					))}
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default MetricsTable;
