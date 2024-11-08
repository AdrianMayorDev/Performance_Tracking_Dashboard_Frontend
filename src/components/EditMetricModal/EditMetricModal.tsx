// src/components/EditMetricModal/EditMetricModal.tsx
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonList } from "@ionic/react";
import { useEffect, useState } from "react";
import { Metric } from "../../controllers/useMetricsController";
import InputField from "../InputField/InputField";

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
						<InputField
							label='Metric Type'
							value={editedMetric.metricType}
							onChange={(value) => setEditedMetric({ ...editedMetric, metricType: value as string })}
						/>

						<InputField
							label='Value'
							type='number'
							value={editedMetric.value}
							onChange={(value) => setEditedMetric({ ...editedMetric, value: value as number })}
						/>

						<InputField
							label='Unit'
							value={editedMetric.unit}
							onChange={(value) => setEditedMetric({ ...editedMetric, unit: value as string })}
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

export default EditMetricModal;
