import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SavingsIcon from "@mui/icons-material/Savings";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import MarketBuyModal from "components/MarketBuyModal";
import MarketListModal from "components/MarketListModal";
import MarketRemoveModal from "components/MarketRemoveModal";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { getContractAddress, getMetaDataByTokenIds } from "utils/api";
import { getOwnedTokenIds } from "utils/contracts/olympus";
import SlidingDisplay from "../components/slidingDisplay/SlidingDisplay";
import { getListing, handleWithdraw } from "../utils/contracts/market";

const marketplaceContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const Market = () => {
  const { active, account, library } = useWeb3React();
  const [selectedItemToBuy, setSelectedItemToBuy] = useState<MetaDataI | undefined>(undefined);
  const [selectedItemToBuyPrice, setSelectedItemToBuyPrice] = useState(BigNumber.from(0));
  const [selectedItemToList, setSelectedItemToList] = useState<MetaDataI | undefined>(undefined);
  const [selectedItemToRemove, setSelectedItemToRemove] = useState<MetaDataI | undefined>(
    undefined
  );
  const [drachmaAddress, setDrachmaAddress] = useState("0x0");
  const [olympusAddress, setOlympusAddress] = useState("0x0");
  const [marketAddress, setMarketAddress] = useState("0x0");
  const [listModalOpen, setListModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [catalog, setCatalog] = useState<MetaDataI[]>([]);
  const [ownedListedItems, setOwnedListedItems] = useState<MetaDataI[]>([]);
  const [ownedItems, setOwnedItems] = useState<MetaDataI[]>([]);

  const filterListings = async (meta: MetaDataI) => {
    const { seller } = await getListing(marketAddress, meta._id);
    console.log(seller, account);
    return seller === account;
  };

  useEffect(() => {
    const updateAddress = async () => {
      const [drachma, olympus, market] = await getContractAddress();
      console.log(`Drachma address ${drachma}`);
      console.log(`Olympus address ${olympus}`);
      console.log(`Market address ${market}`);
      setDrachmaAddress(drachma ?? "0x0");
      setOlympusAddress(olympus ?? "0x0");
      setMarketAddress(market ?? "0x0");
      // get NFTs listed on the MarketPlace
      const ids = await getOwnedTokenIds(olympus ?? "0x0", market ?? "0x0");
      console.log(`Market ids: ${ids}`);
      const metas = await getMetaDataByTokenIds(ids);
      console.log(`Metadata ${metas}`);
      setCatalog(metas);
      setOwnedListedItems(metas.filter(filterListings));
    };
    updateAddress();
  }, []);

  useEffect(() => {
    const fetchListedOwnedNFTs = async () => {
      if (account) {
        const itemsWithOwner = await Promise.all(
          catalog.map(async (meta) => {
            const { seller } = await getListing(marketAddress, meta._id);
            return seller;
          })
        );
        const listedItems: MetaDataI[] = [];
        itemsWithOwner.forEach((seller, idx) => {
          const meta = catalog[idx];
          if (seller === account && meta !== void 0) {
            listedItems.push(meta);
          }
        });
        setOwnedListedItems(listedItems);
      }
    };

    fetchListedOwnedNFTs();
  }, [account, catalog]);

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

  const handleCloseListModal = () => {
    setListModalOpen(false);
  };

  const handleCloseRemoveModal = () => {
    setRemoveModalOpen(false);
  };

  useEffect(() => {
    setOwnedListedItems(catalog.filter(filterListings));
  }, [catalog]);

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

  const handleCloseBuyModal = () => {
    setSelectedItemToBuy(undefined);
  };

  const handleCardClickBuy = (idx: number) => async () => {
    const meta = catalog[idx];
    if (meta) {
      const { price } = await getListing(marketAddress, meta._id);
      setSelectedItemToBuyPrice(price);
    }
    setSelectedItemToBuy(catalog[idx]);
  };

  const handleCardClickList = (idx: number) => () => {
    setSelectedItemToList(ownedItems[idx]);
  };

  const handleCardClickRemove = (idx: number) => () => {
    setSelectedItemToRemove(ownedListedItems[idx]);
  };

  return (
    <Box
      p="20px 50px"
      minHeight="calc(100vh - 65px)"
      bgcolor="background.default"
      color="text.primary">
      {selectedItemToBuy !== undefined && selectedItemToBuyPrice !== undefined && (
        <MarketBuyModal
          drachmaAddress={drachmaAddress}
          marketAddress={marketAddress}
          open={selectedItemToBuy !== undefined}
          handleClose={handleCloseBuyModal}
          selectedItem={selectedItemToBuy}
          selectedItemPrice={selectedItemToBuyPrice}
        />
      )}
      <MarketListModal
        olympusAddress={olympusAddress}
        marketAddress={marketAddress}
        open={listModalOpen}
        handleClose={handleCloseListModal}
        selectedItemToList={selectedItemToList}
        handleCardClickList={handleCardClickList}
        items={ownedItems}
      />
      <MarketRemoveModal
        marketAddress={marketAddress}
        open={removeModalOpen}
        handleClose={handleCloseRemoveModal}
        selectedItemToRemove={selectedItemToRemove}
        handleCardClickRemove={handleCardClickRemove}
        items={ownedListedItems}
      />
      <Box sx={marketplaceContainerStyle}>
        <Stack justifyContent="space-between" ml="60px" pr="60px" direction="row">
          <Button
            sx={{ width: "20vw" }}
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
            sx={{ width: "20vw" }}
            size="large"
            variant="contained"
            startIcon={<DeleteForeverIcon />}
            disabled={!active}
            fullWidth={false}
            onClick={() => setRemoveModalOpen(true)}>
            REMOVE LISTING
          </Button>

          <Button
            sx={{ width: "20vw" }}
            color="primary"
            size="large"
            variant="contained"
            startIcon={<SavingsIcon />}
            disabled={!active}
            fullWidth={false}
            onClick={() => handleWithdraw(marketAddress, library)}>
            WITHDRAW
          </Button>
        </Stack>

        <Typography sx={{ marginLeft: "60px" }} variant="h2">
          NFT LISTINGS
        </Typography>

        <SlidingDisplay
          onCardClick={handleCardClickBuy}
          items={catalog}
          heightInPx={400}
          cardWidth="400px"
          showBorderAroundSelectedItemWithId={selectedItemToBuy?._id}
        />
      </Box>
    </Box>
  );
};

export default Market;
