export type IceCreamType = 'agua' | 'crema';

export interface IceCream {
  id?: string | undefined;
  flavorName: string;
  type: IceCreamType;
  price: number;
  weight: number;
}
