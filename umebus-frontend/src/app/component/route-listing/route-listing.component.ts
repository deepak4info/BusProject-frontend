import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Add this
import { CommonModule } from '@angular/common'; // <-- Add this



@Component({
  selector: 'app-bus-route',
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  templateUrl: './route-listing.component.html',
  styleUrls: ['./route-listing.component.css'],
})
export class routeListingComponent {
routeForm: FormGroup;
response: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.routeForm = this.fb.group({
      fromStationId: [null],
      toStationId: [null],
      routeId: [null],
    });
  }

  onSubmit() {
    const { fromStationId, toStationId, routeId } = this.routeForm.value;
    const params = new HttpParams()
      .set('fromStationId', fromStationId)
      .set('toStationId', toStationId)
      .set('routeId', routeId);

    const url =
      'https://bus-api-e9c6a0ccdpasf6fm.canadacentral-01.azurewebsites.net/api/BusRoute/stoppages';

    this.http.get(url, { params }).subscribe({
      next: (data) => (this.response = data),
      error: (err) => (this.response = err),
    });
  }
}
