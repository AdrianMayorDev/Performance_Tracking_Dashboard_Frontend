import React from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";

interface InputFieldProps {
	label: string;
	type?: "text" | "number" | "password" | "email";
	value: string | number;
	onChange: (value: string | number) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = "text", value, onChange }) => {
	return (
		<IonItem>
			<IonLabel position='floating'>{label}</IonLabel>
			<IonInput
				type={type}
				value={value}
				onIonChange={(e) => onChange(type === "number" ? parseInt(e.detail.value!, 10) : e.detail.value!)}
			/>
		</IonItem>
	);
};

export default InputField;
