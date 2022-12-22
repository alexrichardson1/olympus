import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from "@ethersproject/providers";
import { createTheme, ThemeProvider } from "@mui/material";
import { Web3ReactProvider } from "@web3-react/core";
import DAO from "pages/DAO";
import Defi from "pages/DeFi";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Play from "./pages/Play";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc): Web3Provider => {
  return new Web3Provider(provider);
};

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/play" element={<Play />} />
            <Route path="/market" element={<Market />} />
            <Route path="/defi" element={<Defi />} />
            <Route path="/dao" element={<DAO />} />
          </Routes>
        </Router>
      </Web3ReactProvider>
    </ThemeProvider>
  );
};

export default App;
