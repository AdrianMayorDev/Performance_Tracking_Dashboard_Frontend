import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ReactQueryProvider } from "./services/react-query-config";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
	<React.StrictMode>
		<ReactQueryProvider>
			<App />
		</ReactQueryProvider>
	</React.StrictMode>
);
