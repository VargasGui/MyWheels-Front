import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Containers/Navbar";
import Home from "./Containers/Home";
import Miniatures from "./Containers/Miniatures";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/miniatures" element={<Miniatures />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;