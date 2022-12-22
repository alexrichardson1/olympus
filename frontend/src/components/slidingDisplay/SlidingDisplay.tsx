import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box } from "@mui/material";
import { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import useScrollLock from "../../hooks/useScrollLock";
import { onWheelEvent } from "../../utils/slidingDisplayUtils";
import Card from "../card/Card";
import Arrow from "./Arrow";

interface PropsT {
  items: MetaDataI[];
  heightInPx: number;
  width?: string;
  cardWidth: string;
  onCardClick: (idx: number) => () => void;
  showBorderAroundSelectedItemWithId?: number;
}

const LeftArrow = () => {
  const { scrollPrev, isFirstItemVisible } = useContext(VisibilityContext);
  return (
    <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      <KeyboardDoubleArrowLeftIcon />
    </Arrow>
  );
};

const RightArrow = () => {
  const { scrollNext, isLastItemVisible } = useContext(VisibilityContext);
  return (
    <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
      <KeyboardDoubleArrowRightIcon />
    </Arrow>
  );
};

const SlidingDisplay = ({
  items,
  heightInPx,
  width,
  cardWidth,
  onCardClick,
  showBorderAroundSelectedItemWithId,
}: PropsT) => {
  const [disableScroll, enableScroll] = useScrollLock();

  const slidingDisplayDivStyle = {
    height: `${heightInPx + 40}px`,
    width: width ?? "100%",
  };

  return (
    <Box onMouseEnter={disableScroll} onMouseLeave={enableScroll} sx={slidingDisplayDivStyle}>
      <ScrollMenu LeftArrow={<LeftArrow />} RightArrow={<RightArrow />} onWheel={onWheelEvent}>
        {items &&
          items.map((item, idx) => (
            <Card
              onCardClick={onCardClick(idx)}
              key={item._id}
              itemId={item.name}
              height={`${heightInPx}px`}
              width={cardWidth}
              imageUrl={item.image}
              showBorder={item._id === showBorderAroundSelectedItemWithId}
            />
          ))}
      </ScrollMenu>
    </Box>
  );
};

export default SlidingDisplay;
