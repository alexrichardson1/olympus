import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GavelIcon from "@mui/icons-material/Gavel";
import PlayForWorkIcon from "@mui/icons-material/PlayForWork";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useWeb3React } from "@web3-react/core";
import { LinkContainer } from "react-router-bootstrap";
import Wallet from "./Wallet";

const FLEX_GROW = 1;

const Navbar = () => {
  const { active } = useWeb3React();

  return (
    <Box sx={{ height: "65px", flexGrow: FLEX_GROW }}>
      <AppBar sx={{ height: "100%" }} position="static">
        <Toolbar>
          <LinkContainer to={"/play"}>
            <Button
              color="inherit"
              startIcon={<PlayForWorkIcon />}
              disabled={!active}
              sx={{ flexGrow: FLEX_GROW }}>
              PLAY
            </Button>
          </LinkContainer>

          <LinkContainer to={"/market"}>
            <Button
              color="inherit"
              startIcon={<StorefrontIcon />}
              disabled={!active}
              sx={{ flexGrow: FLEX_GROW }}>
              MARKET
            </Button>
          </LinkContainer>

          <LinkContainer to={"/defi"}>
            <Button
              color="inherit"
              startIcon={<AccountBalanceIcon />}
              disabled={!active}
              sx={{ flexGrow: FLEX_GROW }}>
              DEFI
            </Button>
          </LinkContainer>

          <LinkContainer to={"/dao"}>
            <Button
              color="inherit"
              startIcon={<GavelIcon />}
              disabled={true}
              sx={{ flexGrow: FLEX_GROW }}>
              DAO
            </Button>
          </LinkContainer>
          <Wallet />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
