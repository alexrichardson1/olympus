import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {
  Box,
  Button,
  InputAdornment,
  Modal,
  OutlinedInputProps,
  Stack,
  TextField,
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { handleAddListing } from "utils/contracts/market";
import SlidingDisplay from "./slidingDisplay/SlidingDisplay";

interface PropsT {
  open: boolean;
  handleClose: () => void;
  marketAddress: string;
  olympusAddress: string;
  selectedItemToList: MetaDataI | undefined;
  handleCardClickList: (idx: number) => () => void;
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

const priceInputProps: Partial<OutlinedInputProps> = {
  inputProps: { min: 0, step: "any" },
  endAdornment: <InputAdornment position="end">DCM</InputAdornment>,
};

const MarketListModal = ({
  open,
  handleClose,
  marketAddress,
  olympusAddress,
  selectedItemToList,
  handleCardClickList,
  items,
}: PropsT) => {
  const { library } = useWeb3React();
  const [listPrice, setListPrice] = useState("");

  return (
    <Modal
      aria-labelledby="nft-list-modal"
      open={open}
      onClose={() => {
        handleClose();
        setListPrice("");
      }}>
      <Box sx={listModalStyle}>
        <SlidingDisplay
          items={items}
          cardWidth="400px"
          heightInPx={400}
          onCardClick={handleCardClickList}
          showBorderAroundSelectedItemWithId={selectedItemToList?._id}
        />
        {selectedItemToList !== undefined && (
          <Stack
            gap={3}
            onSubmit={async (e: any) => {
              e.preventDefault();
              await handleAddListing(
                olympusAddress,
                marketAddress,
                library,
                selectedItemToList._id,
                Number(listPrice)
              );
              handleClose();
              setListPrice("");
            }}
            component="form"
            direction="row">
            <TextField
              value={listPrice}
              onChange={(e) => setListPrice(e.target.value)}
              placeholder="0"
              label="List Price"
              type="number"
              InputProps={priceInputProps}
              required
            />
            <Button startIcon={<PlaylistAddIcon />} type="submit" variant="contained" size="large">
              List NFT
            </Button>
          </Stack>
        )}
      </Box>
    </Modal>
  );
};

export default MarketListModal;
