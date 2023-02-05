export interface BookingTable {
  position: number;
  bookingNumber: string;
  roomNumber: number;
  price: string;
  checkIn: string;
  checkOut: string;
  bookedOn: string;
  status: string;
  transactionId: number | null;
}
