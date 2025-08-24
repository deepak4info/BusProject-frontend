import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bus-stoppage-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './bus-stoppage-dialog.component.html',
  styleUrls: ['./bus-stoppage-dialog.component.scss'],
})
export class BusStoppageDialogComponent implements OnInit {
  stoppage: any = {
    stopID: 0,            // 👈 changed from id to stopID
    busRouteID: 0,
    busId: 0,
    stationID: 0,
    arrivalTime: '',
    departureTime: '',
    date: '',
    doneAt: '',
    isActive: true,
  };

  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<BusStoppageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.data.editMode && this.data.station) {
      this.stoppage = { ...this.data.station };

      // ✅ Ensure stopID exists
      if (!this.stoppage.stopID && this.data.station.stopID) {
        this.stoppage.stopID = this.data.station.stopID;
      }

      // Format datetime for input[type="datetime-local"]
      if (this.stoppage.doneAt) {
        this.stoppage.doneAt = this.stoppage.doneAt.slice(0, 16);
      }
    } else {
      const now = new Date();
      this.stoppage.doneAt = now.toISOString().slice(0, 16);
      this.stoppage.date = now.toISOString().split('T')[0];
      this.stoppage.busId = this.data.busId || 1;
      this.stoppage.busRouteID = this.data.busRouteID || 1;
      this.stoppage.isActive = true;
    }
  }

  save() {
    console.log("📤 Sending to API:", this.stoppage);
    console.log("🆔 stopID for update:", this.stoppage.stopID);

    if (this.data.editMode) {
      if (!this.stoppage.stopID) {
        this.errorMessage = 'Missing stopID for update.';
        console.error("🚫 No stopID found in stoppage object.");
        return;
      }

      this.userService.updateBusRoutesStoppage(this.stoppage.stopID, this.stoppage).subscribe({
        next: (res) => {
          alert("✅ Bus Route Stoppage updated!");
          this.dialogRef.close(res);
        },
        error: (err) => {
          console.error("❌ Update Error:", err);
          this.errorMessage = 'Error updating bus route stoppage.';
        }
      });
    } else {
      this.userService.createBusRoutesStoppage(this.stoppage).subscribe({
        next: (res) => {
          alert("✅ Bus Route Stoppage added!");
          this.dialogRef.close(res);
        },
        error: (err) => {
          console.error("❌ Create Error:", err);
          this.errorMessage = 'Error creating bus route stoppage.';
        }
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
