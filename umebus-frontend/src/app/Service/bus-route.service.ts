import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class BusRouteService {
  private apiUrl = `${environment.apiUrl}/api/BusRoute`;

  constructor(private http: HttpClient) {}

  getRouteBetweenStations(sourceStationId: number, destinationStationId: number) {
   return this.http.get<any[]>(`${this.apiUrl}/between-stations`, {
  params: { sourceStationId, destinationStationId }
});

  }

  getBusRoutesId(routeId: number) {
    return this.http.get<any>(`${this.apiUrl}/${routeId}`);
  }
}
