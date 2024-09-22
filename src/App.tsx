import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TipCreator from "./pages/Tipcreator";
import { Buffer } from "buffer";

function App() {
  window.Buffer = Buffer;
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tip" element={<TipCreator />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
