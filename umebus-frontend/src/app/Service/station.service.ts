import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class StationService {
  private apiUrl = `${environment.apiUrl}/api/StationMaster`;

  constructor(private http: HttpClient) {}

  getAllStations() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
