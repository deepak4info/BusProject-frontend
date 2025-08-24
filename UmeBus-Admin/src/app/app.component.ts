import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { NavbarComponent } from "./components/header/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MatCardModule, MatSidenavModule, MatIconModule, SidebarComponent, NavbarComponent],
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  sidebarOpen = true; // Sidebar toggle state
constructor(private router:Router){}


  // Toggle Sidebar Open/Close
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  isLogin():boolean{
    const auth =  ['/login'];
    return !auth.some((route)=>this.router.url.startsWith(route))
  }
}
