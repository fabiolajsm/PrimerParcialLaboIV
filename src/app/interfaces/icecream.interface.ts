export type IceCreamType = 'agua' | 'crema';

export interface IceCream {
  flavorName: string;
  type: IceCreamType;
  price: number;
  weight: number;
}
