export enum Role {
  owner = "owner",
  tenent = "tenant",
  admin = "admin",
  staff = "staff",
  none = "none"
}

export type IUser = {
  _id: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  position: string;
  house: IHouse;
  //guests: Guest[];
}

export type IHouse = {
  _id: string;
  flatNo: number;
};

export interface userInput {
  firstName: String;
  lastName: String;
  phone: string;
  role: String;
  houseId: String;
  email: String;
  position: String;
}

export interface userUpdateInput {
  _id: String;
  firstName: String;
  lastName: String;
  phone: string;
  role: String;
  houseId: String;
  email: String;
  position: String;
}