export interface IUserService {
  idService: number;
  idUser: string;
  dtBeg: number;
  dtEnd: number;
  value: any;

  name?: string;
  price?: number;
}

export interface IUserServiceFormValue {
  idService: number;
  idUser: string;
  dtBeg: Date;
  dtEnd: Date;
  value: any;

  name?: string;
  price?: number;
}

export class UserService implements IUserService {
  idService: number;
  idUser: string;
  dtBeg: number;
  dtEnd: number;
  value: any;
  name?: string;
  price?: number;

  static toFormValue(v: IUserService): IUserServiceFormValue {
    return {
      idService: v.idService,
      idUser: v.idUser,
      value: v.idService === 2 ? +v.value : v.value,
      name: v.name,
      price: v.price,
      dtBeg: v.dtBeg ? new Date(v.dtBeg) : null,
      dtEnd: v.dtEnd ? new Date(v.dtEnd) : null,
    };
  }
}
