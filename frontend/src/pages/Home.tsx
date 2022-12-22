import { Box } from "@mui/material";
import BackgroundImage from "../images/pixel_home.gif";
import "./home.css";

const Home = () => {
  return (
    <Box
      width="100%"
      minHeight="calc(100vh - 65px)"
      color="text.primary"
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
      }}>
      <div className="info">
        <h1 className="title">Olympus</h1>
        <h2> Play to Earn Game! </h2>
        <h3> Connect MetaMask To Play</h3>
      </div>
    </Box>
  );
};

export default Home;
