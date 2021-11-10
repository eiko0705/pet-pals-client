import { Routes, Route, HashRouter } from "react-router-dom";
import Messenger from "./pages/Messenger";
import { useEffect } from "react";
import { socket } from "./socket";
import axios from "axios";

function App() {
	useEffect(() => {
		socket.connect();
		(async () => {
			const test = await axios.get("http://localhost:4000/test");
			console.log(test);
		})();

		return () => {
			socket.disconnect();
		};
	}, []);
	return (
		<div className="App">
			<HashRouter>
				<Routes>
					<Route path="/messenger" element={<Messenger />} />
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;