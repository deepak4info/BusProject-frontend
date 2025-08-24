import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';

import { ServiceWebComponent } from './component/service-web/service-web.component';
import { RouteDetailsComponent } from './component/route-details/route-details.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { EnquiryNumberComponent } from './pages/enquiry-number/enquiry-number.component';
import { routeListingComponent } from './component/route-listing/route-listing.component';
import { SearchSectionComponent } from './search-section/search-section.component';
import { RouteDetailComponent } from './route-detail/route-detail.component';
export const routes: Routes = [
    {path:'' , component:HomeComponent},
    {path:'about-us' , component:AboutComponent},
    {path:'contact-us' , component:ContactUsComponent},
    {path:'search-route' , component:routeListingComponent},
    {path:'route-details/:id' , component:RouteDetailsComponent},
    {path:'enquiry-number' , component:EnquiryNumberComponent},
    { path: 'search-route', component: RouteDetailsComponent },
    { path: 'search-Section', component: SearchSectionComponent },
      { path: 'route-detail', component: RouteDetailComponent },
  { path: '**', redirectTo: 'search-section' },

    

    {path:'blog' , component:BlogsComponent},


    {path:'web' , component:ServiceWebComponent}





];
