export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  custNumber: string;
}

export interface CustomerRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CustomerLogin {
  email: string;
  password: string;
}

export interface CustomerAuth {
  email: string;
  token: string;
}
