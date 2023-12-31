import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Tv from "./routes/Tv";
import Search from "./routes/Search";
import Header from "./components/Header";

function App() {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/movies/category/:movieId" element={<Home />} />
          <Route path="/tv/*" element={<Tv />} />
          <Route path="/tv/category/:tvShowId" element={<Tv />} />
          <Route path="/search/*" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
