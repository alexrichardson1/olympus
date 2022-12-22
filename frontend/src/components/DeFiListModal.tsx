import { Box, Button, InputAdornment, Modal, Stack, TextField } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { ChangeEventHandler, useState } from "react";
import { DAYS_IN_SECONDS } from "utils/constants";
import { addListing } from "utils/contracts/hermes";
import SlidingDisplay from "./slidingDisplay/SlidingDisplay";

interface PropsT {
  open: boolean;
  handleClose: () => void;
  hermesAddress: string;
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

const priceInputProps = (text: string) => ({
  inputProps: { min: 0, step: "any" },
  endAdornment: <InputAdornment position="end">{text}</InputAdornment>,
});

const DeFiListModal = ({
  open,
  handleClose,
  hermesAddress,
  olympusAddress,
  selectedItemToList,
  handleCardClickList,
  items,
}: PropsT) => {
  const { library } = useWeb3React();
  const [listPrice, setListPrice] = useState("");
  const [duration, setDuration] = useState("");

  const handleDurationChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    event
  ) => {
    setDuration(event.target.value);
  };

  return (
    <Modal
      aria-labelledby="defi-list-modal"
      open={open}
      onClose={() => {
        handleClose();
        setListPrice("");
        setDuration("");
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
            width="100%"
            onSubmit={async (e: any) => {
              e.preventDefault();
              await addListing(
                olympusAddress,
                hermesAddress,
                library,
                selectedItemToList._id,
                Number(listPrice),
                Number(duration) * DAYS_IN_SECONDS
              );
              handleClose();
              setListPrice("");
            }}
            component="form"
            direction="row"
            justifyContent="center"
            alignItems="center">
            <TextField
              value={listPrice}
              onChange={(e) => setListPrice(e.target.value)}
              placeholder="0"
              label="List Price"
              type="number"
              InputProps={priceInputProps("DCM")}
              required
            />
            <TextField
              value={duration}
              onChange={handleDurationChange}
              placeholder="0"
              label="Duration"
              type="number"
              InputProps={priceInputProps("days")}
              required
            />
            <Button type="submit" variant="contained" size="large">
              List NFT
            </Button>
          </Stack>
        )}
      </Box>
    </Modal>
  );
};

export default DeFiListModal;
