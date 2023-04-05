type Users = {
  address: string;
  birth: string;
  enterTime: string;
  exitTime: string;
  gender: string;
  id: string;
  mailAddress: string;
  name: string;
  phoneNumber: string;
  plan: string;
  postalCode: string;
  startDate: string;
  statue: boolean;

};

type UsersAddAge = {
  address: string;
  birth: string;
  enterTime: string;
  exitTime: string;
  gender: string;
  id: string;
  mailAddress: string;
  name: string;
  phoneNumber: string;
  plan: string;
  postalCode: string;
  startDate: string;
  statue: boolean;
  age: number;
};
export type { Users,UsersAddAge };
