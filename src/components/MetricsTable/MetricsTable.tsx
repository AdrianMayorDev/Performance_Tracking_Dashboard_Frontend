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
	IonSpinner,
} from "@ionic/react";
import styled from "styled-components";
import { Athlete } from "../../controllers/useAthletesController";

interface MetricsTableProps {
	athletes: Athlete[];
	loading: boolean;
	onSelectAthlete: (athlete: Athlete) => void;
}

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

const MetricsTable: React.FC<MetricsTableProps> = ({ athletes, loading, onSelectAthlete }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredAthletes = athletes.filter((athlete) => athlete.name.toLowerCase().includes(searchTerm.toLowerCase()));

	if (loading) {
		return (
			<IonPage>
				<IonHeader>
					<IonToolbar>
						<IonTitle>Metrics Table</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonSpinner />
				</IonContent>
			</IonPage>
		);
	}

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
