import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-station-dialog',
  imports:[CommonModule ,ReactiveFormsModule ,FormsModule ,MatIconModule],
  templateUrl: './add-bus-dialog.component.html',
  styleUrls: ['./add-bus-dialog.component.scss'],
})
export class AddBusDialogComponent {
  station: any = {
    busid: 0, 
    busNumber: "",
    busType: "",
    capacity: "",
    createdDate:new Date().toISOString(),
    isActive: true
  };
  errorMessage: string = '';


  constructor(
    public dialogRef: MatDialogRef<AddBusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stationMasterService: UserService
  ) {}


  ngOnInit(): void {
  
    // ✅ If in edit mode, populate form with existing data
    if (this.data.editMode && this.data.station) {
      this.station = { ...this.data.station };
  
      // ✅ Ensure createdDate is formatted correctly
      if (this.station.createdDate) {
        this.station.createdDate = this.station.createdDate.split('T')[0];
      }
  
      // ✅ Ensure id is assigned
      if (!this.station.busid) {
        console.log(this.station.busId ,">");
        
        this.errorMessage = "Error: Bus ID is required!";
      }
    }
  }
  
  closeDialog() {
    this.dialogRef.close();
  }

  saveStation() {
  
    if (this.data.editMode) {
      if (!this.station.busid) {
        this.errorMessage = "Error: Bus ID is required!";
        return;
      }
  
      this.stationMasterService.updateBusMaster(this.station.busid, this.station).subscribe({
        next: (response: any) => {
          alert("Bus Master updated successfully")
    
          this.dialogRef.close(response);
        },
        error: (error: any) => {
    
          alert("Error updating bus. Please try again.")
          this.errorMessage = "Error updating bus. Please try again.";
        },
      });
    } else {
      this.stationMasterService.createBusMaster(this.station).subscribe({
        next: (response: any) => {
          alert("Bus Master created successfully")
      
          this.dialogRef.close(response);
        },
        error: (error: any) => {
          alert("Error saving bus. Please try again")
          this.errorMessage = "Error saving bus. Please try again.";
        },
      });
    }
  }
  

}