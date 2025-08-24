import { Component } from '@angular/core';
import { HeroSectionComponent } from "../hero-section/hero-section.component";
import { HomeDestinationComponent } from "../home-destination/home-destination.component";
import { HomeChooseComponent } from "../home-choose/home-choose.component";
import { AboutComponent } from "../about/about.component";

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent, HomeDestinationComponent, HomeChooseComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
