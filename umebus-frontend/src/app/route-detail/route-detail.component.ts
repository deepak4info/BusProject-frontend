import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BusDetailService } from '../Service/bus-detail.service';

@Component({
  selector: 'app-route-detail',
  standalone: true,
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.scss'],
  imports: [CommonModule]
})
export class RouteDetailComponent implements OnInit {
  routeId: number | null = null;
  fromStationId: number | null = null;
  toStationId: number | null = null;
  busDetail: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private busService: BusDetailService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.routeId = +params['busRouteID'] || null;
      this.fromStationId = +params['fromStationId'] || null;
      this.toStationId = +params['toStationId'] || null;

      console.log('📦 Query Params:', this.routeId, this.fromStationId, this.toStationId);

      if (this.routeId && this.fromStationId && this.toStationId) {
        this.loadBusDetail(this.routeId, this.fromStationId, this.toStationId);
      } else {
        console.warn('⚠️ Missing route parameters');
      }
    });
  }

  loadBusDetail(routeId: number, fromId: number, toId: number): void {
    console.log('📡 Fetching data for route:', routeId);
    this.busService.getStationsByRoute(routeId, fromId, toId).subscribe({
      next: (res) => {
        console.log('✅ API Response:', res);
        this.busDetail = res;
      },
      error: (err) => {
        console.error('❌ API Error:', err);
      }
    });
  }
}
