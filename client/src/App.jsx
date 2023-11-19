import { BrowserRouter, Routes, Route } from "react-router-dom";

import Page404 from "./components/Page404";
import Home from "./components/Home/Home";
import OnlineRoom from "./components/OnlineRoom/OnlineRoom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomID" element={<OnlineRoom />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

