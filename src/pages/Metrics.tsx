// src/pages/Tab2.tsx
import React, { useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from "@ionic/react";
import MetricsTable from "../components/MetricsTable/MetricsTable";
import { Athlete } from "../controllers/useAthletesController";
import useAthletes from "../controllers/useAthletesController";

const Metrics: React.FC = () => {
	const { athletes, metrics } = useAthletes();
	const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);

	const handleSelectAthlete = (athlete: Athlete) => {
		setSelectedAthlete(athlete);
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
						<ul>
							{metrics
								.filter((metric) => metric.athleteId === selectedAthlete.id)
								.map((metric) => (
									<li key={metric.id}>
										{metric.metricType}: {metric.value} {metric.unit}
									</li>
								))}
						</ul>
					</div>
				) : (
					<MetricsTable athletes={athletes} metrics={metrics} onSelectAthlete={handleSelectAthlete} />
				)}
			</IonContent>
		</IonPage>
	);
};

export default Metrics;
