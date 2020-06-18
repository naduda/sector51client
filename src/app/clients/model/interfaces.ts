export interface IUser {
  id: string;
  phone: string;
  name: string;
  surname: string;
}

export interface IService {
  id: number;
  name: string;
  price: number;
}

export interface IBox {
  card: string;
  idType: number;
  number: number;
  time: string;
}
