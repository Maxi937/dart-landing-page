import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import SiteHeader from "./components/SiteHeader";

const rootElement = createRoot(document.getElementById("root"));

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 360000,
			refetchInterval: 360000,
			refetchOnWindowFocus: false,
		},
	},
});

rootElement.render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<SiteHeader />
			<Router/>
		</BrowserRouter>
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
);
