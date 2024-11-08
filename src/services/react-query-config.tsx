import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";

interface ReactQueryProviderProps {
	children: ReactNode;
}

const queryClient = new QueryClient();

export const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({ children }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
