import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { displayAddress } from "components/Wallet";
import { useEffect, useState } from "react";
import { getContractAddress } from "utils/api";
import { ContractIndex } from "utils/constants";
import { castVote } from "utils/contracts/zeus";

const daoModalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "28vw",
  height: "70vh",
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

const DAO = () => {
  const { active, library } = useWeb3React();
  const [zeusAddress, setZeusAddress] = useState("0x0");
  const [proposals] = useState<string[]>(["Proposal #1: Donate to charity"]);
  const [selectedProposal, setSelectedProposal] = useState<string>();
  const [vote, setVote] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    const updateAddress = async () => {
      const contracts = await getContractAddress();
      const zeus = contracts[ContractIndex.Zeus];
      console.log(`Zeus address ${zeus}`);
      setZeusAddress(zeus ?? "0x0");
    };
    updateAddress();
  }, []);

  const mapVoteToInt = (vt: string): number => {
    switch (vt) {
      case "for":
        return 0;
      case "against":
        return 1;
      case "abstain":
        return 2;
      default:
        return -1;
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVote((event.target as HTMLInputElement).value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!active) {
      return;
    }
    castVote(zeusAddress, library, mapVoteToInt(vote));
  };

  return (
    <Box
      p="20px 50px"
      minHeight="calc(100vh - 65px)"
      bgcolor="background.default"
      color="text.primary">
      <Modal
        open={selectedProposal !== undefined}
        onClose={() => {
          setComments("");
          setVote("");
          setSelectedProposal(undefined);
        }}>
        <Box sx={daoModalBoxStyle}>
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <FormControl
              sx={{ m: 3, display: "flex", justifyContent: "center" }}
              variant="standard">
              <FormLabel sx={{ mb: 2, textAlign: "center" }}>
                Proposer: {displayAddress("0x410bCD8Fe36939728b890F99c29DD33E8f53C00B")}
              </FormLabel>
              <FormLabel sx={{ mb: 4, textAlign: "center" }}>{selectedProposal}</FormLabel>
              <RadioGroup name="selection" value={vote} onChange={handleRadioChange}>
                <FormControlLabel
                  sx={{
                    m: 0,
                    mb: 2,
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: "5px",
                  }}
                  value="for"
                  control={<Radio />}
                  label="For"
                />
                <FormControlLabel
                  sx={{
                    m: 0,
                    mb: 2,
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: "5px",
                  }}
                  value="against"
                  control={<Radio />}
                  label="Against"
                />
                <FormControlLabel
                  sx={{
                    m: 0,
                    mb: 2,
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: "5px",
                  }}
                  value="abstained"
                  control={<Radio />}
                  label="Abstained"
                />
              </RadioGroup>
              <TextField
                size="medium"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Tell us you thoughts"
                label="Add comments"
                multiline
                rows={4}
              />
              <Button sx={{ mt: 2 }} type="submit" variant="outlined">
                Submit
              </Button>
            </FormControl>
          </form>
        </Box>
      </Modal>
      <Grid minHeight="calc(100vh - 105px)" container width="100%" direction="row">
        <Grid item xs={7} display="flex" flexDirection="column" justifyContent="center">
          <ul>
            {proposals.map((proposal, idx) => (
              <li
                style={{
                  listStyleType: "square",
                  fontSize: "50px",
                  marginBottom: "15px",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedProposal(proposal)}
                key={idx}>
                {proposal}
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={3} display="flex" justifyContent="center" fontSize={30} alignItems="center">
          DAO for the Olympus P2E game!
        </Grid>
      </Grid>
    </Box>
  );
};

export default DAO;
