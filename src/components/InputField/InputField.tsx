import React from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";

interface InputFieldProps {
	label: string;
	type?: "text" | "number" | "password" | "email";
	value: string | number;
	onChange: (value: string | number) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = "text", value, onChange }) => {
	const handleChange = (e: CustomEvent) => {
		const inputValue = (e.target as HTMLInputElement).value;
		if (type === "number") {
			const parsedValue = parseInt(inputValue, 10);
			onChange(isNaN(parsedValue) ? "" : parsedValue);
		} else {
			onChange(inputValue);
		}
	};
	return (
		<IonItem>
			<IonLabel position='floating'>{label}</IonLabel>
			<IonInput type={type} value={value} onIonChange={(e) => handleChange(e as CustomEvent)} />
		</IonItem>
	);
};

export default InputField;
