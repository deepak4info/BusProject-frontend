import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { StationService } from '../../Service/station.service';
import { BusRouteService } from '../../Service/bus-route.service';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  standalone: true,
  styleUrls: ['./hero-section.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class HeroSectionComponent implements OnInit {
  busStands: any[] = [];
  fromStation: string = '';
  toStation: string = '';
  filteredDepartureStands: string[] = [];
  filteredArrivalStands: string[] = [];
  fromStationError: boolean = false;
  toStationError: boolean = false;

  textArray: string[] = ['हरियाणा रोडवेज', 'हरियाणा का जहाज', 'हरियाणा शक्ति', 'शान ए हरियाणा'];
  currentIndex: number = 0;
  currentText: string = this.textArray[0];

  constructor(
    private stationService: StationService,
    private busRouteService: BusRouteService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStations();
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.textArray.length;
      this.currentText = this.textArray[this.currentIndex];
    }, 3000);
  }

  loadStations() {
    this.stationService.getAllStations().subscribe({
      next: (stations) => {
        this.busStands = stations;
      },
      error: (err) => {
        console.error('❌ Station API Error:', err);
        this.openSnackBar('Failed to load stations', 'Error');
        this.busStands = [];
      },
    });
  }

  filterDepartureStands(showAll: boolean = false) {
    this.filteredDepartureStands = this.fromStation || showAll
      ? this.busStands
          .map(s => s.stationName)
          .filter(name =>
            showAll ? true : name.toLowerCase().startsWith(this.fromStation.toLowerCase())
          )
          .sort()
      : [];
    this.fromStationError = false;
  }

  filterArrivalStands(showAll: boolean = false) {
    this.filteredArrivalStands = this.toStation || showAll
      ? this.busStands
          .map(s => s.stationName)
          .filter(name =>
            showAll ? true : name.toLowerCase().startsWith(this.toStation.toLowerCase())
          )
          .sort()
      : [];
    this.toStationError = false;
  }

  swapLocations() {
    [this.fromStation, this.toStation] = [this.toStation, this.fromStation];
    this.filterDepartureStands(true);
    this.filterArrivalStands(true);
  }

  searchTimetable() {
    this.fromStationError = !this.fromStation;
    this.toStationError = !this.toStation;

    if (!this.fromStation || !this.toStation) return;

    const fromObj = this.busStands.find(s =>
      s.stationName.toLowerCase().includes(this.fromStation.toLowerCase())
    );
    const toObj = this.busStands.find(s =>
      s.stationName.toLowerCase().includes(this.toStation.toLowerCase())
    );

    if (!fromObj || !toObj) {
      this.openSnackBar('Invalid stations selected', 'Error');
      return;
    }

    const fromId = fromObj.stationID;
    const toId = toObj.stationID;

    this.busRouteService.getRouteBetweenStations(fromId, toId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          localStorage.setItem('routeData', JSON.stringify(data));
          this.router.navigate(['/search-Section'], {
            queryParams: {
              fromStationId: fromId,
              toStationId: toId,
              routeId: data[0].busRouteId
            }
          });
        } else {
          this.openSnackBar('No buses found for selected route', 'Error');
        }
      },
      error: (err) => {
        console.error('❌ API Error:', err);
        this.openSnackBar('API Error', 'Error');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    config.duration = 3000;
    config.panelClass = action === 'Success' ? ['success-snackbar'] : ['error-snackbar'];
    this.snackBar.open(message, 'Close', config);
  }
}
