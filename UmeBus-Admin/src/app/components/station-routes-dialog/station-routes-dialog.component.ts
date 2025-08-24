import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-station-routes-dialog',
  standalone: true,
  templateUrl: './station-routes-dialog.component.html',
  styleUrl: './station-routes-dialog.component.scss',
  imports: [CommonModule, FormsModule],
})
export class StationRoutesDialogComponent implements OnInit {
  errorMessage: any;
  station: any = {
    busId: 0,
    fromStation: '',
    toStation: '',
    viaRouteName: '',
    date: '',
    departureTime: '',
    dropTime: '',
    totalDistance: 0,
    daysAvailable: '',
  };

  constructor(
    public dialogRef: MatDialogRef<StationRoutesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stationMasterService: UserService
  ) {}

ngOnInit(): void {
  if (this.data.editMode && this.data.station) {
    this.station = { ...this.data.station };

    if (this.station.departureTime) {
      this.station.date = this.station.departureTime.split('T')[0];
      this.station.departureTime = this.station.departureTime.split('T')[1]?.substring(0, 5);
    }
    if (this.station.dropTime) {
      this.station.dropTime = this.station.dropTime.split('T')[1]?.substring(0, 5);
    }
  } else {
    // ✅ Add mode: set default date = today
    const today = new Date();
    this.station.date = today.toISOString().split('T')[0];  // YYYY-MM-DD format
  }
}


  closeDialog() {
    this.dialogRef.close();
  }

  saveStation() {
    const formatDateTime = (date: string, time: string) => {
      return `${date}T${time}:00`;
    };

    // Validate required fields
    if (!this.station.busId || !this.station.fromStation || !this.station.toStation) {
      this.errorMessage = "Bus ID, From Station, and To Station are required.";
      return;
    }

    // Format date-time
    if (this.station.date && this.station.departureTime) {
      this.station.departureTime = formatDateTime(this.station.date, this.station.departureTime);
    }
    if (this.station.date && this.station.dropTime) {
      this.station.dropTime = formatDateTime(this.station.date, this.station.dropTime);
    }

    // Convert busId to number
    this.station.busId = Number(this.station.busId);

    // Clean up unwanted fields
    delete this.station.busRouteId;
    delete this.station.createdDate;
    delete this.station.modifiedDate;

    if (this.data.editMode) {
      this.stationMasterService.updateStationRoutes(this.data.station.busRouteId, this.station).subscribe({
        next: (response) => {
          alert("Station route updated successfully");
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error("Update failed:", error);
          this.errorMessage = "Failed to update route. Please check values.";
        }
      });
    } else {
      this.stationMasterService.createStationRoutes(this.station).subscribe({
        next: (response) => {
          console.log("✅ Created:", response);
          alert("Station route created successfully");
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error("❌ Error creating:", error);
          this.errorMessage = "Failed to create route. Please check values.";
        }
      });
    }
  }
}
