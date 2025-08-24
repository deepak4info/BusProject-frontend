import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-footer',
  imports: [CommonModule ,MatIconModule ,MatGridListModule ,],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  galleryImages = [
    'https://ume-bus.netlify.app/static/media/hr1.3f35bdecb9c0ace9609d.jpg',
    'https://ume-bus.netlify.app/static/media/hr3.a518f1a0037d5b7018a9.jpg',
    'https://ume-bus.netlify.app/static/media/hr5.7f3de247bc4f68dc1651.jpg',
    'https://ume-bus.netlify.app/static/media/hr6.178ddd5fa4313a348b46.png',
    'https://ume-bus.netlify.app/static/media/hr4.555a67d7262620e278b7.jpg',
    'https://ume-bus.netlify.app/static/media/hr3.a518f1a0037d5b7018a9.jpg'
  ];

  districts = [
    'Hisar','Fatehabad','Sirsa' , 
  ];
}
