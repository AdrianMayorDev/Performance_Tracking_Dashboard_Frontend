import { IonModal, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonList } from "@ionic/react";
import { Athlete } from "../../controllers/useAthletesController";
import { useEffect, useState } from "react";
import InputField from "../InputField/InputField";

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
						<InputField
							label='Name'
							value={editedAthlete.name}
							onChange={(value) => setEditedAthlete({ ...editedAthlete, name: value as string })}
						/>
						<InputField
							label='Age'
							type='number'
							value={editedAthlete.age}
							onChange={(value) => setEditedAthlete({ ...editedAthlete, age: value as number })}
						/>
						<InputField
							label='Team'
							value={editedAthlete.team}
							onChange={(value) => setEditedAthlete({ ...editedAthlete, team: value as string })}
						/>
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
