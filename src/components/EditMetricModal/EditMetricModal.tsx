// src/components/EditMetricModal/EditMetricModal.tsx
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonItem, IonLabel, IonInput, IonList } from "@ionic/react";
import { Metric } from "../../controllers/useAthletesController";
import { useEffect, useState } from "react";

interface EditMetricModalProps {
	isOpen: boolean;
	metric: Metric | null;
	onClose: () => void;
	onSave: (metric: Metric) => void;
}

const EditMetricModal: React.FC<EditMetricModalProps> = ({ isOpen, metric, onClose, onSave }) => {
	const [editedMetric, setEditedMetric] = useState<Metric | null>(metric);

	useEffect(() => {
		setEditedMetric(metric);
	}, [metric]);

	const handleSave = () => {
		if (editedMetric) {
			onSave(editedMetric);
		}
	};

	return (
		<IonModal isOpen={isOpen} onDidDismiss={onClose}>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Edit Metric</IonTitle>
					<IonButton slot='end' onClick={onClose}>
						Close
					</IonButton>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{editedMetric && (
					<IonList>
						<IonItem>
							<IonLabel position='floating'>Metric Type</IonLabel>
							<IonInput
								value={editedMetric.metricType}
								onIonChange={(e) =>
									setEditedMetric({
										...editedMetric,
										metricType: e.detail.value!,
									})
								}
							/>
						</IonItem>
						<IonItem>
							<IonLabel position='floating'>Value</IonLabel>
							<IonInput
								value={editedMetric.value}
								onIonChange={(e) =>
									setEditedMetric({
										...editedMetric,
										value: Number(e.detail.value),
									})
								}
							/>
						</IonItem>
						<IonItem>
							<IonLabel position='floating'>Unit</IonLabel>
							<IonInput
								value={editedMetric.unit}
								onIonChange={(e) =>
									setEditedMetric({
										...editedMetric,
										unit: e.detail.value!,
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

export default EditMetricModal;
