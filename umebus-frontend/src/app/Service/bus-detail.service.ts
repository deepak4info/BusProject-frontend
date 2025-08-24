import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BusDetailService {
  private baseUrl = `${environment.apiUrl}/api/BusRoute`;

  constructor(private http: HttpClient) {}


    getStationsByRoute(busRouteId: number, fromStationId: number, toStationId: number): Observable<any[]> {
    const url = `${this.baseUrl}/route-stations?busRouteId=${busRouteId}&fromStationId=${fromStationId}&toStationId=${toStationId}`;
    return this.http.get<any[]>(url);
  }
}


