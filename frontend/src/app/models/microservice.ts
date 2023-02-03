export interface Microservice {
  isLogin: boolean;

  user: Customer;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  custNumber: string;
}
