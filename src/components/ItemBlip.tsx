import {ItemDTO} from "../d";
import {MouseEventHandler} from "react";

export const BLIP_PREFIX = `blip-`;

interface ItemCallbacks {
  onItemClicked: MouseEventHandler<SVGCircleElement>;
  onItemHovered: MouseEventHandler<SVGCircleElement>;
}

export class ItemBlipDTO {
  get item(): ItemDTO {
    return this._item;
  }

  set item(value: ItemDTO) {
    this._item = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  private _x: number;
  private _y: number;
  private _item: ItemDTO;

  constructor(x: number, y: number, item: any) {
    this._x = x;
    this._y = y;
    this._item = item;
  }
}

function ItemBlip(props: { color: string; item: ItemBlipDTO, callbacks: ItemCallbacks }) {
  return (
      <div className="ItemBlip">
        <svg width="60" height="30">
          <circle id={`${BLIP_PREFIX}${props.item.item.id}`}
                  cx={30} cy={6}
                  r={"10"} stroke={"black"} strokeWidth={"3"}
                  fill={props.color} onClick={props.callbacks.onItemClicked}
                  onMouseEnter={props.callbacks.onItemHovered}/>
        </svg>
        <text x={props.item.x} y={props.item.y} fill="black">{props.item.item.name}</text>

      </div>
  );
}

export default ItemBlip;