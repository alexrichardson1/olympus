import { Box } from "@mui/material";
import "./card.css";

interface PropsT {
  imageUrl: string;
  height: string;
  width: string;
  itemId?: string;
  onCardClick?: () => void;
  noMargins?: boolean;
  showBorder?: boolean;
}

const Card = ({ imageUrl, height, width, onCardClick, noMargins, showBorder }: PropsT) => {
  const cardStyle = {
    height: height,
    width: width,
    cursor: onCardClick === undefined ? "default" : "pointer",
    margin: noMargins ? "default" : "20px 20px",
    border: showBorder ? "2px solid" : "default",
    borderColor: "primary.main",
  };

  return (
    <Box className="card" sx={cardStyle} onClick={onCardClick}>
      <img className="card-image" src={imageUrl} alt={imageUrl} />
    </Box>
  );
};

export default Card;
