import {MouseEventHandler} from "react";

export class QuadrantDTO<Q extends RadarQuadrant> {
  get quadrant(): Q {
    return this._quadrant;
  }

  set quadrant(value: Q) {
    this._quadrant = value;
  }

  private _quadrant: Q;

  get locked(): boolean {
    return this._locked;
  }

  set locked(value: boolean) {
    this._locked = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get items(): Array<ItemDTO> {
    return this._items;
  }

  set items(value: Array<ItemDTO>) {
    this._items = value;
  }

  private _name: string;
  private _description: string;
  private _items: Array<ItemDTO>;
  private _locked: boolean;

  constructor(name: string, quadrant: Q, description: string, items: Array<ItemDTO>, locked: boolean) {
    this._name = name;
    this._description = description;
    this._items = items;
    this._locked = locked;
    this._quadrant = quadrant;
  }
}

export class ItemDTO {
  get slice(): RadarSlice {
    return this._slice;
  }

  set slice(value: RadarSlice) {
    this._slice = value;
  }

  private _slice: RadarSlice;

  get tags(): Array<string> {
    return this._tags;
  }

  set tags(value: Array<string>) {
    this._tags = value;
  }

  get quadrant(): string {
    return this._quadrant;
  }

  set quadrant(value: string) {
    this._quadrant = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get locked(): boolean {
    return this._locked;
  }

  set locked(value: boolean) {
    this._locked = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  private _id: string;
  private _name: string;
  private _locked: boolean;
  private _description: string;
  private _quadrant: string;
  private _tags: Array<string>;

  constructor(id: string, name: string, description: string, quadrant: string, locked: boolean, tags: Array<string>, slice: RadarSlice) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._quadrant = quadrant;
    this._locked = locked;
    this._tags = tags;
    this._slice = slice;
  }
}

export interface WriteLockCallbacks<T> {
  readonly onLockRefresh: () => WriteLock<T>;
  readonly onLockRelease: (t: T) => void;
}

export interface WriteLock<T> {
  readonly id: string;
  readonly lock_expires: Date;
  readonly callbacks: WriteLockCallbacks<T>;
}

export interface ApplicationProperties {
  readonly name: string;
  readonly version: string;
  readonly left_upper: QuadrantDTO<RadarQuadrant.UPPER_LEFT>;
  readonly left_lower: QuadrantDTO<RadarQuadrant.LOWER_LEFT>;
  readonly right_upper: QuadrantDTO<RadarQuadrant.UPPER_RIGHT>;
  readonly right_lower: QuadrantDTO<RadarQuadrant.LOWER_RIGHT>;
}

export interface AppCallbacks extends ItemCallbacks {
  readonly onEditItem: (item: ItemDTO) => WriteLock<ItemDTO>,
  readonly onEditQuadrant: (quadrant: QuadrantDTO<any>) => WriteLock<QuadrantDTO<any>>,
}

export interface AppParams {
  readonly data: Readonly<ApplicationProperties>;
  readonly callbacks: AppCallbacks;
}

export enum RadarQuadrant {
  UPPER_LEFT,
  UPPER_RIGHT,
  LOWER_LEFT,
  LOWER_RIGHT
}

export enum RadarSlice {
  OUTER,
  MIDDLE,
  INNER
}

export interface ItemCallbacks {
  readonly onMouseEnter: MouseEventHandler,
  readonly onMouseLeave: MouseEventHandler,
  readonly onClick: MouseEventHandler,
}