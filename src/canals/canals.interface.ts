export interface IWhereCanal {
  name: string;
  NOT?: any;
}

export enum CanalTypes {
  small,
  medium,
  large,
}

export interface ICanal {
  id: number;
  name: string;
  length: string;
  ways: string;
  direction: string;
  is_close: boolean;
  size: string;
}
