import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Box, Button, Modal } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { removeListing } from "utils/contracts/hermes";
import SlidingDisplay from "./slidingDisplay/SlidingDisplay";

interface PropsT {
  open: boolean;
  handleClose: () => void;
  hermesAddress: string;
  selectedItemToRemove: MetaDataI | undefined;
  handleCardClickRemove: (idx: number) => () => void;
  items: MetaDataI[];
}

const listModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  height: "90vh",
  borderRadius: "5px",
  bgcolor: "background.paper",
  border: "2px solid",
  borderColor: "secondary.main",
  boxShadow: 24,
  p: 4,
  color: "text.primary",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  overflow: "auto",
};

const DeFiRemoveModal = ({
  open,
  handleClose,
  hermesAddress,
  selectedItemToRemove,
  handleCardClickRemove,
  items,
}: PropsT) => {
  const { library } = useWeb3React();

  return (
    <Modal aria-labelledby="nft-list-modal" open={open} onClose={handleClose}>
      <Box sx={listModalStyle}>
        <SlidingDisplay
          items={items}
          cardWidth="400px"
          heightInPx={400}
          onCardClick={handleCardClickRemove}
          showBorderAroundSelectedItemWithId={selectedItemToRemove?._id}
        />
        {selectedItemToRemove !== undefined && (
          <Button
            startIcon={<RemoveShoppingCartIcon />}
            type="submit"
            variant="contained"
            size="large"
            onClick={async (e: any) => {
              e.preventDefault();
              await removeListing(hermesAddress, library, selectedItemToRemove._id);
              handleClose();
            }}>
            Remove NFT Listing
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default DeFiRemoveModal;
