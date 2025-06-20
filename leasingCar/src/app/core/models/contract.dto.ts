import {CustomerDto} from "./customer.dto.model";
import {CarDto} from "./car.dto.model";

export interface ContractDto {
  car: CarDto;
  customer: CustomerDto;
  startDate: Date;
  endDate?: Date;
  dailyRate: string;
  active: boolean;
}
