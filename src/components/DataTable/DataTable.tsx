import React from "react";
import { IonGrid, IonRow, IonCol, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import styled from "styled-components";
import dummyData from "../../../dummy-data.json"; // Adjust the path as necessary

const DataTable: React.FC = () => {
	const data = dummyData.athlethes;

	const HeaderRow = styled(IonRow)`
		background-color: #e0e0f0;
		font-weight: bold;
		padding: 8px;
	`;

	const DataRow = styled(IonRow)`
		padding: 8px;
		border-bottom: 1px solid #ccc;
	`;

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
					</HeaderRow>
					{data.map((item) => (
						<DataRow key={item.id}>
							<IonCol>{item.id}</IonCol>
							<IonCol>{item.name}</IonCol>
							<IonCol>{item.age}</IonCol>
							<IonCol>{item.team}</IonCol>
						</DataRow>
					))}
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default DataTable;
