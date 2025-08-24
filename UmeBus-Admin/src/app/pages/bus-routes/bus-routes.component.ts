import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BusStoppageDialogComponent } from "../../components/bus-stoppage-dialog/bus-stoppage-dialog.component";

@Component({
  selector: 'app-bus-routes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bus-routes.component.html',
  styleUrl: './bus-routes.component.scss'
})
export class BusRoutesComponent {
  product: any[] = [];
  loading: boolean = true;
  errorMessage: any;

  constructor(private masterService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log("🚀 ngOnInit called");
    this.fetchData();
  }

  fetchData(): void {
    console.log("📡 Fetching bus routes stoppage data...");
    this.masterService.getBusRoutesStoppage().subscribe({
      next: (data: any) => {
        console.log("✅ Data received:", data);
        this.product = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error("❌ Error fetching bus routes:", err);
        this.loading = true;
      }
    });
  }

  // openDialog(editMode: boolean, station?: any) {
  //   console.log("🧩 openDialog called - Edit mode:", editMode, "Data:", station);
  //   const dialogRef = this.dialog.open(BusStoppageDialogComponent, {
  //     width: '450px',
  //     height: "auto",
  //     data: { editMode, station },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log("🛑 Dialog closed with result:", result);
  //     if (result) {
  //       if (editMode) {
  //         const index = this.product.findIndex((s) => s.stationID === result.stationID);
  //         if (index !== -1) {
  //           console.log("🔁 Updating existing record at index", index);
  //           this.product[index] = result;
  //         }
  //       } else {
  //         console.log("➕ Adding new station route:", result);
  //         this.product = [...this.product, result];
  //       }
  //       this.fetchData(); // Refresh
  //     } else {
  //       console.log("ℹ️ Dialog closed without saving");
  //     }
  //   });
  // }
openDialog(editMode: boolean, station?: any): void {
  if (editMode && (!station || !station.stopID)) {
    console.error('❌ Invalid station data. Cannot edit without stopID.');
    return;
  }

  const dialogRef = this.dialog.open(BusStoppageDialogComponent, {
    width: '600px',
    data: {
      editMode,
      station: { ...station }, 
      busId: station?.busID || 0,
      busRouteID: station?.busRouteID || 0
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      if (editMode) {
        // 🔄 Update existing
        const index = this.product.findIndex(st => st.stopID === result.stopID);
        if (index !== -1) {
          this.product[index] = result;
        }
      } else {
        // ⬆️ Add new at TOP (first row)
        this.product = [result, ...this.product];
        // OR this.product.unshift(result);
      }
    }
  });
}




  deleteStoppage(stopID: number) {
  if (confirm('Are you sure you want to delete this stoppage?')) {
    console.log("🗑 Deleting stoppage with ID:", stopID);
    this.masterService.deleteBusRouteStoppage(stopID).subscribe({
      next: () => {
        console.log(`✅ Stoppage with ID ${stopID} deleted successfully.`);
        this.product = this.product.filter(st => st.stopID !== stopID);
      },
      error: (error) => {
        this.errorMessage = error;
        console.error(`❌ Error deleting stoppage with ID ${stopID}:`, error);
      },
    });
  }
}

}
