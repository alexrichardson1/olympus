import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Button, Divider, Grid, Modal, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, utils } from "ethers";
import { getStrength, getTrait } from "utils/helpers";
import { handleBuy } from "../utils/contracts/market";
import Card from "./card/Card";

const buyModalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  height: "80vh",
  borderRadius: "5px",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "2px solid",
  borderColor: "secondary.main",
  p: 4,
  color: "text.primary",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  overflow: "auto",
};

interface PropsT {
  drachmaAddress: string;
  marketAddress: string;
  open: boolean;
  handleClose: () => void;
  selectedItem: MetaDataI;
  selectedItemPrice: BigNumber;
}

const MarketBuyModal = ({
  drachmaAddress,
  marketAddress,
  open,
  handleClose,
  selectedItem,
  selectedItemPrice,
}: PropsT) => {
  const { library } = useWeb3React();
  return (
    <Modal aria-labelledby="nft-buy-modal" open={open} onClose={handleClose}>
      <Box sx={buyModalBoxStyle}>
        <Grid container justifyContent="center" alignItems="center" gap={3} sx={{ height: 1 }}>
          <Grid item gap={3} container direction="column" xs={5}>
            <Grid item xs={9}>
              <Card noMargins imageUrl={selectedItem.image} height="400px" width="100%" />
            </Grid>
            <Grid item xs="auto">
              <Box display="flex" justifyContent="center" gap="20px">
                <Button
                  startIcon={<ShoppingCartIcon fontSize="large" />}
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={() =>
                    handleBuy(drachmaAddress, marketAddress, library, selectedItem._id)
                  }>
                  {`Buy for ${utils.formatEther(selectedItemPrice)} DCM`}
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            item
            justifyContent="center"
            padding={3}
            gap={3}
            xs={6}
            sx={{ minHeight: 0.9 }}>
            <Grid item xs={2}>
              <Typography gutterBottom textAlign="center" variant="h4">
                {`Zeus #${selectedItem._id}`}
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs="auto">
              {selectedItem.description}
            </Grid>
            <Grid item xs={2}>
              <Box display="flex" justifyContent="center" gap="20px">
                <Button
                  sx={{ minWidth: "125px" }}
                  variant="outlined"
                  color="secondary"
                  size="large">
                  Strength <br /> {getStrength(selectedItem.attributes)}
                </Button>
                <Button
                  sx={{ minWidth: "125px" }}
                  variant="outlined"
                  color="secondary"
                  size="large">
                  Trait <br /> {getTrait(selectedItem.attributes)}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default MarketBuyModal;
