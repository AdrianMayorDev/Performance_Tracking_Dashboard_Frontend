import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton,
	IonGrid,
	IonRow,
	IonCol,
	IonItem,
	IonLabel,
	IonInput,
	IonText,
} from "@ionic/react";
import MetricsTable from "../components/MetricsTable/MetricsTable";
import { Athlete } from "../controllers/useAthletesController";
import useAthletes from "../controllers/useAthletesController";
import { useState } from "react";

const Metrics: React.FC = () => {
	const { athletes, metrics, loading, addMetric, removeMetric } = useAthletes();
	const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
	const [newMetric, setNewMetric] = useState({ athleteId: 0, metricType: "", value: 0, unit: "", timestamp: Date.now() });
	const [valueError, setValueError] = useState("");
	const [unitError, setUnitError] = useState("");

	const handleSelectAthlete = (athlete: Athlete) => {
		setSelectedAthlete(athlete);
		setNewMetric({ ...newMetric, athleteId: athlete.id });
	};

	const handleAddMetric = () => {
		if (newMetric.value <= 0) {
			setValueError("Value must be a positive number");
			return;
		}
		if (!["kg", "m/s"].includes(newMetric.unit)) {
			setUnitError("Unit must be either 'kg' or 'm/s'");
			return;
		}
		setValueError("");
		setUnitError("");
		addMetric(newMetric);
		setNewMetric({ athleteId: selectedAthlete!.id, metricType: "", value: 0, unit: "", timestamp: Date.now() });
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Metrics</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				{selectedAthlete ? (
					<div>
						<IonButton onClick={() => setSelectedAthlete(null)}>Back</IonButton>
						<h2>{selectedAthlete.name}'s Metrics</h2>
						<IonGrid>
							<IonRow>
								<IonCol>Metric Type</IonCol>
								<IonCol>Value</IonCol>
								<IonCol>Unit</IonCol>
								<IonCol>Actions</IonCol>
							</IonRow>
							{metrics
								.filter((metric) => metric.athleteId === selectedAthlete.id)
								.map((metric) => (
									<IonRow key={metric.id}>
										<IonCol>{metric.metricType}</IonCol>
										<IonCol>{metric.value}</IonCol>
										<IonCol>{metric.unit}</IonCol>
										<IonCol>
											<IonButton color='danger' onClick={() => removeMetric(metric.id)}>
												Delete
											</IonButton>
										</IonCol>
									</IonRow>
								))}
							<IonRow>
								<IonCol>
									<IonItem>
										<IonLabel position='floating'>Metric Type</IonLabel>
										<IonInput
											value={newMetric.metricType}
											onIonChange={(e) => setNewMetric({ ...newMetric, metricType: e.detail.value! })}
										/>
									</IonItem>
								</IonCol>
								<IonCol>
									<IonItem>
										<IonLabel position='floating'>Value</IonLabel>
										<IonInput
											type='number'
											value={newMetric.value}
											onIonChange={(e) => setNewMetric({ ...newMetric, value: Number(e.detail.value) })}
										/>
									</IonItem>
									{valueError && <IonText color='danger'>{valueError}</IonText>}
								</IonCol>
								<IonCol>
									<IonItem>
										<IonLabel position='floating'>Unit</IonLabel>
										<IonInput
											value={newMetric.unit}
											onIonChange={(e) => setNewMetric({ ...newMetric, unit: e.detail.value! })}
										/>
									</IonItem>
									{unitError && <IonText color='danger'>{unitError}</IonText>}
								</IonCol>
								<IonCol>
									<IonButton onClick={handleAddMetric}>Add Metric</IonButton>
								</IonCol>
							</IonRow>
						</IonGrid>
					</div>
				) : (
					<MetricsTable athletes={athletes} loading={loading} onSelectAthlete={handleSelectAthlete} />
				)}
			</IonContent>
		</IonPage>
	);
};

export default Metrics;
