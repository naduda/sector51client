export interface IUser {
  id: string;
  phone: string;
  name: string;
  surname: string;
  card: string;
}

export interface IService {
  id: number;
  name: string;
  desc: string;
  price: number;
}

export interface IBox {
  card: string;
  idType: number;
  number: number;
  time: Date;
}
