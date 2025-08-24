import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blogs',
  imports: [CommonModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {
  busRoutes = [
    {
      title: 'Hisar to Chandigarh',
      distance: 240,
      details: 'Buses run every hour from Hisar to Chandigarh via Jind and Karnal.',
      image: 'https://media.istockphoto.com/id/1330901532/photo/japanese-garden-in-chandigarh-india.jpg?s=612x612&w=0&k=20&c=0P17CSPGrBphpFYJ-FnehAPUK0DW45cea_pI-6qeNfM='
    },
    {
      title: 'Delhi to Rohtak',
      distance: 70,
      details: 'Frequent buses available every 30 minutes from Delhi ISBT to Rohtak.',
      image: 'https://media.istockphoto.com/id/2192853260/photo/maharana-pratap-inter-state-bus-stand-kashmere-gate-delhi.jpg?s=612x612&w=0&k=20&c=KRYoYwXwBBR5zAcxRvF9NB5_Umzj5KMkOwbZhRlZijg='
    },
    {
      title: 'Ambala to Gurgaon',
      distance: 270,
      details: 'Express buses available daily with limited stops for faster travel.',
      image: 'https://media.istockphoto.com/id/1490762036/photo/african-megacity-traffic-lagos-nigeria.jpg?s=612x612&w=0&k=20&c=eSJMkbZJK2J2IJtGZqSZt7NDEjUygULnLMaDolrR_fk='
    },
    {
      title: 'Kurukshetra to Faridabad',
      distance: 180,
      details: 'Buses pass through Karnal and Panipat with a 4-hour travel time.',
      image: 'https://media.istockphoto.com/id/872753900/photo/bus-terminal.jpg?s=612x612&w=0&k=20&c=Akwsxq5WHE31j2YLW5qbJE74nksV7RvXG7BGHmnIwjM='
    },
    {
      title: 'Sirsa to Yamunanagar',
      distance: 290,
      details: 'Connects western Haryana to eastern regions with morning & evening buses.',
      image: 'https://media.istockphoto.com/id/480465846/photo/background.jpg?s=612x612&w=0&k=20&c=IAC--YzvuJ2jeEKiU-Tav6PwnhAxO4FBWI-O6vt0Ga0='
    }
  ];

}
