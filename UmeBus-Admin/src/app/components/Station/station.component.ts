import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css'],
})
export class StationComponent implements OnInit {
  stations: any[] = [];
  loading = true;

  constructor(private stationService: UserService) {}

  ngOnInit() {
    this.fetchStations();
  }

  fetchStations() {
    this.stationService.getStationMaster().subscribe({
      next: (data) => {
        console.log('StationMaster Data:', data);
        this.stations = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching StationMaster:', err);
        this.loading = false;
      },
    });
  }
}
