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
	IonSpinner,
} from "@ionic/react";
import MetricsTable from "../components/MetricsTable/MetricsTable";
import { Athlete } from "../controllers/useAthletesController";
import useAthletes from "../controllers/useAthletesController";
import useMetrics from "../controllers/useMetricsController";
import { useEffect, useState } from "react";
import { useMetricsTable } from "../hooks/useMetricTable";

const Metrics: React.FC = () => {
	const {
		athletes,
		athletesLoading,
		athletesError,
		selectedAthlete,
		setSelectedAthlete,
		metrics,
		metricsLoading,
		metricsError,
		newMetric,
		setNewMetric,
		valueError,
		unitError,
		handleSelectAthlete,
		handleAddMetric,
		removeMetric,
	} = useMetricsTable();

	if (athletesLoading || metricsLoading) return <IonSpinner />;
	if (athletesError) return <IonText color='danger'>Error: {(athletesError as Error).message}</IonText>;
	if (metricsError) return <IonText color='danger'>Error: {(metricsError as Error).message}</IonText>;

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
							{metrics?.map((metric) => (
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
					<MetricsTable athletes={athletes!} loading={athletesLoading} onSelectAthlete={handleSelectAthlete} />
				)}
			</IonContent>
		</IonPage>
	);
};

export default Metrics;
