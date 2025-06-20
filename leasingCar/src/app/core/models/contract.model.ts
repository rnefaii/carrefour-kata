export interface Contract {
  carId: string;
  customerId: string;
  startDate: Date;
  endDate?: Date;
  dailyRate: string;
  active: boolean;
}
