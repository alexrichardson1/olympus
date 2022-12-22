import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { useWeb3React } from "@web3-react/core";
import { forwardRef, useState } from "react";
import { injected } from "utils/connectors";

enum Alerts {
  SUCCESS = "success",
  WARNING = "warning",
  INFO = "info",
  ERROR = "error",
}

const AUTO_HIDE = 6000;
const SLICE_INDEX = 5;
const LAST_INDEX = -1;

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * Displays the address in a shortened format of 0x1B3...4
 * @param account - the web3 address
 * @returns the formatted address to display
 */
export const displayAddress = (account: string | null | undefined): string => {
  if (!account) {
    return "UNDEFINED ADDRESS";
  }
  return `${account.substring(0, SLICE_INDEX)}...${account.slice(LAST_INDEX)}`;
};

const Wallet = () => {
  const { active, account, activate } = useWeb3React();
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const connect = async () => {
    await activate(injected)
      .then(() => setSuccess(true))
      .catch(() => setFailure(true));
  };

  // const disconnect = () => {
  //   try {
  //     deactivate();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setFailure(false);
  };

  return (
    <>
      <Button color="inherit" startIcon={<WalletIcon />} disabled={active} onClick={connect}>
        {active ? displayAddress(account) : "CONNECT WALLET"}
      </Button>

      <Snackbar open={success} autoHideDuration={AUTO_HIDE} onClose={handleClose}>
        <Alert onClose={handleClose} severity={Alerts.SUCCESS} sx={{ width: "100%" }}>
          Connected MetaMask Successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={failure} autoHideDuration={AUTO_HIDE} onClose={handleClose}>
        <Alert onClose={handleClose} severity={Alerts.ERROR} sx={{ width: "100%" }}>
          MetaMask Connection Failed!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Wallet;
