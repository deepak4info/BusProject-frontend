import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BusRouteService } from '../../Service/bus-route.service';

interface BusRoute {
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

interface Stop {
  name: string;
  time: string;
  runningTime: number;
}

@Component({
  selector: 'app-route-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './route-details.component.html',
  styleUrl: './route-details.component.scss',
})
export class RouteDetailsComponent implements OnInit {
  stops: Stop[] = [];
  busPosition = 0;
  currentStop = 0;
  totalRouteTime = 0;
  loading: boolean = true;
  errorMessage: string = '';
  busRouteId: number | null = null;
  busRoute: BusRoute | null = null; // Store the single fetched route

  constructor(private busRouteService: BusRouteService, private route: ActivatedRoute) {}

ngOnInit() {
  const routeData = history.state.routeData;

  if (routeData && routeData.length > 0) {
    this.busRoute = routeData[0];

    if (this.busRoute) {
      this.busRouteId = this.busRoute.busRouteId;
      this.populateStops();
      this.calculateTotalRouteTime();
      this.loading = false;
    }
  } else {
    this.route.queryParams.subscribe(params => {
      const routeId = +params['routeId'];
      this.busRouteId = routeId;
      this.fetchBusRoute();
    });
  }
}


  fetchBusRoute() {
    this.loading = true;

    if (this.busRouteId !== null) {
      this.busRouteService.getBusRoutesId(this.busRouteId).subscribe({
        next: (data :any) => {
          this.busRoute = data;
          this.populateStops();
          this.calculateTotalRouteTime();
          this.loading = false;
        },
        error: (error:any) => {
          this.errorMessage = error;
          this.loading = false;
        },
      });
    }
  }

  formatTime(timeString: string): string {
    const date = new Date(timeString);
  
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    hours = hours % 12 || 12; // Convert '0' (midnight) to '12'
  
    // Ensure minutes are always two digits
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${hours}:${formattedMinutes} ${ampm}`;
  }
  populateStops() {
    if (this.busRoute) {
      this.stops = [
        { name: this.busRoute.fromStation, time: this.formatTime(this.busRoute.departureTime), runningTime: 0 },
        { name: this.busRoute.viaRouteName, time: this.formatTime(this.busRoute.departureTime), runningTime: 15 }, 
        { name: this.busRoute.toStation, time: this.formatTime(this.busRoute.dropTime), runningTime: 15 }, 
      ];
    }
  }

  calculateTotalRouteTime() {
    this.totalRouteTime = this.stops.reduce((acc, stop) => acc + stop.runningTime, 0);
  }

  moveBus(index: number) {
    this.currentStop = index;
    this.busPosition = (index / (this.stops.length - 1)) * 100;
    this.updateEtas();
  }

  updateEtas() {
    let currentTime = this.getCurrentTimeInMinutes();

    for (let i = 0; i < this.stops.length; i++) {
      let timeDifference = 0;
      if (i > this.currentStop) {
        timeDifference = this.calculateRemainingTime(i);
      }
      this.stops[i].time = this.minutesToTimeString(currentTime + timeDifference);
    }
  }

  calculateRemainingTime(targetStopIndex: number): number {
    let remainingTime = 0;
    for (let i = this.currentStop + 1; i <= targetStopIndex; i++) {
      remainingTime += this.stops[i].runningTime;
    }
    const currentStopProgress = (this.busPosition / 100) * (this.stops.length - 1);
    const currentStopDecimal = currentStopProgress - Math.floor(currentStopProgress);

    if (targetStopIndex === this.currentStop + 1) {
      remainingTime = this.stops[targetStopIndex].runningTime - this.stops[targetStopIndex].runningTime * currentStopDecimal;
    }
    return remainingTime;
  }

  getCurrentTimeInMinutes(): number {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }

  minutesToTimeString(minutes: number): string {
    const hours = Math.floor(minutes / 60) % 24;
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }


}