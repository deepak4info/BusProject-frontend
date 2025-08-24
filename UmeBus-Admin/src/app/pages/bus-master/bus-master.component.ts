import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddBusDialogComponent } from '../../components/add-bus-dialog/add-bus-dialog.component';

@Component({
  selector: 'app-bus-master',
  imports: [CommonModule ],
  templateUrl: './bus-master.component.html',
  styleUrl: './bus-master.component.scss'
})
export class BusMasterComponent {
  product:any[] = [];
loading:boolean = true;
errorMessage:any;
station: any;

  constructor(private masterService:UserService  ,public dialog: MatDialog){}

  ngOnInit(): void {
    this.fetchData();
  }
fetchData(): void {
  this.masterService.getBusMaster().subscribe({
    next: (data: any) => {
      // ✅ Reverse order so latest comes first
      this.product = data.reverse();
      this.loading = false;
    },
    error: (err: any) => { 
      console.error('Error fetching products:', err);
      this.loading = true;
    }
  });
}

openDialog(editMode: boolean, bus?: any) {
  const dialogRef = this.dialog.open(AddBusDialogComponent, {
    width: '450px',
    height: "auto",
    data: { editMode, station: bus },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      const index = this.product.findIndex((s) => s.busid === result.busid);

      if (editMode && index !== -1) {
        this.product[index] = result;
        this.fetchData();   // ✅ edit ke baad fresh reload
      } else {
        // ✅ Add → sirf local array update karo, upar insert
        this.product = [result, ...this.product];
      }
    }
  });
}


deleteBusMaster(busid: number) {
  if (confirm('Are you sure you want to delete this bus?')) {
    console.log("🗑 Deleting bus with ID:", busid);
    this.masterService.deleteBusMaster(busid).subscribe({
      next: () => {
        console.log(`✅ Bus with ID ${busid} deleted successfully.`);
        this.fetchData();   // ✅ fresh data reload
      },
      error: (error) => {
        console.error(`❌ Error deleting bus with ID ${busid}:`, error);
        alert('Error deleting bus. Please try again later.');
      }
    });
  }
}

}
