import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-section',
  standalone: true,
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.scss'],
  imports: [CommonModule, HttpClientModule],
})
export class SearchSectionComponent implements OnInit {
  fromStationId: number | null = null;
  toStationId: number | null = null;
  routeId: number | null = null;
  routeData: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.fromStationId = +params['fromStationId'] || null;
      this.toStationId = +params['toStationId'] || null;
      this.routeId = +params['routeId'] || null;

      const data = localStorage.getItem('routeData');
      this.routeData = data ? JSON.parse(data) : [];
    });
  }

viewDetails(busRouteID: number) {
  this.router.navigate(['/route-detail'], {
    queryParams: {
      busRouteID,
      fromStationId: this.fromStationId,
      toStationId: this.toStationId,
      routeId: this.routeId
    }
  });
}

}