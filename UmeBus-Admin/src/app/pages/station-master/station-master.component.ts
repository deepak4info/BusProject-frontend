  import { Component, OnInit } from '@angular/core';
  import { UserService } from '../../service/user.service';
  import { CommonModule } from '@angular/common';
  import { MatDialog } from '@angular/material/dialog';
  import { AddStationDialogComponent } from '../../components/add-station-dialog/add-station-dialog.component';

  @Component({
    selector: 'app-station-master',
    imports: [CommonModule],
    templateUrl:'./station-master.component.html',
    styleUrl: './station-master.component.scss',
  })
  export class StationMasterComponent implements OnInit {
    product: any[] = [];
    loading: boolean = true;
    errorMessage: any;

    constructor(private userService: UserService, public dialog: MatDialog) {}

    ngOnInit(): void {
      this.fetchData();
    }

    fetchData(): void {
      this.userService.getStationMaster().subscribe({
        next: (data: any) => {
          this.product = data;
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error fetching products:', err);
          this.loading = true;
        },
      });
    }

 openDialog(editMode: boolean, station?: any) {
  const dialogRef = this.dialog.open(AddStationDialogComponent, {
    width: '600px',
    height: 'auto',
    maxHeight: '100vh',
    data: { editMode, station },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      if (editMode) {
        // ✅ Update existing record
        const index = this.product.findIndex((s) => s.stationID === result.stationID);
        if (index !== -1) {
          this.product[index] = result;
        }
      } else {
        // ✅ Add new record at the TOP (1st row)
        this.product = [result, ...this.product];
        // OR this.product.unshift(result);
      }

      // Agar aap hamesha server se fresh data chahte ho to ye rakho:
      // this.fetchData();
    }
  });
}


  deleteStation(id: number) {
  console.log('Delete clicked for ID:', id); // 👈 Add this line

  if (confirm('Are you sure you want to delete this Station master?')) {
    this.userService.deleteStationMaster(id).subscribe({
      next: () => {
        this.fetchData(); // Refresh data after deletion.
      },
      error: (error) => {
        this.errorMessage = error;
        console.error(`Error deleting Station master with ID ${id}:`, error);
      },
    });
  }
}

  }