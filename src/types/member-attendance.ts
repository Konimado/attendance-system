
//toDateに相当する型がないのでany
type fetchmemberattendance = {
  enterTime?: any;
  exitTime?: any;
  id?: number;
};

type memberattendance = {
  enterTime: string;
  exitTime: string;
  id?: number;
};

export type {fetchmemberattendance};
