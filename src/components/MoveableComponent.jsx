import React, { useState, useRef } from "react";
import Moveable from "react-moveable";
export default function MoveableComponent(props) {
  const {
    updateMoveable,
    top,
    left,
    width,
    height,
    index,
    color,
    id,
    setSelected,
    isSelected = false,
  } = props;
  const ref = useRef();
  const [myNewWidth, setMyNewWidth] = useState(width);
  const [myNewHeight, setMyNewHeight] = useState(width)

  const [nodoReferencia, setNodoReferencia] = useState({
    top,
    left,
    width,
    height,
    index,
    color,
    id,
  });
console.log("color", color);
  let parent = document.getElementById("parent");
  let parentBounds = parent?.getBoundingClientRect();
  const onResize = async (e) => {
    // ACTUALIZAR ALTO Y ANCHO
    let newWidth = e.width;
    let newHeight = e.height;

    const positionMaxTop = top + newHeight;
    const positionMaxLeft = left + newWidth;

    if (positionMaxTop > parentBounds.height)
      newHeight = parentBounds.height - top;

    if (positionMaxLeft > parentBounds.width)
      newWidth = parentBounds.width - left;

    // ACTUALIZAR NODO REFERENCIA
    const beforeTranslate = e.drag.beforeTranslate;
    ref.current.style.width = `${newWidth}px`;
    ref.current.style.height = `${newHeight}px`;
    setMyNewHeight(newHeight);
    setMyNewWidth(newWidth);

    let translateX = beforeTranslate[0];
    let translateY = beforeTranslate[1];

    ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;

    setNodoReferencia({
      ...nodoReferencia,
      translateX,
      translateY,
      top: top + translateY < 0 ? 0 : top + translateY,
      left: left + translateX < 0 ? 0 : left + translateX,
    });
  };

  const onResizeEnd = async (e) => {
    let newWidth = e.lastEvent?.width;
    let newHeight = e.lastEvent?.height;

    const positionMaxTop = top + newHeight;
    const positionMaxLeft = left + newWidth;

    if (positionMaxTop > parentBounds?.height)
      newHeight = parentBounds?.height - top;
    if (positionMaxLeft > parentBounds?.width)
      newWidth = parentBounds?.width - left;

    const { lastEvent } = e;
    const { drag } = lastEvent;
    const { beforeTranslate } = drag;

    const absoluteTop = top + beforeTranslate[1];
    const absoluteLeft = left + beforeTranslate[0];
  };

  return (
    <>

      <div
        ref={ref}
        className="draggable"
        id={"component-" + id}
        style={{
          position: "absolute",
          top: top,
          left: left,
          width: width,
          height: height,
          background: color,
        }}
        onClick={() => setSelected(id)}
      />
      <h1 >{width}</h1>
      <Moveable
        target={isSelected && ref.current}
        resizable
        draggable
        hideDefaultLines={true}
        onDrag={(e) => {
          updateMoveable(
            id,
            {
              top: e.top,
              left: e.left,
              width,
              height,
              color,
            },
            (parentBounds.left -parentBounds.x  >= e.left || parentBounds.top - parentBounds.y >= e.top || parentBounds.right - parentBounds.x - myNewWidth <= e.left || parentBounds.height - myNewHeight <= e.top)
          );
        }}
        onResize={onResize}
        keepRatio={false}
        throttleResize={10}
        renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
        edge={false}
        zoom={1}
        origin={false}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
      />
    </>
  );
}
