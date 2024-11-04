import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import "./Athletes.css";
import DataTable from "../components/DataTable/DataTable";

const Athletes: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Athletes</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Athletes</IonTitle>
					</IonToolbar>
				</IonHeader>
				<DataTable />
			</IonContent>
		</IonPage>
	);
};

export default Athletes;
