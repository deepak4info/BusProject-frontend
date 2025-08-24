import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface StationMaster {
  stationID: number;
  stationName: string;
  revenueName: string;
  isActive: boolean;
  doneAt: string;
  district: string;
  tahsil: string;
}

interface StationRoutes {
  busRouteId: number;
  busId: number;
  fromStation: string;
  toStation: string;
  viaRouteName: string;
  date: string;
  departureTime: string;
  dropTime: string;
  createdDate: string;
  modifiedDate: string;
  totalDistance: number;
  daysAvailable: string;
}
interface BusMaster {
  busid: number;
  busNumber: string;
  busType: string;
  capacity: number;
  createdDate: string;
  isActive: boolean;
}

interface Station {
  stationID: number;
  stationName: string;
  revenueName: string;
  isActive: boolean;
  doneAt: string;
  district: string;
  tahsil: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  getStoppages() {
    throw new Error('Method not implemented.');
  }
  // private apiUrl = 'https://busprojectapi-dbd7brafa0hhgch8.uaenorth-01.azurewebsites.net';

  private apiUrl =
    'https://tammanadev-001-site1.ktempurl.com';

  constructor(private http: HttpClient) {}

  // bus master api fetch

  getBusMaster(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/BusMaster`);
  }

deleteBusMaster(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/api/BusMaster/${id}`);
}

  createBusMaster(station: BusMaster): Observable<BusMaster> {
    return this.http.post<BusMaster>(`${this.apiUrl}/api/BusMaster`, station);
  }
  updateBusMaster(id: number, station: BusMaster): Observable<BusMaster> {
    return this.http.put<BusMaster>(
      `${this.apiUrl}/api/BusMaster/${id}`,
      station
    );
  }

  // station master api fetch

  getStationMaster(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/StationMaster`);
  }

deleteStationMaster(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/api/StationMaster/${id}`);
}


  updateStationMaster(station: StationMaster): Observable<StationMaster> {
    return this.http.put<StationMaster>(
      `${this.apiUrl}/api/StationMaster`,
      station
    );
  }

  createStationMaster(station: StationMaster): Observable<StationMaster> {
    return this.http.post<StationMaster>(
      `${this.apiUrl}/api/StationMaster`,
      station
    );
  }

  // Station Routes  api fetch
  getStationRoutes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/StationRoutes`);
  }
  // createStationRoutes(station: StationRoutes): Observable<StationRoutes> {
  //   return this.http.post<StationRoutes>(
  //     `${this.apiUrl}/api/StationRoutes`,
  //     station
  //   );
  // }
createStationRoutes(station: StationRoutes): Observable<StationRoutes> {
  return this.http.post<StationRoutes>(`${this.apiUrl}/api/StationRoutes`, station);
}

  updateStationRoutes(
    id: number,
    station: StationRoutes
  ): Observable<StationRoutes> {
    return this.http.put<StationRoutes>(
      `${this.apiUrl}/api/StationRoutes/${id}`,
      station
    );
  }
  deleteStationRoutes(busRouteId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/StationRoutes/${busRouteId}`);
  }

  // Get Stations API
  getStations(fromStation: string, toStation: string): Observable<any[]> {
    const url = `${this.apiUrl}/api/Stations/get-stations?fromStation=${fromStation}&toStation=${toStation}`;
    console.log('API Call:', url);
    return this.http.get<any[]>(url);
  }

  // Station Routes  api fetch
  getBusRoutesStoppage(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/BusRouteStoppage`);
  }
  // user.service.ts

createBusRoutesStoppage(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/api/BusRouteStoppage`, data);
}
updateBusRoutesStoppage(id: number, data: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/api/BusRouteStoppage/${id}`, data);
}
deleteBusRouteStoppage(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/api/BusRouteStoppage/${id}`);
}
}
