import { Routes } from '@angular/router';
import { BusRouteComponent } from './components/bus-route/bus-route.component';
import { BusScheduleComponent } from './components/bus-schedule/bus-schedule.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { StationMasterComponent } from './pages/station-master/station-master.component';
import { BusMasterComponent } from './pages/bus-master/bus-master.component';
import { StationComponent } from './components/Station/station.component';
import { BusRoutesComponent } from './pages/bus-routes/bus-routes.component';



export const routes: Routes = [
    { path: 'bus-route', component: BusRouteComponent },
    { path: 'bus-schedule', component: BusScheduleComponent },
    { path: 'station', component: StationComponent },
    { path: 'dashboard',  component:DashboardComponent } ,
    { path: 'login',  component:LoginComponent } ,
    { path: 'station-master',  component:StationMasterComponent } ,
    { path: 'bus-master',  component:BusMasterComponent } ,
    { path: 'bus-stoppage',  component:BusRoutesComponent } ,



    {path:'', redirectTo:'dashboard' , pathMatch:'full'}
  
];
