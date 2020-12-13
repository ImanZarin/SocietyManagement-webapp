export enum Role {
  owner = "owner",
  tenent = "tenant",
  admin = "admin",
  staff = "staff",
  none = "none",
}

export type IUser = {
  _id: string;
  nationalNO: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  position: string;
  house: IHouse;
  //guests: Guest[];
};

export type IHouse = {
  _id: string;
  flatNo: number;
};

export interface userInput {
  nationalNO: string;
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
  nationalNO: string;
  firstName: String;
  lastName: String;
  phone: string;
  role: String;
  houseId: String;
  email: String;
  position: String;
}

export type IElection = {
  _id: string;
  title: string;
  start: string;
  end: string;
  options: ElectionOption[];
  hasImg: boolean;
};

export type ElectionOption = {
  name: string;
  imgUrl: string;
  percent: number;
};

export type Vote = {
  electionId: string;
  userId:string;
  vote: string;
  _id: string;
}

export type VoteElection = {
  elections: IElection[];
  votes: Vote[]; 
}
