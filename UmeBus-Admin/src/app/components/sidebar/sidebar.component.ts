import { Component, signal, ViewEncapsulation , } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule ,Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatSidenavModule, MatIconModule, MatButtonModule  ,RouterModule  ,MatMenuModule ,MatListModule],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
    animations: [
    trigger('expandCollapse', [
      state('closed', style({ height: '0px', opacity: 0, display: 'none' })),
      state('open', style({ height: '*', opacity: 1, display: 'block' })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),

  ],

})
export class SidebarComponent {
  dropdownOpen = signal(false); // Using Angular Signals

  toggleDropdown() {
    this.dropdownOpen.update((value) => !value); // Signal update
  }

}
