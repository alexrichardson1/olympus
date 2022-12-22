import { ContextType, WheelEvent } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

export const onWheelEvent = (
  apiObj: ContextType<typeof VisibilityContext>,
  wheelEvent: WheelEvent<Element>
) => {
  const isTouchpad = Math.abs(wheelEvent.deltaX) !== 0 || Math.abs(wheelEvent.deltaY) < 15;

  if (isTouchpad) {
    wheelEvent.stopPropagation();
    return;
  }

  if (wheelEvent.deltaY < 0) {
    apiObj.scrollNext();
  } else if (wheelEvent.deltaY > 0) {
    apiObj.scrollPrev();
  }
};
