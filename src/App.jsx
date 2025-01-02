import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";

import { CertificatePage } from "./Certificate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Hello World</h1>}></Route>
        <Route path="/certificate/:hash" element={<CertificatePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
