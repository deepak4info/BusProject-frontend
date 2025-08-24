import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StationRoutesDialogComponent } from '../station-routes-dialog/station-routes-dialog.component';
import { MatDialog } from '@angular/material/dialog';
interface BusSchedule {
  routeName: string;
  via: string;
  endPoint: string;
  time: string;
}
@Component({
  selector: 'app-bus-schedule',
  imports: [CommonModule ,FormsModule],
  standalone:true,
  templateUrl: './bus-schedule.component.html',
  styleUrl: './bus-schedule.component.scss'
})
export class BusScheduleComponent  implements OnInit{
  routes:any[] = [];
loading:boolean = true;
product: any[] = [];
errorMessage: any;
showForm = false; // Controls form visibility
isEditMode = false; // Determines if adding or editing
selectedRoute: any = {}; // Stores the selected route for editing


  constructor(private productService : UserService ,private router :Router ,public dialog: MatDialog){

  }
  ngOnInit(): void {
    this.fetchData();
  }

  
  fetchData():void{
    this.productService.getStationRoutes().subscribe({
next:(data)=>{
  this.routes = data

  this.loading = false;
}
    ,
    error: (err) => {
      console.error('Error fetching products:', err);
      this.loading = true
    }
  })
  }

openDialog(editMode: boolean, station?: any) {
  const dialogRef = this.dialog.open(StationRoutesDialogComponent, {
    width: '600px',
    height: 'auto',
    maxHeight: '95vh',
    data: { editMode, station },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      if (editMode) {
        // ✅ Update existing route
        const index = this.routes.findIndex((s) => s.busRouteId === result.busRouteId);
        if (index !== -1) {
          this.routes[index] = result;
        }
      } else {
        // ✅ Add new record at the top (1st row)
        this.routes = [result, ...this.routes];
        // OR this.routes.unshift(result);
      }
      // agar hamesha server se fresh data chahiye to uncomment karo
      // this.fetchData();
    }
  });
}



  // Close form
  closeForm() {
    this.showForm = false;
  }
  deleteBus(busRouteId: number) {
    if (confirm('Are you sure you want to delete this bus master?')) {
      this.productService.deleteStationRoutes(busRouteId).subscribe({
        next: () => {
          console.log(`Bus master with ID ${busRouteId} deleted successfully.`);
          this.product = this.product.filter((bus) => bus.busid !== busRouteId);   
        },
        error: (error) => {
          this.errorMessage = error;
          console.error(`Error deleting bus master with ID ${busRouteId}:`, error);
        },
      });
    }
  }

}
