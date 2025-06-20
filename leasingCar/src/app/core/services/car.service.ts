import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Car} from "../models/car.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private readonly apiUrl = `${environment.carApiBaseUrl}/cars`;

  constructor(private http: HttpClient) {}

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  updateCar(id: string, available: boolean): Observable<Car> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams().append('available', String(available));
    return this.http.put<Car>(`${this.apiUrl}/${id}/availability`, null,{headers, params});
  }

  deleteCar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
