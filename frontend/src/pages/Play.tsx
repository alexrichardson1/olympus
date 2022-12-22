import AddIcon from "@mui/icons-material/Add";
import CelebrationIcon from "@mui/icons-material/Celebration";
import DoneIcon from "@mui/icons-material/Done";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";
import SavingsIcon from "@mui/icons-material/Savings";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Box, Button, Grid, Modal, Stack, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import LoadingCircle from "components/LoadingCircle";
import SlidingDisplay from "components/slidingDisplay/SlidingDisplay";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { claimRewards, getContractAddress, getMetaDataByTokenIds, play } from "utils/api";
import { addDCMToken } from "utils/connectors";
import { ContractIndex } from "utils/constants";
import { getOwnedTokenIds, openLootBox } from "utils/contracts/olympus";
import { claim } from "utils/contracts/pandora";

const pickNFTModalStyle = {
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
  color: "text.primary",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  overflow: "auto",
};

const Play = () => {
  const { active, account, library } = useWeb3React();
  const [pickNFTModalOpen, setPickNFTModalOpen] = useState(false);
  const [items, setItems] = useState<MetaDataI[]>([]);
  const [selectedItem, setSelectedItem] = useState<MetaDataI | undefined>(undefined);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameChoice, setGameChoice] = useState<MetaDataI | undefined>(undefined);
  const [won, setWon] = useState(false);
  const [drachmaAddress, setDrachmaAddress] = useState("0x0");
  const [olympusAddress, setOlympusAddress] = useState("0x0");
  const [pandoraAddress, setPandoraAddress] = useState("0x0");

  useEffect(() => {
    const updateAddress = async () => {
      const addresses = await getContractAddress();
      const drachma = addresses[ContractIndex.Drachma];
      const olympus = addresses[ContractIndex.Olympus];
      const pandora = addresses[ContractIndex.Pandora];
      console.log(`Drachma address ${drachma}`);
      console.log(`Olympus address ${olympus}`);
      console.log(`Pandora address ${pandora}`);
      setDrachmaAddress(drachma ?? "0x0");
      setOlympusAddress(olympus ?? "0x0");
      setPandoraAddress(pandora ?? "0x0");
    };
    updateAddress();
  }, []);

  const handlePickModalOpen = () => {
    setPickNFTModalOpen(true);
  };

  const handleCardClick = (idx: number) => () => {
    setSelectedItem(items[idx]);
  };

  useEffect(() => {
    const fetchOwnedNFTs = async () => {
      if (!account) {
        return;
      }
      const ids = await getOwnedTokenIds(olympusAddress, account);
      const meta = await getMetaDataByTokenIds(ids);
      setItems(meta);
    };
    fetchOwnedNFTs();
  }, [olympusAddress, account]);

  useEffect(() => {
    const startGame = async () => {
      if (!account || !gameStarted || !selectedItem) {
        return;
      }
      const { result, opponentMeta } = await play(account, selectedItem._id);
      setWon(result);
      console.log(`frontend result ${result}`);
      console.log(`frontend meta ${opponentMeta}`);
      setGameChoice(opponentMeta);
    };
    startGame();
  }, [gameStarted]);

  const PlayAgainButton = () => (
    <Button
      onClick={() => {
        setGameStarted(false);
      }}
      endIcon={<ReplayIcon />}
      disabled={!active}
      size="large"
      sx={{ height: "20vh", width: "20vw" }}
      variant="outlined">
      <Typography variant="h5">Play Again</Typography>
    </Button>
  );

  const OpenLootButton = () => (
    <Button
      onClick={() => {
        if (!account) {
          return;
        }
        openLootBox(drachmaAddress, olympusAddress, library, account);
      }}
      endIcon={<EmojiEventsIcon />}
      disabled={!active}
      size="large"
      sx={{ height: "20vh", width: "20vw" }}
      variant="outlined">
      <Typography variant="h5">Open Loot Box</Typography>
    </Button>
  );

  const ClaimButton = () => (
    <Button
      onClick={async () => {
        if (!account) {
          return;
        }
        const { amount, signature } = await claimRewards(account);
        await claim(pandoraAddress, library, BigNumber.from(amount), signature);
      }}
      endIcon={<SavingsIcon />}
      disabled={!active}
      size="large"
      sx={{ height: "20vh", width: "20vw" }}
      variant="outlined">
      <Typography variant="h5">Claim Rewards</Typography>
    </Button>
  );

  return (
    <Box
      p="20px 50px"
      minHeight="calc(100vh - 65px)"
      bgcolor="background.default"
      color="text.primary"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap={10}>
      <Modal
        aria-labelledby="play-pick-nft-modal"
        open={pickNFTModalOpen}
        onClose={() => {
          setSelectedItem(undefined);
          setPickNFTModalOpen(false);
        }}>
        <Box sx={pickNFTModalStyle}>
          <SlidingDisplay
            items={items}
            cardWidth="400px"
            heightInPx={400}
            onCardClick={handleCardClick}
            showBorderAroundSelectedItemWithId={selectedItem?._id}
          />
          {selectedItem !== undefined && (
            <Button
              onClick={() => {
                setGameStarted(true);
                setPickNFTModalOpen(false);
              }}
              startIcon={<DoneIcon />}
              size="large"
              variant="contained">
              Pick selected NFT
            </Button>
          )}
        </Box>
      </Modal>
      <Stack width="100%" gap={3} alignItems="center" direction="row" justifyContent="center">
        <Button
          startIcon={<AddIcon />}
          disabled={!active}
          variant="contained"
          onClick={() => addDCMToken(library)}>
          ADD DCM TOKEN
        </Button>
      </Stack>
      {gameStarted && selectedItem !== undefined ? (
        <Grid justifyContent="center" container gap={2}>
          <Grid p={4} mb={5} item xs={5}>
            <Stack width="100%" gap={3} alignItems="center">
              <Typography variant="h2">Your Choice</Typography>
              <img
                style={{ maxWidth: "400px", maxHeight: "400px" }}
                src={selectedItem.image}
                alt="your choice"
              />
            </Stack>
          </Grid>
          <Grid p={4} item xs={5}>
            {gameChoice === undefined ? (
              <LoadingCircle />
            ) : (
              <Stack width="100%" gap={3} alignItems="center">
                <Typography variant="h2">Our Choice</Typography>
                <img
                  style={{ maxWidth: "400px", maxHeight: "400px" }}
                  src={gameChoice.image}
                  alt="our choice"
                />
              </Stack>
            )}
          </Grid>
          <Grid item xs={12} justifyContent="center">
            {gameChoice && won && (
              <Typography variant="h4" textAlign="center">
                Congratulations! You won <CelebrationIcon />
              </Typography>
            )}
            {gameChoice && !won && (
              <Typography variant="h4" textAlign="center">
                You lost. Better Luck next time <ThumbUpOffAltIcon />
              </Typography>
            )}
          </Grid>
          <ClaimButton />
          <PlayAgainButton />
        </Grid>
      ) : (
        <Stack alignItems="center" gap={3}>
          <Stack gap={3} direction="row">
            <OpenLootButton />
            <ClaimButton />
          </Stack>
          <Button
            onClick={handlePickModalOpen}
            endIcon={<PlayArrowIcon />}
            disabled={!active}
            size="large"
            sx={{ height: "25vh", width: "25vw" }}
            variant="outlined">
            <Typography variant="h5">Start Game</Typography>
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default Play;
