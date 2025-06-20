import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Contract} from "../models/contract.model";
import {ContractDto} from "../models/contract.dto";

@Injectable({ providedIn: 'root' })
export class LeasingContractService {
  private readonly apiUrl = `${environment.leasingApiBaseUrl}/api/contracts`;

  constructor(private http: HttpClient) {}

  createContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(this.apiUrl, contract);
  }

  getAllContracts(): Observable<ContractDto[]> {
    return this.http.get<ContractDto[]>(this.apiUrl);
  }

  updateContract(contract: Contract): Observable<Contract> {
    return this.http.put<Contract>(`${this.apiUrl}`, contract);
  }

  deleteContract(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
