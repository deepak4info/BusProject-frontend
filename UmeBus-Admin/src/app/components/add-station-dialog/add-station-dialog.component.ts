import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

// Define a proper TypeScript interface for station
interface Station {
  stationID: number; // Ensure stationID is always a number
  stationName: string;
  revenueName: string;
  isActive: boolean;
  doneAt: string;
  district: string;
  tahsil: string;
}

@Component({
  selector: 'app-add-station-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './add-station-dialog.component.html',
  styleUrls: ['./add-station-dialog.component.scss'],
})
export class AddStationDialogComponent implements OnInit {
  station: Station = {
    stationID: 0, // Ensure stationID has a default value
    stationName: '',
    revenueName: '',
    isActive: true,
    doneAt: '',
    district: '',
    tahsil: '',
  };
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddStationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stationMasterService: UserService
  ) {}

  ngOnInit(): void {

    if (this.data.editMode && this.data.station) {
      this.station = { ...this.data.station };

      // Ensure stationID is defined
      if (!this.station.stationID) {
        this.station.stationID = 0;
      }

      // Format date if available
      if (this.station.doneAt) {
        this.station.doneAt = this.formatDate(this.station.doneAt);
      }
    } else {
      // Default date
      this.station.doneAt = this.formatDate(new Date().toISOString());
    }
  }

  formatDate(dateString: string): string {
    return dateString ? new Date(dateString).toISOString().split('T')[0] : '';
  }

  saveStation() {
  
    if (this.data.editMode) {
      // ✅ Ensure stationID exists for update
      if (!this.station.stationID) {
        alert("Error: Station ID is required!");
        this.errorMessage = "Error: Station ID is required!";
        return;
      }
  
      this.stationMasterService.updateStationMaster(this.station).subscribe({
        next: (response: any) => {
          alert("Station Master updated successfully!");
          this.dialogRef.close(response);
        },
        error: (error: any) => {
          alert("Error updating station. Please try again");
          this.errorMessage = "Error updating station. Please try again.";
        },
      });
  
    } else {
      this.stationMasterService.createStationMaster(this.station).subscribe({
        next: (response: any) => {
          alert("Station Master created successfully!");
          this.dialogRef.close(response);
        },
        error: (error: any) => {
          alert("Error saving station. Please try again");
    
          this.errorMessage = "Error saving station. Please try again.";
        },
      });
    }
  }
  
  closeDialog() {
    this.dialogRef.close();
  }
}
