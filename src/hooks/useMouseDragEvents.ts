import * as React from "react";

export const useMouseDragEvents = (
    isMouseDown: boolean,
    // Todo: find a prettier type
    mouseMoveHandler: {
      (e: MouseEvent): void;
      (this: Window, ev: MouseEvent): any;
      (this: Window, ev: MouseEvent): any;
    },
    mouseUpHandler: {
      (e: MouseEvent): void;
      (this: Window, ev: MouseEvent): any;
      (this: Window, ev: MouseEvent): any;
    }
  ) => {
    return React.useEffect(() => {
      if (!isMouseDown) return;
  
      window.addEventListener("mousemove", mouseMoveHandler);
      window.addEventListener("mouseup", mouseUpHandler);
      return () => {
        window.removeEventListener("mousemove", mouseMoveHandler);
        window.removeEventListener("mouseup", mouseUpHandler);
      };
    }, [isMouseDown, mouseMoveHandler, mouseUpHandler]);
  };