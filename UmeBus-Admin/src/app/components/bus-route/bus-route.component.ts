import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BusRouteDialogComponent } from '../bus-route-dialog/bus-route-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

interface BusRoute {
  id: number;
  routeName: string;
  startPoint: string;
  Vaya: string;
  endPoint: string;
}

@Component({
  selector: 'app-bus-route',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './bus-route.component.html',
  styleUrls: ['./bus-route.component.scss']
})
export class BusRouteComponent implements OnInit {
  busRoutes: BusRoute[] = [];

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const savedRoutes = localStorage.getItem('busRoutes');
    if (savedRoutes) {
      this.busRoutes = JSON.parse(savedRoutes);
    }
  }

  updateLocalStorage() {
    localStorage.setItem('busRoutes', JSON.stringify(this.busRoutes));
  }

  openDialog(isEditMode: boolean, route: BusRoute = { id: 0, routeName: '', startPoint: '', Vaya: '', endPoint: '' }, index?: number) {
    const dialogRef = this.dialog.open(BusRouteDialogComponent, {
      width: '400px',
      data: { isEditMode, route: { ...route } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      if (isEditMode) {
        const idx = this.busRoutes.findIndex(r => r.id === result.id);
        if (idx !== -1) {
          this.busRoutes[idx] = result;
        }
      } else {
        this.busRoutes.push({ id: this.busRoutes.length + 1, ...result });
      }

      this.updateLocalStorage();
      this.cdr.detectChanges();
    });
  }

  deleteRoute(index: number) {
    this.busRoutes.splice(index, 1);
    this.updateLocalStorage();
    this.cdr.detectChanges();
  }
}
