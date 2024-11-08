import React from "react";
import { IonRow, IonCol, IonButton } from "@ionic/react";
import { Athlete } from "../../controllers/useAthletesController";

interface AthleteTableRowProps {
	athlete: Athlete;
	onDelete: (id: number) => void;
	onEdit: (athlete: Athlete) => void;
}

const AthleteTableRow: React.FC<AthleteTableRowProps> = ({ athlete, onDelete, onEdit }) => (
	<IonRow>
		<IonCol>{athlete.name}</IonCol>
		<IonCol>{athlete.age}</IonCol>
		<IonCol>{athlete.team}</IonCol>
		<IonCol>
			<IonButton
				color='danger'
				onClick={(e) => {
					e.stopPropagation();
					onDelete(athlete.id);
				}}
			>
				Delete
			</IonButton>
			<IonButton
				onClick={() => {
					onEdit(athlete);
				}}
			>
				Edit
			</IonButton>
		</IonCol>
	</IonRow>
);

export default AthleteTableRow;
