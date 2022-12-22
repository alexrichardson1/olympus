import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SavingsIcon from "@mui/icons-material/Savings";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import DeFiBorrowModal from "components/DeFiBorrowModal";
import DeFiListModal from "components/DeFiListModal";
import DeFiRemoveModal from "components/DeFiRemoveModal";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { getContractAddress, getMetaDataByTokenIds } from "utils/api";
import {
  claim,
  getCollateral,
  getListing,
  getTermsById,
  liquidate,
  payoff,
} from "utils/contracts/hermes";
import { getOwnedTokenIds } from "utils/contracts/olympus";
import SlidingDisplay from "../components/slidingDisplay/SlidingDisplay";

const defiContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const Defi = () => {
  const { active, account, library } = useWeb3React();
  const [selectedItemToBorrow, setSelectedItemToBorrow] = useState<MetaDataI | undefined>(
    undefined
  );
  const [selectedItemToList, setSelectedItemToList] = useState<MetaDataI | undefined>(undefined);
  const [selectedItemToRemove, setSelectedItemToRemove] = useState<MetaDataI | undefined>(
    undefined
  );
  const [selectedItemToBorrowPrice, setSelectedItemToBorrowPrice] = useState(BigNumber.from(0));
  const [drachmaAddress, setDrachmaAddress] = useState("0x0");
  const [olympusAddress, setOlympusAddress] = useState("0x0");
  const [hermesAddress, setHermesAddress] = useState("0x0");
  const [listModalOpen, setListModalOpen] = useState(false);
  const [catalog, setCatalog] = useState<MetaDataI[]>([]);
  const [ownedItems, setOwnedItems] = useState<MetaDataI[]>([]);
  const [ownedListedItems, setOwnedListedItems] = useState<MetaDataI[]>([]);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const filterListings = async (meta: MetaDataI) => {
    const { lender } = await getListing(hermesAddress, meta._id);
    return lender === account;
  };

  const handleCardClickBorrow = (idx: number) => async () => {
    const meta = catalog[idx];
    if (meta) {
      setSelectedItemToBorrowPrice(await getCollateral(hermesAddress, meta._id));
    }
    setSelectedItemToBorrow(catalog[idx]);
  };

  const handleCloseListModal = () => {
    setListModalOpen(false);
  };

  const handleCloseRemoveModal = () => {
    setRemoveModalOpen(false);
  };

  const handleCloseBuyModal = () => {
    setSelectedItemToBorrow(undefined);
  };

  const handleCardClickList = (idx: number) => () => {
    setSelectedItemToList(ownedItems[idx]);
  };

  const handleCardClickRemove = (idx: number) => () => {
    setSelectedItemToRemove(ownedListedItems[idx]);
  };

  const getBorrowedTokenId = async (): Promise<number> => {
    if (!account) {
      return -1;
    }
    const ids = await getOwnedTokenIds(olympusAddress, account);
    return ids[0] || -1;
  };

  const getLoanedTokenId = async (): Promise<number> => {
    if (!account) {
      return -1;
    }
    const ids = await getOwnedTokenIds(olympusAddress, hermesAddress);
    const terms = await getTermsById(hermesAddress, ids);
    for (let i = 0; i < ids.length && i < terms.length; i++) {
      const term = terms[i];
      if (!term) {
        return -1;
      }
      const { lender } = term;
      if (lender === account) {
        return ids[i] || -1;
      }
    }
    return -1;
  };

  useEffect(() => {
    const updateAddress = async () => {
      const [drachma, olympus, , hermes] = await getContractAddress();
      console.log(`Drachma address ${drachma}`);
      console.log(`Olympus address ${olympus}`);
      console.log(`Hermes address ${hermes}`);
      setDrachmaAddress(drachma ?? "0x0");
      setOlympusAddress(olympus ?? "0x0");
      setHermesAddress(hermes ?? "0x0");
      // get NFTs listed
      const ids = await getOwnedTokenIds(olympus ?? "0x0", hermes ?? "0x0");
      console.log(`Hermes ids: ${ids}`);
      const metas = await getMetaDataByTokenIds(ids);
      console.log(`Metadata ${metas}`);
      setCatalog(metas);
      setOwnedListedItems(metas.filter(filterListings));
    };
    updateAddress();
  }, []);

  useEffect(() => {
    const fetchOwnedNFTs = async () => {
      if (!account) {
        return;
      }
      const ids = await getOwnedTokenIds(olympusAddress, account);
      const meta = await getMetaDataByTokenIds(ids);
      setOwnedItems(meta);
    };
    fetchOwnedNFTs();
  }, [olympusAddress, account]);

  useEffect(() => {
    const fetchListedOwnedNFTs = async () => {
      if (account) {
        const itemsWithOwner = await Promise.all(
          catalog.map(async (meta) => {
            const { lender } = await getListing(hermesAddress, meta._id);
            return lender;
          })
        );
        const listedItems: MetaDataI[] = [];
        itemsWithOwner.forEach((lender, idx) => {
          const meta = catalog[idx];
          if (lender === account && meta !== void 0) {
            listedItems.push(meta);
          }
        });
        setOwnedListedItems(listedItems);
      }
    };

    fetchListedOwnedNFTs();
  }, [account, catalog]);

  useEffect(() => {
    if (!listModalOpen) {
      setSelectedItemToList(undefined);
    }
  }, [listModalOpen]);

  useEffect(() => {
    if (!removeModalOpen) {
      setSelectedItemToRemove(undefined);
    }
  }, [removeModalOpen]);

  return (
    <Box
      p="20px 50px"
      minHeight="calc(100vh - 65px)"
      bgcolor="background.default"
      color="text.primary">
      {selectedItemToBorrow !== undefined && (
        <DeFiBorrowModal
          drachmaAddress={drachmaAddress}
          hermesAddress={hermesAddress}
          open={selectedItemToBorrow !== undefined}
          handleClose={handleCloseBuyModal}
          selectedItem={selectedItemToBorrow}
          selectedItemPrice={selectedItemToBorrowPrice}
        />
      )}
      <DeFiListModal
        olympusAddress={olympusAddress}
        hermesAddress={hermesAddress}
        open={listModalOpen}
        handleClose={handleCloseListModal}
        selectedItemToList={selectedItemToList}
        handleCardClickList={handleCardClickList}
        items={ownedItems}
      />
      <DeFiRemoveModal
        hermesAddress={hermesAddress}
        open={removeModalOpen}
        handleClose={handleCloseRemoveModal}
        selectedItemToRemove={selectedItemToRemove}
        handleCardClickRemove={handleCardClickRemove}
        items={ownedListedItems}
      />
      <Box sx={defiContainerStyle}>
        <Stack justifyContent="space-between" ml="60px" pr="60px" direction="row">
          <Button
            sx={{ width: "15vw" }}
            color="primary"
            size="large"
            variant="contained"
            startIcon={<AddPhotoAlternateIcon />}
            disabled={!active}
            fullWidth={false}
            onClick={() => setListModalOpen(true)}>
            ADD LISTING
          </Button>

          <Button
            color="primary"
            sx={{ width: "15vw" }}
            size="large"
            variant="contained"
            startIcon={<DeleteForeverIcon />}
            disabled={!active}
            fullWidth={false}
            onClick={() => setRemoveModalOpen(true)}>
            REMOVE LISTING
          </Button>

          <Button
            sx={{ width: "15vw" }}
            color="primary"
            size="large"
            variant="contained"
            startIcon={<ShoppingCartCheckoutIcon />}
            disabled={!active}
            fullWidth={false}
            onClick={async () =>
              payoff(olympusAddress, hermesAddress, library, await getBorrowedTokenId())
            }>
            PAYOFF
          </Button>

          <Button
            color="primary"
            sx={{ width: "15vw" }}
            size="large"
            variant="contained"
            startIcon={<AttachMoneyIcon />}
            disabled={!active}
            fullWidth={false}
            onClick={async () => liquidate(hermesAddress, library, await getLoanedTokenId())}>
            LIQUIDATE
          </Button>

          <Button
            sx={{ width: "15vw" }}
            color="primary"
            size="large"
            variant="contained"
            startIcon={<SavingsIcon />}
            disabled={!active}
            fullWidth={false}
            onClick={async () => claim(hermesAddress, library, await getLoanedTokenId())}>
            CLAIM
          </Button>
        </Stack>

        <Typography sx={{ marginLeft: "60px" }} variant="h2">
          NFT LISTINGS
        </Typography>
        <SlidingDisplay
          onCardClick={handleCardClickBorrow}
          items={catalog}
          heightInPx={400}
          cardWidth="400px"
          showBorderAroundSelectedItemWithId={selectedItemToBorrow?._id}
        />
      </Box>
    </Box>
  );
};

export default Defi;
