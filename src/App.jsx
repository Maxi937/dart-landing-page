import { Route, Routes, useLocation } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import HomePage from "./pages/HomePage";

function App() {
	const location = useLocation();

	return (
		<>
			<SiteHeader />
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<HomePage />} />
			</Routes>
		</>
	);
}

export default App;
