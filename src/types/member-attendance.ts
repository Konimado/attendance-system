
//toDateに相当する型がないのでany
type Fetchmemberattendance = {
  enterTime?: any;
  exitTime?: any;
  id?: number;
};

type Memberattendance = {
  enterTime: string;
  exitTime: string;
  id?: number;
  date:string,
  week:string
};

export type {Fetchmemberattendance,Memberattendance};
