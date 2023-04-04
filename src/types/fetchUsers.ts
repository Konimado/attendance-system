type fetchUsers = {
  address?: string;
  birth?: string;
  enterTime?: { seconds: number; nanoseconds: number };
  exitTime?: { seconds: number; nanoseconds: number };
  gender?: string;
  id?: string;
  mailAddress?: string;
  name?: string;
  phoneNumber?: string;
  plan?: string;
  postalCode?: string;
  startDate?: string;
  statue?: boolean;
};

export type { fetchUsers };
