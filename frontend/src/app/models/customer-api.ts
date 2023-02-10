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

export interface BookingDetail {
  bookingNumber: string;
  customerNumber: string;
  roomNumber: number;
  roomPrice: number;
  checkIn: string;
  checkOut: string;
  bookedOn: string;
  status: string;
  transactionId: number;
}

export interface TransactionDetail {
  id: number;
  bookingNumber: string;
  cardNumber: string;
  cardType: string;
  paymentMode: string;
  bankName: string;
  amount: number;
  createdAt: string;
}

export interface BookingCreate {
  roomPrice: number;
  checkIn: string;
  roomNumber: number;
  customerNumber: string;
  checkOut: string;
}

export interface BookingTransaction {
  cardCvc: string;
  cardExpiry: string;
  cardNumber: string;
  bookingNumber: string;
}

export interface ReviewCreate {
  rate: number;
  description: string;
  customerNumber: string;
  title: string;
}

export interface Review {
  customerNumber: string;
  fullname: string;
  email: string;
  rate: number;
  description: string;
  title: string;
  createdDate: Date;
}
