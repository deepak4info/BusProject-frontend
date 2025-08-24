import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

interface BusRoute {
  id: number;
  routeName: string;
  startPoint: string;
  Vaya: string;
  endPoint: string;
}

@Component({
  selector: 'app-bus-route-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDialogModule],
  templateUrl: './bus-route-dialog.component.html',
  styleUrls: ['./bus-route-dialog.component.scss']
})
export class BusRouteDialogComponent {
  newRoute: BusRoute = { id: 0, routeName: '', startPoint: '', Vaya: '', endPoint: '' };
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<BusRouteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEditMode: boolean; route: BusRoute }
  ) {
    this.isEditMode = data.isEditMode;
    if (this.isEditMode) {
      this.newRoute = { ...data.route };
    }
  }

  save(form: NgForm) {
    if (form.invalid) return;
    this.dialogRef.close(this.newRoute);
  }

  cancel() {
    this.dialogRef.close();
  }
}
