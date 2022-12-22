import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";

interface PropsT {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Arrow = ({ disabled, onClick, children }: PropsT) => (
  <Box display="flex" alignItems="center" m="0 10px">
    <IconButton onClick={onClick} color="primary" sx={{ opacity: disabled ? 0 : 1 }}>
      {children}
    </IconButton>
  </Box>
);

export default Arrow;
