import { IonModal, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonItem, IonLabel, IonInput, IonList } from "@ionic/react";
import { Athlete } from "../../controllers/useAthletesController";
import { useEffect, useState } from "react";

interface EditAthleteModalProps {
	isOpen: boolean;
	athlete: Athlete | null;
	onClose: () => void;
	onSave: (athlete: Athlete) => void;
}

const EditAthleteModal: React.FC<EditAthleteModalProps> = ({ isOpen, athlete, onClose, onSave }) => {
	const [editedAthlete, setEditedAthlete] = useState<Athlete | null>(athlete);

	useEffect(() => {
		setEditedAthlete(athlete);
	}, [athlete]);

	const handleSave = () => {
		if (editedAthlete) {
			onSave(editedAthlete);
		}
	};

	return (
		<IonModal isOpen={isOpen} onDidDismiss={onClose}>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Edit Athlete</IonTitle>
					<IonButton slot='end' onClick={onClose}>
						Close
					</IonButton>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{editedAthlete && (
					<IonList>
						<IonItem>
							<IonLabel position='floating'>ID</IonLabel>
							<IonInput value={editedAthlete.id} readonly />
						</IonItem>
						<IonItem>
							<IonLabel position='floating'>Name</IonLabel>
							<IonInput
								value={editedAthlete.name}
								onIonChange={(e) =>
									setEditedAthlete({
										...editedAthlete,
										name: e.detail.value!,
									})
								}
							/>
						</IonItem>
						<IonItem>
							<IonLabel position='floating'>Age</IonLabel>
							<IonInput
								value={editedAthlete.age}
								onIonChange={(e) =>
									setEditedAthlete({
										...editedAthlete,
										age: Number(e.detail.value),
									})
								}
							/>
						</IonItem>
						<IonItem>
							<IonLabel position='floating'>Team</IonLabel>
							<IonInput
								value={editedAthlete.team}
								onIonChange={(e) =>
									setEditedAthlete({
										...editedAthlete,
										team: e.detail.value!,
									})
								}
							/>
						</IonItem>
						<IonButton expand='block' onClick={handleSave}>
							Save
						</IonButton>
					</IonList>
				)}
			</IonContent>
		</IonModal>
	);
};

export default EditAthleteModal;
